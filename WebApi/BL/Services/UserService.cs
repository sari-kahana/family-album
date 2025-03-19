using BL.InterfacesServices;
using DL;
using DL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Services
{
    public class UserService: IUserService
    {
        private readonly IDataContext _dataContext;

        public UserService(IDataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public List<User> GetAllUsers()
        {
            return _dataContext.Users.ToList();
        }
        public User GetUserById(int id)
        {
            return _dataContext.Users.Where(u => u.Id == id).FirstOrDefault();
        }
        public void AddUser(User user)
        {
            {
                _dataContext.Users.Add(user);
                _dataContext.SaveChanges();
            }

        }
        public void UpdateUser(int id, User user)
        {
            var newUser = _dataContext.Users.Where(user => user.Id == id).FirstOrDefault();
            if (newUser != null)
            {
                newUser.Name = user.Name;
                newUser.Email = user.Email;
                newUser.Password = user.Password;
                newUser.UpdatedAt = DateTime.Now;
                newUser.UpdatedBy = user.UpdatedBy;
                _dataContext.SaveChanges();
            }

        }
        public void RemoveUser(int id)
        {
            var userToDelete = _dataContext.Users.FirstOrDefault(user => user.Id == id);
            if (userToDelete != null)
            {
                _dataContext.Users.Remove(userToDelete);
                _dataContext.SaveChanges();
            }

        }
    }
}
