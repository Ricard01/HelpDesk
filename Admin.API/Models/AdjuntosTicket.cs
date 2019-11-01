using System;
using System.ComponentModel.DataAnnotations;

namespace Admin.API.Models
{
    public class AdjuntosTicket
    {
        public int Id { get; set; }

        public int TicketId { get; set; }

        [MaxLength(60)]
        [StringLength(60, ErrorMessage = "El nombre de archivo no debe exceder los 60 caracteres")]
        public string Nombre { get; set; }

        public string ArchivoUrl { get; set; }

        public string PublicId { get; set; }

        // public virtual Ticket Ticket { get; set; }

        public DateTime FechaAlta { get; set; }


        public AdjuntosTicket()
        {
            FechaAlta = DateTime.Now;
        }


    }
}