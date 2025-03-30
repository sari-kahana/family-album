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
            var album = await _dataContext.Albums.Include(a=>a.Images).FirstOrDefaultAsync(a => a.Id == id);
            if (album == null)
                throw new Exception("album not found");
            return album;
        }

        public async Task<List<Album>> GetAllAlbumsAsync()
        {
            return await _dataContext.Albums.ToListAsync();
        }

        public Task<Album> RemoveAlbumAsync(int id)
        {
            var albumToRemove = GetAlbumByIdAsync(id);
            _dataContext.Albums.Remove(albumToRemove.Result);
            return albumToRemove;
        }

        public Task<Album> UpdateAlbumAsync(int id, Album album)
        {
            var albumToUpdate = GetAlbumByIdAsync(id);
            albumToUpdate.Result.Name = album.Name;
            albumToUpdate.Result.UpdatedAt = DateTime.Now;
            _dataContext.Albums.Update(albumToUpdate.Result);
            return albumToUpdate;
        }
    }
}
