using System.Collections.Generic;
using System.Threading.Tasks;
using Admin.API.Models;

namespace Admin.API.Data
{
    public interface IEquipoRepository
    {


        void Add<T>(T entity) where T : class;
        void Update<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
        Task<List<Equipo>> GetAllEquipos();

        Task<Equipo> GetEquipo(int id);

        Task<Equipo> GetEquipoOfUser(int? UserId);


        Task<List<Equipo>> GetEquiposDisponibles(int? idUser);
        Task<Equipo> GetEquipoDefault(int id);
        Task<Equipo> UniqueEquipo(string nombreEquipo);
      
        
         Task<List<Equipo>> GetEquipos();
         
        Task<Equipo> updateEquipoIdUser(int? idUser);

    }
}