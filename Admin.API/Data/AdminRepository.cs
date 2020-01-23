using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Admin.API.Persistence;
using Admin.API.Models;
using Microsoft.EntityFrameworkCore;
using System;
using Admin.API.Helpers;

namespace Admin.API.Data
{
    public class AdminRepository : IAdminRepository
    {
        private readonly AdminContext _context;

        public AdminRepository(AdminContext context)
        {
            _context = context;
        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Update<T>(T entity) where T : class
        {
            _context.Update(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<User> GetUser(int id)
        {

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
            if (user == null)
            {
                throw new Exception($"Ocurrio un error al obtener el usuario con Id {id} ");
            }
            return user;
            // 
        }

        public async Task<List<User>> GetUsersForTicket(int userId)
        {
            var users = await _context.Users.Where(u => u.Id != userId && u.Activo == true).ToListAsync();
            return users;
        }

        public async Task<List<User>> GetAllUsers()
        {
            var users = await _context.Users.Include(e => e.Equipo).ToListAsync();
            return users;

        }

         public async Task<PagedList<User>> GetUsers(UserParams userParams)
        {
            // 
            var users = _context.Users.AsQueryable();

            return await PagedList<User>.CreateAsync(users, userParams.NumPagina, userParams.ItemsxPagina);
        }

        public async Task<User> GetPhoto(int id)
        {
            var photo = await _context.Users
                .FirstOrDefaultAsync(p => p.Id == id);

            return photo;
        }

        public async Task<bool> UserHasTicket(int UserId)
        {

            var userHasTicketCreado = await _context.Tickets.Where(u => u.UserId == UserId).Select(u => u.UserId).FirstOrDefaultAsync();

            var userHasTicketAsignado = await _context.TicketsAsignados.Where(u => u.UserId == UserId).Select(u => u.UserId).FirstOrDefaultAsync();

            if (userHasTicketAsignado > 1 || userHasTicketCreado > 1)
            {
                return (true);
            }

            return (false);

        }


    }
}