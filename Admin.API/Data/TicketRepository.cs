using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Admin.API.Persistence;
using Admin.API.Helpers;
using Admin.API.Models;
using Microsoft.EntityFrameworkCore;
using AutoMapper;

namespace Admin.API.Data
{
    public class TicketRepository : ITicketRepository
    {
        #region ctor
        private readonly AdminContext _context;
        private readonly IMapper _mapper;

        public TicketRepository(AdminContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;

        }

        #endregion

        public async Task<Ticket> TicketCreadoById(int ticketId)
        {

            var ticket = (from t in _context.Tickets.TagWith("TicketCreadoById")
                          join ta in _context.TicketsAsignados on t.Id equals ta.TicketId into tas
                          from ta in tas.DefaultIfEmpty()
                          join us in _context.Users on ta.UserId equals us.Id into user
                          from us in user.DefaultIfEmpty()
                          where t.Id == ticketId

                          select new Ticket()
                          {
                              Id = t.Id,
                              Titulo = t.Titulo,
                              Mensaje = t.Mensaje,
                              FechaAlta = t.FechaAlta,
                              Prioridad = t.Prioridad,
                              Estatus = t.Estatus,
                              //   TicketsAsignados = from ta in _context.TicketsAsignados where ta.TicketId == ticketId select new TicketsAsignados  { ta.User.UserName, ta.User.FotoUrl, ta.User.Id },
                              User = new User { UserName = us.UserName, FotoUrl = us.FotoUrl },
                          }).FirstOrDefaultAsync();

            return await ticket;
        }
        public async Task<List<Ticket>> GetTicketsCreados(int userId)
        {
            var ticketCreados =  _context.Tickets.TagWith("GetTicketsCreados")
            .Include( ta => ta.TicketsAsignados).ThenInclude( u => u.User)
            .Where(                t => t.UserId == userId);
            
            //  join ticketAsignado in _context.TicketsAsignados.Include( u => u.User) on ticket.Id equals ticketAsignado.TicketId into tickets 
            //  from ta in tickets.DefaultIfEmpty()
            // join ua in _context.Users on ta.UserId equals ua.Id into userAsignados
            // from user in userAsignados.DefaultIfEmpty()
        

                                // where ticket.UserId == userId

                                // select new Ticket
                                // {
                                //     Id = ticket.Id,
                                //     Titulo = ticket.Titulo,
                                //     Mensaje = ticket.Mensaje,
                                //     FechaAlta = ticket.FechaAlta,
                                //     Prioridad = ticket.Prioridad,
                                //     Estatus = ticket.Estatus,
                                //     TicketsAsignados = tickets.ToList()
                                //     // TicketsAsignados = (from t in tickets select new TicketsAsignados{
                                //     //     TicketId = t.TicketId,
                                //     //     User = ( from u in userAsignados select new User { Id= u.Id , UserName = u.UserName, FotoUrl = u.FotoUrl }).FirstOrDefault()
                                //     //  }).ToList()
                                // };

            return await ticketCreados.ToListAsync();
        }

        public async Task<List<Ticket>> GetTicketsAsignados(int userId)
        {
            var tickets = await (from t in _context.Tickets
                                 join ta in _context.TicketsAsignados on t.Id equals ta.TicketId
                                 join us in _context.Users on ta.UserId equals us.Id
                                 where t.UserId == userId
                                 select new Ticket() { Id = t.Id, User = us, FechaAlta = t.FechaAlta }).ToListAsync();


            return tickets;
        }

        // public async Task<List<Ticket>> GetTicketsAsignados(int userId)
        // {
        //     var tickets = await _context.Tickets
        //       .Include(ticketAsignado => ticketAsignado.TicketsAsignados)
        //       .ThenInclude(user => user.User)
        //    .Where(ticket => ticket.UserId == userId).ToListAsync();


        //     return tickets;
        // }

        public async Task<PagedList<Ticket>> GetTickets(UserParams userParams)
        {
            var tickets = _context.Tickets.Include(u => u.User).OrderBy(t => t.Id).AsQueryable();

            // tickets = tickets.Where(u => u.UserId == userParams.UserId);

            if (userParams.Estatus > 0)
            {
                tickets = tickets.Where(t => t.Estatus == userParams.Estatus);
            }

            if (userParams.FechaIni != null && userParams.FechaFin != null)
            {


                tickets = tickets.Where(t => t.FechaAlta >= userParams.FechaIni && t.FechaAlta <= userParams.FechaFin);
            }

            if (!string.IsNullOrEmpty(userParams.OrderBy))
            {
                switch (userParams.OrderBy)
                {
                    case "Id":
                        tickets = tickets.OrderBy(t => t.Id);
                        break;

                    case "Estatus":
                        tickets = tickets.OrderBy(t => t.Estatus);
                        break;

                    case "estatus":
                        tickets = tickets.OrderByDescending(t => t.Estatus);
                        break;

                    case "Fecha":
                        tickets = tickets.OrderBy(t => t.FechaAlta);
                        break;

                    case "fecha":
                        tickets = tickets.OrderByDescending(t => t.FechaAlta);
                        break;

                    case "Prioridad":
                        tickets = tickets.OrderBy(t => t.Prioridad);
                        break;

                    case "prioridad":
                        tickets = tickets.OrderByDescending(t => t.Prioridad);
                        break;

                    case "Usuario":
                        tickets = tickets.OrderBy(t => t.User.UserName);
                        break;

                    case "usuario":
                        tickets = tickets.OrderByDescending(t => t.User.UserName);
                        break;


                    default:
                        tickets = tickets.OrderByDescending(t => t.Id);
                        break;
                }
            }

            return await PagedList<Ticket>.CreateAsync(tickets, userParams.NumPagina, userParams.ItemsxPagina);
        }

        public async Task<object> GetUltimaRespuestaInsertada(int respuestaId)
        {

            var respuesta = await (from resp in _context.TicketsRespuestas.TagWith("GetUltimaRespuestaInsertada")
                                       //    join adj in _context.AdjuntosRespuestas on resp.Id equals adj.TicketRespuestaId into adjuntos
                                       //    from adj in adjuntos.DefaultIfEmpty()
                                   where resp.Id == respuestaId

                                   select new
                                   {
                                       Id = resp.Id,
                                       Respuesta = resp.Respuesta,
                                       Estatus = resp.Estatus,
                                       Fecha = resp.Fecha,
                                       UserName = resp.User.UserName,
                                       FotoUrl = resp.User.FotoUrl,
                                       //    AdjuntosRespuesta = adjuntos
                                       AdjuntosRespuesta = from adjt in _context.AdjuntosRespuestas where adjt.TicketRespuestaId == respuestaId select adjt,

                                   }).FirstOrDefaultAsync();

            return respuesta;

        }

        // Para reportes 
        // public async Task<List<Ticket>> GetTicketsAsignados(int idUser)
        // {
        //     // Este quedo "perfecto"
        //     var tickets = from t in _context.Tickets.Include(u => u.User)
        //                   join ta in _context.TicketsAsignados on t.Id equals ta.TicketId
        //                   where
        //                     ta.UserId == idUser
        //                   select t;

        //     return await tickets.ToListAsync();
        // }

        // public async Task<List<Ticket>> GetTicketsCreados(int idUser)
        // {

        //     var tickets = await _context.Tickets
        //     .Include(ticketAsignado => ticketAsignado.TicketsAsignados)
        //     .ThenInclude(user => user.User)
        //  .Where(ticket => ticket.UserId == idUser).ToListAsync();


        //     return tickets;
        // }



        public async Task<object> GetTicketCreadoById(int ticketId)
        {

            var ticket = await (from t in _context.Tickets.TagWith("GetTicketCreadoById")

                                where t.Id == ticketId

                                select new
                                {
                                    Id = t.Id,
                                    Titulo = t.Titulo,
                                    Mensaje = t.Mensaje,
                                    FechaAlta = t.FechaAlta,
                                    Prioridad = t.Prioridad,
                                    Estatus = t.Estatus,
                                    UserAsignados = from ticketsAsignados in _context.TicketsAsignados where ticketsAsignados.TicketId == ticketId select new { ticketsAsignados.User.UserName, ticketsAsignados.User.FotoUrl, ticketsAsignados.User.Id },
                                    UserName = t.User.UserName,
                                    UserFotoUrl = t.User.FotoUrl,
                                    Adjuntos = from adjt in _context.AdjuntosTicket where adjt.TicketId == ticketId select adjt,

                                    TicketRespuestas = from resp in _context.TicketsRespuestas
                                                       where resp.TicketId == ticketId
                                                       orderby resp.Id
                                                       select new { resp.Id, resp.Respuesta, resp.Fecha, resp.Estatus, resp.User.UserName, resp.User.FotoUrl, resp.AdjuntosRespuesta }
                                }).FirstOrDefaultAsync();

            return ticket;
        }


        public async Task<object> GetTicketAsignadoById(int ticketId)
        {

            var ticket = await (from t in _context.Tickets.TagWith("GetTicketAsignadoById")
                                where t.Id == ticketId

                                select new
                                {
                                    Id = t.Id,
                                    Titulo = t.Titulo,
                                    Mensaje = t.Mensaje,
                                    FechaAlta = t.FechaAlta,
                                    Prioridad = t.Prioridad,
                                    Estatus = t.Estatus,
                                    UserName = t.User.UserName,
                                    UserFotoUrl = t.User.FotoUrl,
                                    Adjuntos = from adjt in _context.AdjuntosTicket where adjt.TicketId == ticketId select adjt,

                                    TicketRespuestas = from resp in _context.TicketsRespuestas
                                                       where resp.TicketId == ticketId
                                                       orderby resp.Id
                                                       select new { resp.Id, resp.Respuesta, resp.Fecha, resp.Estatus, resp.User.UserName, resp.User.FotoUrl, resp.AdjuntosRespuesta }

                                }).FirstOrDefaultAsync();

            return ticket;
        }


    }
}