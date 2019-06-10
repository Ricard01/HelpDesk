using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Admin.API.Data;
using Admin.API.Dtos;
using Admin.API.Helpers;
using Admin.API.Models;
using AutoMapper;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Admin.API.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IAdminRepository _repo;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;

        public UsersController(IAdminRepository repo, IMapper mapper, UserManager<User> userManager)
        {
            _userManager = userManager;
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet("All")]
        public async Task<IActionResult> GetAllUsers([FromQuery]UserParams userParams)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var userFromRepo = await _repo.GetUser(currentUserId, true);

            userParams.UserId = currentUserId;



            var users = await _repo.GetAllUsers();

            var usersToReturn = _mapper.Map<IEnumerable<UserForDetailedDto>>(users);



            return Ok(usersToReturn);
        }


        [HttpGet]
        public async Task<IActionResult> GetUsers([FromQuery]UserParams userParams)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var userFromRepo = await _repo.GetUser(currentUserId, true);

            userParams.UserId = currentUserId;



            var users = await _repo.GetUsers(userParams);

            var usersToReturn = _mapper.Map<IEnumerable<UserForDetailedDto>>(users);

            Response.AddPagination(users.PaginaActual, users.PageSize,
                users.TotalCount, users.TotalPaginas);

            return Ok(usersToReturn);
        }


        [HttpGet("{id}", Name = "GetUser")]
        public async Task<IActionResult> GetUser(int id)
        {
            var isCurrentUser = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value) == id;

            var user = await _repo.GetUser(id, isCurrentUser);

            var userToReturn = _mapper.Map<UserForDetailedDto>(user);

            return Ok(userToReturn);
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserForUpdateDto userForUpdateDto)
        {
            // TODO TIP valida que solo el usuario actualmente logeado edite/continue
            // var hola = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            // if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            //     return Unauthorized();

            var userFromRepo = await _repo.GetUser(id, true);

            _mapper.Map(userForUpdateDto, userFromRepo);

            _repo.Update(userFromRepo);

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Ocurrio un error al actualizar el usuario con  {id} ");
        }

        [HttpPut("update/{idUser}")]
        public async Task<IActionResult> UpdateUserProfile(int idUser, UserUpdateProfileDto userUpdateProfileDto)
        {
            // TODO validar que solo los usuarios administradores puedan actualizar la informacion de los usuarios
            var idAdmin = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            if (idUser != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var userFromRepo = await _repo.GetUser(idUser, true);

            _mapper.Map(userUpdateProfileDto, userFromRepo);

            _repo.Update(userFromRepo);

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Actualizando usuario {idUser} fallo");
        }


        [Authorize(Policy = "RequireAdminRole")]
        [HttpPut("cambiarPassword")]
        public async Task<IActionResult> CambiarPassword(int id, UserUpdatePasswordDto user)
        {
            // User.IsInRole("rolename");

            var userFromRepo = await _repo.GetUser(user.Id);

            var userToChangePassword = _mapper.Map<User>(userFromRepo);

            var newPassword = _userManager.PasswordHasher.HashPassword(userToChangePassword, user.Password);

            userToChangePassword.PasswordHash = newPassword;

            var result = await _userManager.UpdateAsync(userToChangePassword);

            if (result.Succeeded)
            {
                return NoContent();
            }
            return BadRequest(result.Errors);


        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPost("delete/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {

            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            if (id == currentUserId)
                throw new Exception($"Eliminando usuario  fallo");

            var userFromRepo = await _repo.GetUser(id);


            _repo.Delete(userFromRepo);

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception("Ocurrio un error al intentar eliminar el usuario");
        }

    }
}