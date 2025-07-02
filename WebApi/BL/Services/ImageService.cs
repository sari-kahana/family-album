using BL.InterfacesServices;
using DL;
using DL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Mysqlx;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;

namespace BL.Services
{
    public class ImageService : IImageService
    {
        private readonly IDataContext _dataContext;
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;
        public ImageService(IDataContext dataContext, HttpClient httpClient, IConfiguration configuration)
        {
            _dataContext = dataContext;
            _httpClient = httpClient;
            _apiKey = Environment.GetEnvironmentVariable("OPENAI_API_KEY");
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
        public async Task AddImageAsync(Image img)
        {
            string description = await GetImageDescriptionAsync(img.S3URL);
            if (string.IsNullOrEmpty(description))
            {
                throw new Exception("Failed to generate image description.");
            }

            img.Description = description;
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

        //public async Task<string> GetImageDescriptionAsync(string imageUrl)
        //{
        //    if (string.IsNullOrEmpty(imageUrl))
        //    {
        //        throw new ArgumentException("Image URL cannot be null or empty");
        //    }

        //    string prompt = $"תאר את התמונה הבאה ותכלול מילות מפתח שיעזרו בחיפוש תמונות על ידי המשתמש לפי התיאור שלך";

        //    _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _apiKey);

        //    var requestBody = new
        //    {
        //        model = "gpt-4o-mini", // gpt-4o תומך בתמונות, gpt-4o-mini לא תמיד
        //        messages = new[]
        //        {
        //            new
        //            {
        //                role = "user",
        //                content = new object[]
        //                {
        //                    new
        //                    {
        //                        type = "text",
        //                        text = prompt
        //                    },
        //                    new
        //                    {
        //                        type = "image_url",
        //                        image_url = new
        //                        {
        //                            url = imageUrl,
        //                            detail = "high" // או "low" לרזולוציה נמוכה יותר
        //                        }
        //                    }
        //                }
        //            }
        //        },
        //        max_tokens = 100
        //    };

        //    var content = new StringContent(JsonConvert.SerializeObject(requestBody), Encoding.UTF8, "application/json");

        //    var response = await _httpClient.PostAsync("https://api.openai.com/v1/chat/completions", content);
        //    var responseString = await response.Content.ReadAsStringAsync();

        //    // שלב חשוב! הדפסה של מה שחוזר
        //    Console.WriteLine("AI RESPONSE: " + responseString);

        //    // בדיקה האם הצליח בכלל
        //    if (!response.IsSuccessStatusCode)
        //    {
        //        throw new Exception($"OpenAI API error: {response.StatusCode} - {responseString}");
        //    }

        //    // נסיון לפרש את התשובה
        //    dynamic result = JsonConvert.DeserializeObject(responseString);

        //    // בדיקה בטוחה של choices
        //    if (result?.choices != null && result.choices.Count > 0)
        //    {
        //        var aiMessage = result.choices[0].message.content.ToString();
        //        return aiMessage;
        //    }
        //    else
        //    {
        //        throw new Exception("תשובה לא תקינה: אין choices בתוצאה.");
        //    }
        //}



        public async Task<string> GetImageDescriptionAsync(string imageUrl)
        {
            try
            {
                if (string.IsNullOrEmpty(imageUrl))
                {
                    throw new ArgumentException("Image URL cannot be null or empty");
                }

                string prompt = $"תאר את התמונה הבאה תיאור תמציתי שיכלול מילות מפתח נפוצות שיעזרו בחיפוש תמונות על ידי המשתמש לפי התיאור שלך";

                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _apiKey);

                var requestBody = new
                {
                    model = "gpt-4o-mini",
                    messages = new[]
                    {
                new
                {
                    role = "user",
                    content = new object[]
                    {
                        new
                        {
                            type = "text",
                            text = prompt
                        },
                        new
                        {
                            type = "image_url",
                            image_url = new
                            {
                                url = imageUrl,
                                detail = "high"
                            }
                        }
                    }
                }
            },
                    max_tokens = 100
                };

                var content = new StringContent(JsonConvert.SerializeObject(requestBody), Encoding.UTF8, "application/json");

                var response = await _httpClient.PostAsync("https://api.openai.com/v1/chat/completions", content);
                var responseString = await response.Content.ReadAsStringAsync();

                Console.WriteLine("AI RESPONSE: " + responseString);

                if (!response.IsSuccessStatusCode)
                {
                    Console.WriteLine($"OpenAI API error: {response.StatusCode} - {responseString}");
                    return "לא ניתן לקבל תיאור כרגע";
                }

                dynamic result = JsonConvert.DeserializeObject(responseString);

                if (result?.choices != null && result.choices.Count > 0)
                {
                    var aiMessage = result.choices[0].message.content.ToString();
                    return aiMessage;
                }
                else
                {
                    Console.WriteLine("תשובה לא תקינה: אין choices בתוצאה.");
                    return "לא ניתן לנתח את התמונה כרגע";
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("שגיאה בתיאור תמונה מ־OpenAI: " + ex.Message);
                return "תיאור לא זמין כרגע";
            }
        }




        public async Task<List<Image>> SearchImagesAsync(string query, int userId)
        {
            var images = await _dataContext.Images
                .Where(i => i.UserId==userId && i.Description.ToLower().Contains(query))
                .ToListAsync();
            return images;
        }
    }
}


