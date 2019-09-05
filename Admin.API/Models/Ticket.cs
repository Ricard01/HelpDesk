using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Admin.API.Models
{
    public class Ticket
    {
        public int Id { get; set; }

        // [Column("CreoUserId")]u
        public int UserId { get; set; }

        public DateTime FechaAlta { get; set; }

        [Required]
        [MaxLength(30)]
        [StringLength(30, ErrorMessage = "El nombre de equipo es obligatorio mi rey")]
        public string Titulo { get; set; }

        public string Mensaje { get; set; }
        // [Column(TypeName = "decimal(5, 2)")]
        public byte Prioridad { get; set; }

        public byte Estatus { get; set; }

        public User User { get; set; }

        public ICollection<TicketsAsignados> TicketsAsignados { get; set; }

    }

    public enum Prioridad
    {
        Normal = 1, Alta = 2, Urgente = 3
    }

    public enum Estatus
    {
        Abierto = 1, ReAbrir = 2, EnProceso  = 3, Cerrado = 4
    }

    //    bitacoraImportacion.TipoProceso = (int)TipoProceso.Nuevo;

}