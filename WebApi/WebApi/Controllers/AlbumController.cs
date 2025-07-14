using BL.InterfacesServices;
using DL.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace WebApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AlbumController : ControllerBase
    {
        private readonly IAlbumService _albumService;

        public AlbumController(IAlbumService albumService)
        {
            _albumService = albumService;
        }

        // GET: api/album
        [HttpGet]
        public async Task<IActionResult> GetAllAlbums()
        {
            try
            {
                var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
                var albums = await _albumService.GetAllAlbumsAsync(userId);
                return Ok(albums);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // GET: api/album/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAlbumById(int id)
        {
            try
            {
                var album = await _albumService.GetAlbumByIdAsync(id);
                return Ok(album);
            }
            catch (Exception ex)
            {
                return NotFound($"Album not found: {ex.Message}");
            }
        }

        // POST: api/album
        [HttpPost]
        public async Task<IActionResult> AddAlbum([FromBody] Album album)
        {
            if (album == null)
            {
                return BadRequest("Album is null");
            }

            try
            {
                var createdAlbum = await _albumService.AddAlbumAsync(album);
                return CreatedAtAction(nameof(GetAlbumById), new { id = createdAlbum.Id }, createdAlbum);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // PUT: api/album/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAlbum(int id, [FromBody] string albumName)
        {
            try
            {
                var updatedAlbum = await _albumService.UpdateAlbumAsync(id, albumName);
                return Ok(updatedAlbum);
            }
            catch (Exception ex)
            {
                return NotFound($"Album not found: {ex.Message}");
            }
        }

        // DELETE: api/album/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAlbum(int id)
        {
            try
            {
                var deletedAlbum = await _albumService.RemoveAlbumAsync(id);
                return Ok(deletedAlbum);
            }
            catch (Exception ex)
            {
                return NotFound($"Album not found: {ex.Message}");
            }
        }
    }
}
