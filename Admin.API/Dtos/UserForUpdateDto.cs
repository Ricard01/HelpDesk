using System;
using System.ComponentModel.DataAnnotations;

namespace Admin.API.Dtos
{
    public class UserForUpdateDto
    {
        [Required]
        public string Puesto { get; set; }
        public string FotoUrl { get; set; }
        [Required]
        public Boolean Activo { get; set; }

    }
}