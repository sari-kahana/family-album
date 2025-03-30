using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DL.Entities
{
    public class Album
    {
        public int Id { get; set; }
        public string Name { get; set; }
        //public int UserId { get; set; }
        public List<Image> Images { get; set; } = new List<Image>();
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
        public bool IsDeleted { get; set; } = false;

        public Album() { }

        public Album(int id, string name/*, int userId*/)
        {
            Id = id;    
            Name = name;
            //UserId = userId;
        }

    }
}
