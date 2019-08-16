using System;
using System.Collections.Generic;

namespace Admin.API.Models
{
    public class Ticket
    {
        public int Id { get; set; }

        public int UserId2 { get; set; }

        public DateTime FechaAlta { get; set; }

        public string Titulo { get; set; }  

        public string  Mensaje  { get; set; }

        public byte Prioridad { get; set; }

        public byte Status { get; set; }

        public List<TicketAdjuntos> TicketAdjuntos { get; set; }
    }
}