using System;

namespace Admin.API.Models
{
    public class AdjuntosRespuesta
    {
        public int Id { get; set; }
        
        public int TicketRespuestaId { get; set; }

        public string Nombre { get; set; }

        public string ArchivoUrl { get; set; }

        public string PublicId { get; set; }

        public DateTime FechaAlta { get; set; }

        public TicketRespuesta TicketRespuesta { get; set; }

        public AdjuntosRespuesta()
        {
            FechaAlta = DateTime.Now;
        }
    }
}