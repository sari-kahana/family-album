using BL.InterfacesServices;
using DL.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly IImageService _imageService;
        public ImageController(IImageService imageService)
        {
            _imageService = imageService;
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
        public async Task<ActionResult> AddFile([FromBody] Image file)
        {
            await _imageService.AddImageAsync(file);
            return CreatedAtAction(nameof(GetImageById), new { id = file.Id }, file);
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

    }
}
