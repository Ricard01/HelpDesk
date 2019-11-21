using System.Collections.Generic;
using System.Threading.Tasks;
using Admin.API.Helpers;
using Admin.API.Models;

namespace Admin.API.Data
{
    public interface ITicketRepository
    {
        Task<object> GetTicketCreadoById(int ticketId);

        Task<List<Ticket>> GetTicketsCreados(int idUser);

        Task<object> GetTicketAsignadoById(int ticketId);

        Task<List<Ticket>> GetTicketsAsignados(int idUser);

        Task<PagedList<Ticket>> GetTickets(UserParams userParams);
    }
}