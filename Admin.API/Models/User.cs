using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace Admin.API.Models
{
    // int para que no reciba string
    public class User : IdentityUser<int>
    {
        // [Required]
        // [StringLength(8, MinimumLength = 4, ErrorMessage = "You must specify a password between 4 and 8 characters")]
        public string Puesto { get; set; }

        public DateTime FechaAlta { get; set; }
        public Boolean Activo { get; set; }
        public string FotoUrl { get; set; }

         public string PublicId { get; set; }

        // public ICollection<Foto> Fotos { get; set; }
        public ICollection<UserRole> UserRoles { get; set; }

    }
}