using DL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.InterfacesServices
{
    public interface IAlbumService
    {
        public Task<List<Album>> GetAllAlbumsAsync();
        public Task<Album> GetAlbumByIdAsync(int id);
        public Task<Album> AddAlbumAsync(Album album);
        public Task<Album> UpdateAlbumAsync(int id, Album album);
        public Task<Album> RemoveAlbumAsync(int id);
    }
}
