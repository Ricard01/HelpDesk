using System.Collections.Generic;

namespace Admin.API.Models
{
    public class TicketsAsignados
    {
        public int TicketId { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
    }
}