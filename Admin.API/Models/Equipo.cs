using System;
using System.ComponentModel.DataAnnotations;

namespace Admin.API.Models
{
    public class Equipo
    {
        public int Id { get; set; }

              // [Required]
        // [StringLength(8, MinimumLength = 4, ErrorMessage = "You must specify a password between 4 and 8 characters")]
        public string NombreEquipo { get; set; }

        public string Ip { get; set; }

        public string Caracteristicas { get; set; }

        public Boolean Activo { get; set; }
        public int? IdUser { get; set; }

    }
}