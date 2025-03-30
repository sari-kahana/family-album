using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Amazon.S3;
using Amazon.S3.Model;
using BL.InterfacesServices;
using DL.Entities;

namespace WebApi.Controllers

{
    [ApiController]
    [Route("api/upload")]
    public class UploadController : ControllerBase
    {
        private readonly IAmazonS3 _s3Client;
        private readonly IImageService _imageService;


        public UploadController(IAmazonS3 s3Client, IImageService imageService)
        {
            _s3Client = s3Client;
            _imageService = imageService;
        }

        [HttpGet("presigned-url")]
        public async Task<IActionResult> GetPresignedUrl([FromQuery] string fileName, [FromQuery] int albumId, [FromQuery] int ownerId)
        {
            try
            {
                var request = new GetPreSignedUrlRequest
                {
                    BucketName = "pictures-testpnoren",
                    Key = fileName,
                    Verb = HttpVerb.PUT,
                    Expires = DateTime.UtcNow.AddMinutes(5),
                    ContentType = "image/jpeg"
                };

                string url = _s3Client.GetPreSignedURL(request);

                string s3url = $"https://pictures-testpnoren.s3.amazonaws.com/{fileName}";

                // יצירת אובייקט תמונה ושמירה במסד הנתונים
                var image = new Image
                {
                    Name = fileName,
                    S3URL = s3url, // עדכון לכתובת המלאה
                    Type = 1, // נניח שכל התמונות הן מסוג 1 - אפשר לשנות לפי הצורך
                    Size = 0, // גודל הקובץ לא ידוע כרגע, אפשר לעדכן אותו מאוחר יותר
                    AlbumId = albumId,
                    UserId = ownerId,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow,
                };


                await _imageService.AddImageAsync(image);

                return Ok(new { url });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message, stackTrace = ex.StackTrace });
            }
        }

    }

}
