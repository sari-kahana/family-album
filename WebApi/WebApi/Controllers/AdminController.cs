using AutoMapper;
using BL.InterfacesServices;
using DL.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using WebApi.Models;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Policy = "AdminOnly")]
    public class AdminController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public AdminController(IUserService userService, IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }

        [HttpGet("users")]
        public async Task<IActionResult> GetAllUsersWithRolesAsync()
        {
            var users = await _userService.GetAllUsersAsync();
            var usersWithRoles = new List<object>();

            foreach (var user in users)
            {
                var roles = await _userService.GetUserRolesAsync(user.Id);
                usersWithRoles.Add(new
                {
                    user.Id,
                    user.Name,
                    user.Email,
                    user.CreatedAt,
                    Roles = roles
                });
            }

            return Ok(new { Message = "Users retrieved successfully", Data = usersWithRoles });
        }

        [HttpPost("assign-role")]
        public async Task<IActionResult> AssignRoleAsync([FromBody] RoleAssignModel model)
        {
            try
            {
                await _userService.AssignRoleAsync(model.UserId, model.RoleName);
                return Ok(new { Message = $"Role '{model.RoleName}' assigned successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        [HttpPost("remove-role")]
        public async Task<IActionResult> RemoveRoleAsync([FromBody] RoleAssignModel model)
        {
            try
            {
                var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (currentUserId == model.UserId.ToString() && model.RoleName == "Admin")
                    return BadRequest(new { Message = "Cannot remove your own admin role" });

                await _userService.RemoveRoleAsync(model.UserId, model.RoleName);
                return Ok(new { Message = $"Role '{model.RoleName}' removed successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }
    }
}
