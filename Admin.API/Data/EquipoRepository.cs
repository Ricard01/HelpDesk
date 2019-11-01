using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Admin.API.Models;
using Admin.API.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Admin.API.Data
{
    public class EquipoRepository : IEquipoRepository
    {
        private readonly AdminContext _context;
        public EquipoRepository(AdminContext context)
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


        public async Task<Equipo> GetEquipo(int id)
        {
            var equipo = await _context.Equipos.FirstOrDefaultAsync(e => e.Id == id);
            return equipo;
        }


        public async Task<Equipo> GetEquipoOfUser(int? UserId)
        {
            var equipo = await _context.Equipos.FirstOrDefaultAsync(e => e.UserId == UserId);
            return equipo;
        }

        public async Task<List<Equipo>> GetAllEquipos()
        {
            var equipos = await _context.Equipos.ToListAsync();
            return equipos;
        }
        public async Task<List<Equipo>> GetEquipos()
        {
            var equipos = await _context.Equipos.ToListAsync();
            return equipos;
        }

        // =====================================================
        // Obtengo la lista de equipos disponibles para el usuario a editar =>
        // donde el id del usuario sea igual al usuario a editar y el idUser sea null
        // =====================================================
        public async Task<List<Equipo>> GetEquiposDisponibles(int? idUser)
        {
            var equiposDisponibles = await _context.Equipos.Where(e => e.UserId == idUser || e.UserId == null).ToListAsync();
            return equiposDisponibles;
        }

        public async Task<Equipo> GetEquipoDefault(int id)
        {
            var equipoDefault = await _context.Equipos.FirstOrDefaultAsync(e => e.UserId == id);
            return equipoDefault;
        }

      

        public async Task<Equipo> UniqueEquipo(string nombreEquipo)
        {
            var equipo = await _context.Equipos.FirstOrDefaultAsync(e => e.NombreEquipo == nombreEquipo);
            return equipo;
        }



        public Task<Equipo> updateEquipoIdUser(int? idUser)
        {
            throw new System.NotImplementedException();
        }

    }
}