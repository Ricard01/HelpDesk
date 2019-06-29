using System;
using System.ComponentModel.DataAnnotations;

namespace Admin.API.Dtos
{
    public class UserForReturnDto
    {
        public int Id { get; set; }

        [Display(Name="Ok REturn")]
         public string Username { get; set; }
        public string Puesto { get; set; }
        public Boolean Activo { get; set; }

        public string FotoUrl { get; set; }

    }
}