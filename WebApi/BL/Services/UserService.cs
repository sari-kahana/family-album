using BL.InterfacesServices;
using DL;
using DL.Entities;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Crypto.Generators;
using BCrypt.Net;

namespace BL.Services
{
    public class UserService : IUserService
    {
        private readonly IDataContext _dataContext;
        private readonly IConfiguration _configuration;

        public UserService(IDataContext dataContext, IConfiguration configuration)
        {
            _dataContext = dataContext;
            _configuration = configuration;
        }
        public async Task<string> GenerateJwtTokenAsync(string username, string[] roles)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT_KEY"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var user = await _dataContext.Users.FirstOrDefaultAsync(u => u.Name == username);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, username)
            };

            // הוספת תפקידים כ-Claims
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var token = new JwtSecurityToken
            (
                issuer: _configuration["JWT_ISSUER"],
                audience: _configuration["JWT_AUDIENCE"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<string[]> GetUserRolesAsync(int userId)
        {
            var roles = await _dataContext.UserRoles
                .Where(ur => ur.UserId == userId)
                .Include(ur => ur.Role)
                .Select(ur => ur.Role.Name)
                .ToArrayAsync();

            return roles.Length > 0 ? roles : new[] { "User" };
        }

        public async Task AssignRoleAsync(int userId, string roleName)
        {
            var role = await _dataContext.Roles.FirstOrDefaultAsync(r => r.Name == roleName);
            if (role == null)
                throw new Exception($"Role '{roleName}' not found");

            var exists = await _dataContext.UserRoles
                .AnyAsync(ur => ur.UserId == userId && ur.RoleId == role.Id);

            if (!exists)
            {
                _dataContext.UserRoles.Add(new UserRoles { UserId = userId, RoleId = role.Id });
                await _dataContext.SaveChangesAsync();
            }
        }

        public async Task RemoveRoleAsync(int userId, string roleName)
        {
            var role = await _dataContext.Roles.FirstOrDefaultAsync(r => r.Name == roleName);
            if (role == null) return;

            var userRole = await _dataContext.UserRoles
                .FirstOrDefaultAsync(ur => ur.UserId == userId && ur.RoleId == role.Id);

            if (userRole != null)
            {
                _dataContext.UserRoles.Remove(userRole);
                await _dataContext.SaveChangesAsync();
            }
        }

        public async Task<List<User>> GetAllUsersAsync()
        {
            var list =  await _dataContext.Users.ToListAsync();
            return list;
        }
        public async Task<User> GetUserByIdAsync(int id)
        {
            return await _dataContext.Users.Where(u => u.Id == id).FirstOrDefaultAsync();
        }
        public async Task<User> AddUserAsync(User user)
        {
                _dataContext.Users.Add(user);
                await _dataContext.SaveChangesAsync();

                // Assign default "User" role
                var defaultRole = await _dataContext.Roles.FirstOrDefaultAsync(r => r.Name == "User");
                if (defaultRole != null)
                {
                    _dataContext.UserRoles.Add(new UserRoles { UserId = user.Id, RoleId = defaultRole.Id });
                    await _dataContext.SaveChangesAsync();
                }

                return user;
        }


        public async Task<User> LoginUserAsync(string email, string password)
        {
            User user = await _dataContext.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null || user.Password != password)
            {
                return null;
            }
            return user;
        }

        public async Task<User> UpdateUserAsync(int id, User user)
        {
            var newUser = _dataContext.Users.Where(user => user.Id == id).FirstOrDefault();
            if (newUser != null)
            {
                newUser.Name = user.Name;
                newUser.Email = user.Email;
                newUser.Password = user.Password;
                newUser.UpdatedAt = DateTime.Now;
                newUser.UpdatedBy = user.UpdatedBy;
                await _dataContext.SaveChangesAsync();
            }
            return newUser;
        }
        public async Task<User> RemoveUserAsync(int id)
        {
            var userToDelete = _dataContext.Users.FirstOrDefault(user => user.Id == id);
            if (userToDelete != null)
            {
                _dataContext.Users.Remove(userToDelete);
                await _dataContext.SaveChangesAsync();
            }
            return userToDelete;
        }
    }
}
