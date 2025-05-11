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
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            //var claims = new List<Claim>
            //{
            //    new Claim(ClaimTypes.Name, username)
            //};
            var user = await _dataContext.Users.FirstOrDefaultAsync(u => u.Name == username);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()), // זה מה שחסר
                new Claim(ClaimTypes.Name, username)
            };

            // הוספת תפקידים כ-Claims
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var token = new JwtSecurityToken
            (
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
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
                return user;
        }


        public async Task<User> LoginUserAsync(string email, string password)
        {
            User user = await _dataContext.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null)
            {
                throw new UnauthorizedAccessException("Invalid email or password");
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
