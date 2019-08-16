using System;
using System.Collections.Generic;

namespace Admin.API.Models
{
    public class TicketDetalle
    {
        public int Id { get; set; }

        public int UserId3 { get; set; }

        public string Mensaje { get; set; }

        public DateTime Fecha { get; set; }

        public List<TicketAdjuntos> TicketAdjuntos { get; set; }
    }
}