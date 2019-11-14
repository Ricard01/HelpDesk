using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Admin.API.Data;
using Admin.API.Persistence;
using Admin.API.Dtos;
using Admin.API.Helpers;
using Admin.API.Models;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Admin.API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class TicketsController : ControllerBase
    {
        #region ctor
        private readonly IAdminRepository _repo;
        private readonly ITicketRepository _repot;
        private readonly IMapper _mapper;
        private readonly AdminContext _context;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;


        public TicketsController(IAdminRepository repo, ITicketRepository repot, IMapper mapper,
        AdminContext context, IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _cloudinaryConfig = cloudinaryConfig;
            _mapper = mapper;
            _context = context;
            _repot = repot;
            _repo = repo;

            Account acc = new Account(
              _cloudinaryConfig.Value.CloudName,
              _cloudinaryConfig.Value.ApiKey,
              _cloudinaryConfig.Value.ApiSecret
          );

            _cloudinary = new Cloudinary(acc);

        }

        #endregion


        [HttpGet("GetTicketCreadoById/{TicketId}")]
        public async Task<IActionResult> GetTicketsCreadosById(int TicketId)
        {
           

            var ticket = await _repot.GetTicketCreadoById(TicketId);

            return Ok(ticket);
        }

        [HttpGet("GetTicketsCreados")]
        public async Task<IActionResult> GetTicketsCreados()
        {
            var currentUserID = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var userFromRepo = await _repo.GetUser(currentUserID);

            if (userFromRepo == null)
            {
                return NoContent();
            }

            var tickets = await _repot.GetTicketsCreados(userFromRepo.Id);

            var ticketsReturn = _mapper.Map<IEnumerable<TicketListDto>>(tickets);

            return Ok(ticketsReturn);
        }
        [HttpGet("TicketAsignadoById/{ticketId}")]
        public async Task<IActionResult> GetTicketAsignadoById(int ticketId)
        {
            var ticket = await _repot.GetTicketAsignadoById(ticketId);

            return Ok(ticket);
        }


        /// <summary>Lista de tickets asignados al usuario.
        /// <para>TicketsAsignados.</para>
        /// </summary>  
        [HttpGet("GetTicketsAsignados")]
        public async Task<IActionResult> GetTicketsAsignados()
        {
            var currentUserID = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var userFromRepo = await _repo.GetUser(currentUserID);

            if (userFromRepo == null)
            {
                return NoContent();
            }

            var tickets = await _repot.GetTicketsAsignados(userFromRepo.Id);

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


        [HttpPost]
        public async Task<IActionResult> CreateTicket(TicketNewDto ticketDto)
        {

            var ticketToCreate = _mapper.Map<Ticket>(ticketDto);
            _context.Add(ticketToCreate);
            if (await _context.SaveChangesAsync() > 0)
            {
                return Ok(ticketToCreate.Id);
            }
            throw new Exception("Ocurrio un error al crear el ticket");
        }


        [HttpPost("Adjuntar/{ticketId}")]
        public async Task<IActionResult> AdjuntosTicket(int ticketId, [FromForm]AdjuntosTicketDto fileUploadDto)
        {
            // //valida que la peticion sea del usuario logeado
            // if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            //     return Unauthorized();

            var file = fileUploadDto.File;

            var uploadResult = new RawUploadResult();

            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {

                    var uploadParams = new RawUploadParams()
                    {
                        // especifico los parametros para guardar el archivo
                        File = new FileDescription(file.FileName, stream),
                        UseFilename = true,
                        UniqueFilename = true,
                        Folder = "TicketsAdjuntos"
                    };

                    // Guarda el archivo en la nube 
                    uploadResult = _cloudinary.Upload(uploadParams);

                }


            }
            if (uploadResult.StatusCode.ToString() == "OK")
            {
                // mapeo los resultados devueltos 
                fileUploadDto.Nombre = fileUploadDto.File.FileName;
                fileUploadDto.ArchivoUrl = uploadResult.Uri.ToString();
                fileUploadDto.PublicId = uploadResult.PublicId;
                fileUploadDto.TicketId = ticketId;
            }
            // mapeo el dto con la clase
            var adTicket = _mapper.Map<AdjuntosTicket>(fileUploadDto);
            _context.Add(adTicket);


            if (await _context.SaveChangesAsync() > 0)
            {
                return Ok();
            }
            throw new Exception("Ocurrio un error al crear el ticket");
        }

        [HttpPost("TicketRespuesta")]
        public async Task<IActionResult> CreateTicketRespuesta(TicketRespuestaDto respuestaDto)
        {

            var respuesta = _mapper.Map<TicketRespuesta>(respuestaDto);
            _context.Add(respuesta);

            if (await _context.SaveChangesAsync() > 0)
            {
                var ticket = new Ticket { Id = respuesta.TicketId };
                ticket.Estatus = respuesta.Estatus;
                _context.Entry(ticket).Property(e => e.Estatus).IsModified = true;
                _context.SaveChanges();
                return Ok(respuesta.Id);

            }
            throw new Exception("Ocurrio un error al crear el ticket");
        }

        [HttpPost("AdjuntosRspuesta/{respuestaId}")]
        public async Task<IActionResult> AdjuntosRspuesta(int respuestaId, [FromForm]AdjuntosRespuestaDto fileUploadDto)
        {
            // //valida que la peticion sea del usuario logeado
            // if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            //     return Unauthorized();

            var file = fileUploadDto.File;

            var uploadResult = new RawUploadResult();

            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {

                    var uploadParams = new RawUploadParams()
                    {
                        // especifico los parametros para guardar el archivo
                        File = new FileDescription(file.FileName, stream),
                        UseFilename = true,
                        UniqueFilename = true,
                        Folder = "TicketsRespuesta"
                    };

                    // Guarda el archivo en la nube 
                    uploadResult = _cloudinary.Upload(uploadParams);

                }


            }
            if (uploadResult.StatusCode.ToString() == "OK")
            {
                // mapeo los resultados devueltos 
                fileUploadDto.Nombre = fileUploadDto.File.FileName;
                fileUploadDto.ArchivoUrl = uploadResult.Uri.ToString();
                fileUploadDto.PublicId = uploadResult.PublicId;
                fileUploadDto.TicketRespuestaId = respuestaId;
            }
            // mapeo el dto con la clase
            var adTicket = _mapper.Map<AdjuntosRespuesta>(fileUploadDto);
            _context.Add(adTicket);


            if (await _context.SaveChangesAsync() > 0)
            {
                return Ok();
            }
            throw new Exception("Ocurrio un error al crear el ticket");
        }

    }
}