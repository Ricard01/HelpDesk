using System;

namespace Admin.API.Models
{
    public class AdjuntosTicket
    {
        public int Id { get; set; }

        public int TicketId { get; set; }

        public string ArchivoUrl { get; set; }

        public string PublicId { get; set; }

        public  Ticket Ticket { get; set; }

        public DateTime FechaAlta { get; set; }

        public AdjuntosTicket()
        {
            FechaAlta = DateTime.Now;
        }


    }
}