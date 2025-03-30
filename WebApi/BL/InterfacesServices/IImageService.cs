using DL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.InterfacesServices
{
    public interface IImageService
    {
        public Task<List<Image>> GetAllImagesAsync();
        public Task<Image> GetImageByIdAsync(int id);
        public Task AddImageAsync(Image img);
        public Task<Image> UpdateImageAsync(int id, Image img);
        public Task<Image> RemoveImageAsync(int id);
    }
}
