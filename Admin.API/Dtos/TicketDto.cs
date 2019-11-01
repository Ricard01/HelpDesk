using System;
using System.Collections.Generic;
using Admin.API.Models;

namespace Admin.API.Dtos
{
    public class TicketDto
    {

        public int Id { get; set; }

        public DateTime FechaAlta { get; set; }

        public string Titulo { get; set; }

        public string Mensaje { get; set; }
    
        public byte Prioridad { get; set; }

        public byte Estatus { get; set; }

        public UserDto User { get; set; }

        // public ICollection<TicketsAsignadosDto> TicketsAsignados { get; set; }

        public ICollection<AdjuntosTicketDetalleDto> AdjuntosTicket { get; set; }

        public ICollection<TicketRespuestaDto> TicketRespuesta { get; set; }
        
    }
}