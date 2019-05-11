using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Admin.API.Dtos;
using Admin.API.Helpers;
using Admin.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace Admin.API.Data
{
    public class AdminRepository : IAdminRepository 
    {
        private readonly DataContext _context;

        public AdminRepository(DataContext context)
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

        public async Task<User> GetUser(int id, bool isCurrentUser)
        {
            var query = _context.Users.AsQueryable();

            if (isCurrentUser)
                query = query.IgnoreQueryFilters();

            var user = await query.FirstOrDefaultAsync(u => u.Id == id);

            return user;

        }

        public async Task<List<User>> GetAllUsers()
        {
          var users = await _context.Users.ToListAsync();
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

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

    }
}