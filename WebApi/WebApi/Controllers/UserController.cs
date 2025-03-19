using BL.InterfacesServices;
using DL.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public List<User> GetAllUsers()
        {
            return _userService.GetAllUsers();
        }

        [HttpGet("{id}")]
        public User GetUserById(int id)
        {
            return _userService.GetUserById(id);
        }

        [HttpPost]
        public void AddUser([FromBody] User user)
        {
            _userService.AddUser(user);
        }

        [HttpPut("{id}")]
        public void UpDateUser(int id, [FromBody] User user)
        {
            _userService.UpdateUser(id, user);
        }

        [HttpDelete("{id}")]
        public void RemoveUser(int id)
        {
            _userService.RemoveUser(id);
        }


    }
}
