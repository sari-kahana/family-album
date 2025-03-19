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
        public List<User> GetAllUsers();
        public User GetUserById(int id);
        public void AddUser(User user);
        public void UpdateUser(int id, User user);
        public void RemoveUser(int id);
    }
}
