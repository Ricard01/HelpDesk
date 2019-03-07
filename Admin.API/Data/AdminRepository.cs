using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Admin.API.Dtos;
using Admin.API.Helpers;
using Admin.API.Models;
using Microsoft.EntityFrameworkCore;

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

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }


        public async Task<User> GetUser(int id, bool isCurrentUser)
        {  
            var query = _context.Users.AsQueryable();

            if (isCurrentUser)
                query = query.IgnoreQueryFilters();

            var user = await query.FirstOrDefaultAsync(u =>  u.Id == id);

            return user;

        }



        // public async Task<PagedList<User>> GetUsers(UserParams userParams)
        // {
        //     var users = _context.Users.OrderByDescending(u => u.LastActive).AsQueryable();

        //     users = users.Where(u => u.Id != userParams.UserId);

        //     users = users.Where(u => u.Gender == userParams.Gender);

        //     if (userParams.Likers)
        //     {
        //         var userLikers = await GetUserLikes(userParams.UserId, userParams.Likers);
        //         users = users.Where(u => userLikers.Contains(u.Id));
        //     }

        //     if (userParams.Likees)
        //     {
        //         var userLikees = await GetUserLikes(userParams.UserId, userParams.Likers);
        //         users = users.Where(u => userLikees.Contains(u.Id));
        //     }

        //     if (userParams.MinAge != 18 || userParams.MaxAge != 99)
        //     {
        //         var minDob = DateTime.Today.AddYears(-userParams.MaxAge - 1);
        //         var maxDob = DateTime.Today.AddYears(-userParams.MinAge);

        //         users = users.Where(u => u.DateOfBirth >= minDob && u.DateOfBirth <= maxDob);
        //     }

        //     if (!string.IsNullOrEmpty(userParams.OrderBy))
        //     {
        //         switch (userParams.OrderBy)
        //         {
        //             case "created":
        //                 users = users.OrderByDescending(u => u.Created);
        //                 break;
        //             default:
        //                 users = users.OrderByDescending(u => u.LastActive);
        //                 break;
        //         }
        //     }

        //     return await PagedList<User>.CreateAsync(users, userParams.PageNumber, userParams.PageSize);
        // }
    public async Task<PagedList<User>> GetUsers(UserParams userParams)
        {
            var users = _context.Users.AsQueryable();

            users = users.Where(u => u.Id != userParams.UserId);


            return await PagedList<User>.CreateAsync(users, userParams.PageNumber, userParams.PageSize);
        }


        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

    }
}