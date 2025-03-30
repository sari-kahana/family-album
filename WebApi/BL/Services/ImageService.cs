using BL.InterfacesServices;
using DL;
using DL.Entities;
using Microsoft.EntityFrameworkCore;
using Mysqlx;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Services
{
    public class ImageService : IImageService
    {
        private readonly IDataContext _dataContext;
        public ImageService(IDataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<List<Image>> GetAllImagesAsync()
        {
            var files = await _dataContext.Images.Where(file => !file.IsDeleted).ToListAsync();
            return files;
        }

        public async Task<Image> GetImageByIdAsync(int id)
        {
            var file = await _dataContext.Images.FirstOrDefaultAsync(f => f.Id == id);
            if (file == null || file.IsDeleted)
                throw new Exception("Image Not Found");
            return file;
        }

        //public async Task AddImageAsync(Image img)
        //{
        //    await _dataContext.Images.AddAsync(img);
        //     _dataContext.Albums.Where(a => a.Id == img.AlbumId).FirstAsync().Result.Images.Add(img);
        //    await _dataContext.SaveChangesAsync();
        //    //return img;
        //}
        public async Task AddImageAsync(Image img)
        {
            await _dataContext.Images.AddAsync(img);
            var album = await _dataContext.Albums.Where(a => a.Id == img.AlbumId).FirstOrDefaultAsync();
            if (album != null)
                album.Images.Add(img);
            await _dataContext.SaveChangesAsync();
        }

        public async Task<Image> RemoveImageAsync(int id)
        {
            var fileToRemove = await GetImageByIdAsync(id);
            fileToRemove.IsDeleted = true;
            //_dataContext.Images.Remove(fileToRemove);
            await _dataContext.SaveChangesAsync();
            return fileToRemove;

        }

        public async Task<Image> UpdateImageAsync(int id, Image img)
        {
            var imgToUpdate = await _dataContext.Images.FirstOrDefaultAsync(i => i.Id == id);
            if (imgToUpdate == null)
            {
                throw new Exception("image not found");
            }
            imgToUpdate = img;
            await _dataContext.SaveChangesAsync();
            return img;
        }
    }
}
