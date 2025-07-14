using BL.InterfacesServices;
using DL;
using DL.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Services
{
    public class AlbumService : IAlbumService
    {

        private readonly IDataContext _dataContext;
        public AlbumService(IDataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public async Task<Album> AddAlbumAsync(Album album)
        {
            await _dataContext.Albums.AddAsync(album);
            await _dataContext.SaveChangesAsync();
            return album;
        }

        public async Task<Album> GetAlbumByIdAsync(int id)
        {
            var album = await _dataContext.Albums.Include(a=>a.Images.Where(img => !img.IsDeleted)).FirstOrDefaultAsync(a => a.Id == id);
            if (album == null)
                throw new Exception("album not found");
            return album;
        }

        public async Task<List<Album>> GetAllAlbumsAsync(int userId)
        {
            return await _dataContext.Albums.Where(a=> a.UserId==userId && !a.IsDeleted).Include(a => a.Images.Where(img => !img.IsDeleted)).ToListAsync();
        }

        public async Task<Album> RemoveAlbumAsync(int id)
        {
            var albumToRemove = await GetAlbumByIdAsync(id);
            albumToRemove.IsDeleted = true;
            await _dataContext.SaveChangesAsync();
            return albumToRemove;
        }

        public async Task<Album> UpdateAlbumAsync(int id, string albumName)
        {
            var albumToUpdate = await GetAlbumByIdAsync(id);
            if (albumToUpdate == null)
            {
                throw new Exception("Album not found");
            }

            albumToUpdate.Name = albumName;
            albumToUpdate.UpdatedAt = DateTime.Now;

            _dataContext.Albums.Update(albumToUpdate);
            await _dataContext.SaveChangesAsync();

            return albumToUpdate;
        }

    }
}
