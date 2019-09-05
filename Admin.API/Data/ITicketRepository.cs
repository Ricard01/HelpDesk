using System.Collections.Generic;
using System.Threading.Tasks;
using Admin.API.Helpers;
using Admin.API.Models;

namespace Admin.API.Data
{
    public interface ITicketRepository
    {
        Task<Ticket> GetTicket(int id);

        Task<List<Ticket>> GetMyTickets(int idUser);

        Task<PagedList<Ticket>> GetTickets(UserParams userParams);
    }
}