using System.Collections.Generic;
using System.Threading.Tasks;
using Admin.API.Helpers;
using Admin.API.Models;

namespace Admin.API.Data
{
    public interface IAdminRepository
    {
        void Add<T>(T entity) where T : class;
        
        void Update<T>(T entity) where T : class;
        
        void Delete<T>(T entity) where T : class;
        
        Task<bool> SaveAll();

        Task<List<User>> GetAllUsers();

        Task<List<User>> GetUsersForTicket(int userId);

        Task<PagedList<User>> GetUsers(UserParams userParams);
  
        Task<User> GetUser(int id);

        Task<User> GetPhoto(int id);

        Task<bool> UserHasTicket(int UserId);


    }
}