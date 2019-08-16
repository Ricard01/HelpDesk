using Admin.API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Admin.API.Data
{
    public class DataContext : IdentityDbContext<User, Role, int,
        IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>,
        IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        // Apartir de esta informacion se crea una migracion con ef datamigration
        public DbSet<Equipo> Equipos { get; set; }

        public DbSet<Ticket> Tickets { get; set; }
        // public DbSet<File> Files { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<User>()
            .Property(u => u.Activo)
            .HasDefaultValue(true);

            builder.Entity<Equipo>()
             .HasOne( u => u.User)
             .WithOne( e => e.Equipo)
             .OnDelete(DeleteBehavior.SetNull);

            builder.Entity<UserRole>(userRole =>
            {
                userRole.HasKey(ur => new { ur.UserId, ur.RoleId });

                userRole.HasOne(ur => ur.Role)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.RoleId)
                    .IsRequired();

                userRole.HasOne(ur => ur.User)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.UserId)
                    .IsRequired();
            });
            
            builder.Entity<Equipo>()
            .Property(e => e.Activo)
            .HasDefaultValue(true);
            builder.Entity<Equipo>(entity =>
            {
                entity.HasIndex(e => e.NombreEquipo).IsUnique();
            });

            // builder.Entity<Equipo>(equipo =>
            // {
            //     // Llave primaria 
            //     equipo.HasKey(e => e.Id);

            //     //Relacion uno a uno 
            //     equipo.HasOne(d => d.User)
            //     .WithOne(p => p.Equipo)
            //     .HasForeignKey<Equipo>(d => d.Id);

            // });

            // builder.Entity<Equipo> ( equipo => 
            // { 
            //     equipo.HasOne( eq => eq.User)
            //     .HasForeignKey( eq => eq.UserId )
            // });



        }

    }
}