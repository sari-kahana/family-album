﻿using BL.InterfacesServices;
using DL.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

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
        public async Task<ActionResult> AddImage([FromBody] Image img)
        {
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

            var images = await _imageService.SearchImagesAsync(cleaned);

            return Ok(images);
        }

    }
}
