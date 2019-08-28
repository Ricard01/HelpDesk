using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Admin.API.Data;
using Admin.API.Dtos;
using Admin.API.Helpers;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Admin.API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class TicketsController : ControllerBase
    {
        private readonly IAdminRepository _repo;
        private readonly ITicketRepository _repot;
        private readonly IMapper _mapper;

        public TicketsController(IAdminRepository repo, ITicketRepository repot, IMapper mapper)
        {
            _mapper = mapper;
            _repot = repot;
            _repo = repo;

        }

        [HttpGet("{ticketId}")]
        public async Task<IActionResult> GetTicket(int ticketId)
        {
            var ticket = await _repot.GetTicket(ticketId);
            return Ok(ticket);
        }

        [HttpGet("All")]
        public async Task<IActionResult> GetTicketsAll()
        {
            var tickets = await _repot.GetTicketsAll();

            var ticketsReturn = _mapper.Map<IEnumerable<TicketListDto>>(tickets);

            return Ok(ticketsReturn);
        }

        [HttpGet]
        public async Task<IActionResult> GetTickets([FromQuery]UserParams userParams)
        {

            var currentUserID = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var userFromRepo = await _repo.GetUser(currentUserID);

            userParams.UserId = userFromRepo.Id;
           
       

            var tickets = await _repot.GetTickets(userParams);

            var ticketsReturn = _mapper.Map<IEnumerable<TicketListDto>>(tickets);

            Response.AddPagination(tickets.PaginaActual, tickets.PageSize,
            tickets.TotalCount, tickets.TotalPaginas);

            return Ok(ticketsReturn);
        }


    }
}