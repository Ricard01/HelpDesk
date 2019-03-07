using System;
using System.Collections.Generic;


namespace Admin.API.Dtos
{
    public class UserForDetailedDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Puesto { get; set; }
        public DateTime FechaAlta { get; set; }
        public Boolean Activo { get; set; }


    }
}