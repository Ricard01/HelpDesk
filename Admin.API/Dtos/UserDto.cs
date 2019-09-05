using System.Collections.Generic;

namespace Admin.API.Dtos
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Username { get; set; }

        // public ICollection<TicketNewDto> TicketNewDto { get; set; }

        // public ICollection<TicketsAsignadosDto> TicketsAsignadosDto { get; set; }
    }
}