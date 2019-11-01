using System;
using System.Collections.Generic;

namespace Admin.API.Models
{
    public class TicketRespuesta
    {
        public int Id { get; set; }

        public int TicketId { get; set; }

        public int UserId  { get; set; }

        public string Respuesta { get; set; }

        public byte Estatus { get; set; }   

        public DateTime Fecha { get; set; }

        public  User User { get; set; }

        // public virtual Ticket Ticket { get; set; }

        public ICollection<AdjuntosRespuesta> AdjuntosRespuesta { get; set; }
        
    }
}