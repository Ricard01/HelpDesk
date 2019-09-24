using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Admin.API.Data;
using Admin.API.Dtos;
using Admin.API.Helpers;
using Admin.API.Models;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Options;

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

        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;

        private Cloudinary _cloudinary;

        public UsersController(IAdminRepository repo, IMapper mapper, UserManager<User> userManager, IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _cloudinaryConfig = cloudinaryConfig;
            _userManager = userManager;
            _mapper = mapper;
            _repo = repo;

            Account acc = new Account(
               _cloudinaryConfig.Value.CloudName,
               _cloudinaryConfig.Value.ApiKey,
               _cloudinaryConfig.Value.ApiSecret
           );

            _cloudinary = new Cloudinary(acc);
        }

        // [AcceptVerbs("Get", "Post")]

        [HttpGet("userexist/{username}")]
        public async Task<IActionResult> UserNameInUse(string username)
        {
            if (username == null)
            {
                return NotFound($"{username} no se indico un nombre de usuario valido");
            }


            var user = await _userManager.FindByNameAsync(username);
            if (user != null)
            {
                return new JsonResult(true);
            }
            else
            {
                return new JsonResult(false);

            }

        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpGet("All")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _repo.GetAllUsers();

            var usersToReturn = _mapper.Map<IEnumerable<UserDetDto>>(users);

            return Ok(usersToReturn);
        }


        [HttpGet("{userId}/forticket")]
        public async Task<IActionResult> GetUsersForTicket(int userId)
        {

            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var users = await _repo.GetUsersForTicket(userId);

            var usersToReturn = _mapper.Map<IEnumerable<UserDetDto>>(users);

            return Ok(usersToReturn);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {

            var isCurrentUser = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value) == id;

            var user = await _repo.GetUser(id, isCurrentUser);

            var userToReturn = _mapper.Map<UserForDetailedDto>(user);

            return Ok(userToReturn);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUserProfile(int id, UserUpdateProfileDto userForUpdateDto)
        {

            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var userFromRepo = await _repo.GetUser(id, true);

            _mapper.Map(userForUpdateDto, userFromRepo);

            _repo.Update(userFromRepo);

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Ocurrio un error al actualizar el usuario con  {id} ");
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPut("update/{idUser}")]
        public async Task<IActionResult> UpdateUser(int idUser, UserForUpdateDto userUpdateProfileDto)
        {

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

            var publicIdRepo = userFromRepo.PublicId;

            _repo.Delete(userFromRepo);

            if (await _repo.SaveAll())
            {
                // Sobre el mismo controller Funciona
                //    return RedirectToRoute(new
                // {
                //     controller = "Users",
                //     action = "Get",
                //     id = publicIdRepo+1
                // });
                DeletePhotoProfile(userFromRepo.PublicId);
                return Ok();


            }

            throw new Exception("Ocurrio un error al intentar eliminar el usuario");
        }
        [Authorize(Policy = "RequireAdminRole")]

        public void DeletePhotoProfile(string publicId)
        {
            if (publicId != null)
            {
                var deleteParams = new DeletionParams(publicId);


                var result = _cloudinary.Destroy(deleteParams);

                if (result.Result == "ok")
                {
                    publicId = "";
                }
            }

        }
    }
}