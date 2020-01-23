using System;
using System.Collections.Generic;

namespace Admin.API.Dtos
{
    public class TicketListDto
    
    {
        
        public int Id { get; set; }

        public UserDto User { get; set; }

        public DateTime FechaAlta { get; set; }

        public string Titulo { get; set; }

        public string Mensaje { get; set; }

        public byte Prioridad { get; set; }

        public byte Estatus { get; set; }

        public ICollection<TicketsAsignadosDto> TicketsAsignados { get; set; }
    }
}