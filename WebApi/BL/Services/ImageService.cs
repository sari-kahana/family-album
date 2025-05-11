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
            var images = await _dataContext.Images.Where(img => !img.IsDeleted).ToListAsync();
            return images;
        }

        public async Task<Image> GetImageByIdAsync(int id)
        {
            var img = await _dataContext.Images.FirstOrDefaultAsync(f => f.Id == id);
            if (img == null || img.IsDeleted)
                throw new Exception("Image Not Found");
            return img;
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
            var imgToRemove = await GetImageByIdAsync(id);
            imgToRemove.IsDeleted = true;
            //_dataContext.Images.Remove(imgToRemove);
            await _dataContext.SaveChangesAsync();
            return imgToRemove;

        }

        public async Task<Image> UpdateImageAsync(int id, Image img)
        {
            var imgToUpdate = await GetImageByIdAsync(id);
            if (imgToUpdate == null)
            {
                throw new Exception("image not found");
            }

            imgToUpdate.Name = img.Name;
            imgToUpdate.Type = img.Type;
            imgToUpdate.Size = img.Size;
            imgToUpdate.S3URL = img.S3URL;
            imgToUpdate.UpdatedAt = DateTime.UtcNow;
            await _dataContext.SaveChangesAsync();
            return img;
        }
    }
}
