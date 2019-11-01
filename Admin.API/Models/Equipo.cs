using System;
using System.ComponentModel.DataAnnotations;

namespace Admin.API.Models
{
    public class Equipo
    {
        public int Id { get; set; }

        // [Required]
        // [MaxLength(30)]
        // [StringLength(30, ErrorMessage = "El nombre de equipo es obligatorio mi rey")]
        public string NombreEquipo { get; set; }

        // [Required]
        // [MaxLength(30)]
        public string Ip { get; set; }

        public string Caracteristicas { get; set; }

        public Boolean? Activo { get; set; }

        public User User { get; set; }

        public int? UserId { get; set; }


    }
}

// =====================================================
// 
//   builder.Entity<Equipo>()
//             .HasOne( u => u.User)
//             .WithOne( e => e.Equipo)
//             .OnDelete(DeleteBehavior.SetNull);
// =====================================================    