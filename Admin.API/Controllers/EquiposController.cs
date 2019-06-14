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

        [HttpGet]
        public async Task<IActionResult> GetAllEquipos()
        {
            var equipos = await _repo.GetAllEquipos();

            var equiposToReturn = _mapper.Map<IEnumerable<EquipoListDto>>(equipos);

            return Ok(equiposToReturn);
        }

        [HttpPut("{idUser}")]
        public async Task<IActionResult> UpdateEquipo(int idUser, EquipoListDto equipoDto)
        {

            var equipoFromRepo = await _repo.GetEquipo( equipoDto.Id);
            _mapper.Map(equipoDto, equipoFromRepo);

            _repo.Update(equipoFromRepo);

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Ocurrio un error al actualizar el equipo  ");

        }


        [HttpPut("update")]
        public async Task<IActionResult> Update(EquipoUpdDto equipoDto) 
        {
            var equipoFromRepo = await _repo.GetEquipo( equipoDto.Id);

            _mapper.Map( equipoDto, equipoFromRepo );
            
            if ( await _repo.SaveAll())
            return NoContent();

            throw new Exception($"Ocurrion un error al actualizar");
        }
    }
}