using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Admin.API.Dtos
{
    public class TicketNewDto
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public DateTime FechaAlta { get; set; }

        public string Titulo { get; set; }

        public string Mensaje { get; set; }

        public byte Prioridad { get; set; }

        public byte Estatus { get; set; }

        // public UserDto UserDto { get; set; }

        public ICollection<TicketsAsignadosDto> TicketsAsignados { get; set; }

        public TicketNewDto()
        {
            FechaAlta = DateTime.Now;
            Estatus = 1;
        }

    }
    // public enum Estatus
    // {
    //     Abierto = 1, ReAbrir = 2, EnProceso = 3, Cerrado = 4
    // }
}