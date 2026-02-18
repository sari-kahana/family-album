using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DL.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public DateTime CreatedAt { get; } = DateTime.Now;
        public string CreatedBy { get; set; }
        public DateTime UpdatedAt { get; set; }
        public string UpdatedBy { get; set; }
        public List<Album> Albums { get; set; } = new List<Album>();
        public List<UserRoles> UserRoles { get; set; } = new List<UserRoles>();


        public User() { }

        public User(int id, string name, string email, string password, string createdBy)
        {
            Id = id;
            Name = name;
            Email = email;
            Password = password;
            CreatedBy = createdBy;
        }
    }
}
