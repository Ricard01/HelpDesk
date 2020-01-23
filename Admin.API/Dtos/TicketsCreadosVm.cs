using System;
using System.Collections.Generic;

namespace Admin.API.Dtos
{
    public class TicketsCreadosVm
    {
        public TicketsCreadosVm()
        {

            UsersAsignados = new HashSet<UserDto>();
        }

        public int Id { get; set; }

        public int UserId { get; set; }

        public DateTime FechaAlta { get; set; }

        public string Titulo { get; set; }

        public string Mensaje { get; set; }

        public byte Prioridad { get; set; }

        public byte Estatus { get; set; }

        public ICollection<UserDto> UsersAsignados { get; set; }

    }
}
