using System;
using System.ComponentModel.DataAnnotations;
namespace Admin.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }

        public string Email { get; set; }

        [StringLength( 30, ErrorMessage = "El campo PUESTO acepta maximo 30 Caracteres" )]  
        public string Puesto { get; set; }
        public DateTime FechaAlta { get; set; }
        public Boolean Activo { get; set; }

        public UserForRegisterDto()
        {
            FechaAlta = DateTime.Now;
            Activo = true;
        }
    }
}