using DL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.InterfacesServices
{
    public interface IUserService
    {
        public string GenerateJwtToken(string username, string[] roles);
        public Task<List<User>> GetAllUsersAsync();
        public Task<User> GetUserByIdAsync(int id);
        public Task<User> AddUserAsync(User user);
        public Task<User> LoginUserAsync(string email, string password);
        public Task<User> UpdateUserAsync(int id, User user);
        public Task<User> RemoveUserAsync(int id);
    }
}
