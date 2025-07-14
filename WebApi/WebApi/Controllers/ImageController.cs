using BL.InterfacesServices;
using DL.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net.Http;
using System.Security.Claims;
using System.Text.RegularExpressions;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly IImageService _imageService;
        private readonly HttpClient _httpClient;
        public ImageController(IImageService imageService, IHttpClientFactory httpClientFactory)
        {
            _imageService = imageService;
            _httpClient = httpClientFactory.CreateClient("MyClient");
        }


        [HttpGet]
        public async Task<IActionResult> GetAllImages()
        {
            var images = await _imageService.GetAllImagesAsync();
            return Ok(images);
        }

        /// <summary>
        /// קבלת תמונה לפי מזהה
        /// </summary>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetImageById(int id)
        {
            var image = await _imageService.GetImageByIdAsync(id);
            if (image == null)
                return NotFound(new { message = "Image not found" });

            return Ok(image);
        }

        [HttpPost]
        public async Task<ActionResult> AddImage([FromBody] Image img)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
            {
                Console.WriteLine("errrrrrrror");
                return Unauthorized();
            }

            var userId = int.Parse(userIdClaim.Value);
            img.UserId = userId;
            await _imageService.AddImageAsync(img);
            return CreatedAtAction(nameof(GetImageById), new { id = img.Id }, img);
        }


        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateImage(int id, [FromBody] Image image)
        {
            try
            {
                var updatedImage = await _imageService.UpdateImageAsync(id, image);
                return Ok(updatedImage);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }

        /// <summary>
        /// מחיקת תמונה
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteImage(int id)
        {
            var deletedImage = await _imageService.RemoveImageAsync(id);
            if (deletedImage == null)
                return NotFound(new { message = "Image not found" });

            return Ok(new { message = "Image deleted successfully", deletedImage });
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchImages([FromQuery] string query)
        {
            if (string.IsNullOrWhiteSpace(query))
                return BadRequest("יש להזין טקסט לחיפוש");

            var cleaned = Regex.Replace(query.ToLower(), @"[^\w\s]", "");
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            var images = await _imageService.SearchImagesAsync(cleaned, userId);
            Console.WriteLine($"Query: {query}");
            Console.WriteLine($"UserId: {userId}");
            Console.WriteLine($"Found images: {images.Count}");

            return Ok(images);
        }


        [HttpGet("proxy")]
        public async Task<IActionResult> ProxySingle([FromQuery] string url)
        {
            if (string.IsNullOrWhiteSpace(url))
                return BadRequest("Missing URL");

            try
            {
                var response = await _httpClient.GetAsync(url, HttpCompletionOption.ResponseHeadersRead);

                if (!response.IsSuccessStatusCode)
                    return StatusCode((int)response.StatusCode, $"Failed to fetch image: {response.ReasonPhrase}");

                var contentType = response.Content.Headers.ContentType?.ToString() ?? "application/octet-stream";
                var stream = await response.Content.ReadAsStreamAsync();

                return File(stream, contentType);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error proxying single image {url}: {ex.Message}");
                return StatusCode(500, $"Error proxying single image: {ex.Message}");
            }
        }


        [HttpPost("proxy/batch")]
        public async Task<IActionResult> ProxyImagesBatch([FromBody] List<string> urls)
        {
            if (urls == null || !urls.Any())
                return BadRequest("Missing URLs");

            var semaphore = new SemaphoreSlim(3);
            var tasks = urls.Select(async url =>
            {
                await semaphore.WaitAsync();
                try
                {
                    var response = await _httpClient.GetAsync(url, HttpCompletionOption.ResponseHeadersRead);

                    if (!response.IsSuccessStatusCode)
                        return null;

                    var contentType = response.Content.Headers.ContentType?.ToString() ?? "application/octet-stream";
                    var stream = await response.Content.ReadAsStreamAsync();

                    using var ms = new MemoryStream();
                    await stream.CopyToAsync(ms);
                    var base64 = Convert.ToBase64String(ms.ToArray());

                    return new
                    {
                        Url = url,
                        ContentType = contentType,
                        DataUrl = $"data:{contentType};base64,{base64}"
                    };
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error proxying image {url}: {ex.Message}");
                    return null;
                }
                finally
                {
                    semaphore.Release();
                }
            });

            var results = await Task.WhenAll(tasks);
            var successful = results.Where(r => r != null).ToList();

            return Ok(successful);
        }




    }
}

