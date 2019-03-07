using System;

namespace Admin.API.Dtos
{
    public class UserForReturnDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Puesto { get; set; }
        public Boolean Activo { get; set; }

    }
}