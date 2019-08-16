using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace Admin.API.Dtos
{
    public class UserForRegisterDto
    {
        [Display(Name="Nombre de usuario")]
        [Required]
        [Remote(action:"UserNameInUse", controller:"Users")]
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