using System;
using System.Threading.Tasks;
using Admin.API.Data;
using Admin.API.Dtos;
using Admin.API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Admin.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EquiposController : ControllerBase
    {
        private readonly IEquipoRepository _repo;
        private readonly IMapper _mapper;


        public EquiposController(IEquipoRepository repo, IMapper mapper)
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

        [Authorize(Policy = "RequireAdminRole")]
        [HttpGet]
        public async Task<IActionResult> GetAllEquipos()
        {
            var equipos = await _repo.GetAllEquipos();
            // var equiposToReturn = _mapper.Map<IEnumerable<EquipoListDto>>(equipos);
            // var equiposToReturn = equipos;
            return Ok(equipos);
        }


        [HttpGet("equipoExist/{nombreEquipo}")]
        public async Task<IActionResult> equipoExist(string nombreEquipo)
        {
            if (nombreEquipo == null)
            {
                return NotFound($"{nombreEquipo} no se indico un nombre de equipo valido");
            }


            var equipo = await _repo.UniqueEquipo(nombreEquipo);
            if (equipo == null)
            {
                return new JsonResult(false);
            }

            return new JsonResult(true);

        }

        [HttpGet("equiposDisponibles/{idUser}")]
        public async Task<IActionResult> GetEquiposDisponibles(int idUser)
        {
            var equiposDisponibles = await _repo.GetEquiposDisponibles(idUser);

            return Ok(equiposDisponibles);


        }


        [HttpGet("default/{idUser}")]
        public async Task<IActionResult> GetEquipoDefault(int idUser)
        {

            var equipo = await _repo.GetEquipoDefault(idUser);
            return Ok(equipo);
        }


        [Authorize(Policy = "RequireAdminRole")]
        [HttpPost]
        public async Task<IActionResult> CreateEquipo(Equipo equipo)
        {
            // var message = _mapper.Map<Message>(messageForCreationDto);
            equipo.Activo = true;
            _repo.Add(equipo);

            if (await _repo.SaveAll())
            {

                return Ok();
            }

            throw new Exception("Ocurrio un error al crear el equipo");




        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPut("update")]
        public async Task<IActionResult> UpdateEquipo(EquipoUpdDto equipo)
        {
            var equipoRepo = await _repo.GetEquipo(equipo.Id);
            var equipoUser = await _repo.GetEquipoOfUser(equipo.UserId);

            if (equipoUser is null && equipoRepo is null)
            {
                return NoContent();
            }

            // 1er Caso el Equipo no tiene un UserId por lo tanto es la primera asignacion 
            if (equipoUser is null && equipoRepo.UserId is null)
            {
                equipoRepo.UserId = equipo.UserId;
                _repo.Update(equipoRepo);
                if (await _repo.SaveAll())
                    return NoContent();

                throw new Exception($"Ocurrio un error al actualizar");

            }

            // 2do Caso Al usuario se le asigna ningun equipo o Tenia ningun equipo y guardo cambios.
            if (equipoUser != null && equipo.Id == 0)
            {
                equipoUser.UserId = null;
                _repo.Update(equipoUser);

                if (await _repo.SaveAll())
                    return NoContent();
                throw new Exception($"Ocurrio un error al actualizar");
            }


            // 3er Caso El usuario tenia previamente otro equipo asignado
            if (equipoUser != null && equipoUser.Id != equipo.Id)
            {
                equipoUser.UserId = null;
                _repo.Update(equipoUser);


                equipoRepo.UserId = equipo.UserId;
                _repo.Update(equipoRepo);
                if (await _repo.SaveAll())
                    return NoContent();
                throw new Exception($"Ocurrio un error al actualizar");
            }


            return NoContent();


        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPost("delete/{id}")]
        public async Task<IActionResult> DeleteEquipo(int id)
        {
            var equipoFromRepo = await _repo.GetEquipo(id);

            if (equipoFromRepo != null)
            {
                _repo.Delete(equipoFromRepo);

                if (await _repo.SaveAll())
                    return NoContent();

                throw new Exception("Error eliminado equipo");
            }

            throw new Exception("No se encontro el equipo a eliminar");

        }


    }
}