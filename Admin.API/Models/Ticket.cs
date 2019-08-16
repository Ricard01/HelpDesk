using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Admin.API.Models
{
    public class Ticket
    {
        public int Id { get; set; }

        [Column("CreoUserId")]
        public int UserId { get; set; }

        public DateTime FechaAlta { get; set; }
        
        [Required]
        [MaxLength(30)]
        [StringLength(30, ErrorMessage = "El nombre de equipo es obligatorio mi rey")]
        public string Titulo { get; set; }

        public string Mensaje { get; set; }

        public byte Prioridad { get; set; }

        public byte Status { get; set; }
        
    }
}