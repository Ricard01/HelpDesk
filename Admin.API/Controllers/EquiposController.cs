using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Admin.API.Data;
using Admin.API.Dtos;
using Admin.API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Admin.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EquiposController : ControllerBase
    {
        private readonly IAdminRepository _repo;
        private readonly IMapper _mapper;


        public EquiposController(IAdminRepository repo, IMapper mapper)
        {

            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet("{idEquipo}")]
        public async Task<IActionResult> GetEquipo(int idEquipo)
        {

            var equipo = await _repo.GetEquipo(idEquipo);
            return Ok(equipo);

        }
        [HttpGet]
        public async Task<IActionResult> GetAllEquipos()
        {
            var equipos = await _repo.GetAllEquipos();

            // var equiposToReturn = _mapper.Map<IEnumerable<EquipoListDto>>(equipos);
            // var equiposToReturn = equipos;

            return Ok(equipos);
        }

        [HttpPost]
        public async Task<IActionResult> CreateEquipo(Equipo equipo)
        {
            // var message = _mapper.Map<Message>(messageForCreationDto);

            _repo.Add(equipo);

            if (await _repo.SaveAll())
            {

                return Ok();
            }

            throw new Exception("Ocurrio un error al crear el equipo");


        }


        [HttpPut("update")]
        public async Task<IActionResult> UpdateEquipo(EquipoUpdDto equipoDto)
        {
            var equipoFromRepo = await _repo.GetEquipo(equipoDto.Id);

            _mapper.Map(equipoDto, equipoFromRepo);

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Ocurrion un error al actualizar");
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteEquipo(Equipo equipo)
        {

            _repo.Delete(equipo);

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception("Error eliminado equipo");

        }


    }
}