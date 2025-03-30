using AutoMapper;
using BL.InterfacesServices;
using DL.Dtos;
using DL.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WebApi.Models;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        public UserController(IUserService userService, IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }

        [HttpGet]
        //[Authorize (Policy = "AdminOnly")]
        public async Task<List<UserDto>> GetAllUsersAsync()
        {

            var list = await _userService.GetAllUsersAsync();
            return _mapper.Map<List<UserDto>>(list);
        }

        [HttpGet("{id}")]
        //[Authorize(Policy = "AdminOnly")]
        public async Task<UserDto> GetUserByIdAsync(int id)
        {
            var user = await _userService.GetUserByIdAsync(id);    
            return _mapper.Map<UserDto>(user);
        }

        [HttpPost]
        //[Authorize(Policy = "AdminOnly")]
        public async Task<ActionResult> AddUserAsync([FromBody] UserPostModel user)
        {
            var userToAdd = new User { Name = user.Name, Email = user.Email, Password = user.Password, CreatedBy = "" , UpdatedBy = ""};
            await _userService.AddUserAsync(userToAdd);
            return Ok(userToAdd);
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginUserAsync([FromBody] LoginModel loginRequest)
        {
            try
            {
                var user = await _userService.LoginUserAsync(loginRequest.Email, loginRequest.Password);

                if (user == null)
                    return Unauthorized(new { Message = "Invalid email or password" });
                var token = _userService.GenerateJwtToken(user.Name, new[] { "User" });
                return Ok(new
                {
                    Message = "Login successful",
                    Token = token,
                    User = new { user.Id, user.Name, user.Email }
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred", Error = ex.Message });
            }
        }
        

        //[Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult> UpDateUserAsync(int id, [FromBody] User user)
        {
           await _userService.UpdateUserAsync(id, user);
            return Ok(user);
        }

        //[Authorize(Policy = "AdminOnly")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> RemoveUserAsync(int id)
        {
            await _userService.RemoveUserAsync(id);
            return Ok();
        }


    }
}
