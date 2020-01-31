using Admin.API.Models;
using Admin.API.Persistence.Configurations;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace Admin.API.Persistence
{
    public class AdminContext : IdentityDbContext<User, Role, int,
        IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>,
        IdentityRoleClaim<int>, IdentityUserToken<int>>

    {
        private ILoggerFactory GetLoggerFactory()
        {
            IServiceCollection serviceCollection = new ServiceCollection();
            serviceCollection.AddLogging(builder =>
                   builder.AddConsole()
                          .AddFilter(DbLoggerCategory.Database.Command.Name,
                                     LogLevel.Information));
            return serviceCollection.BuildServiceProvider()
                    .GetService<ILoggerFactory>();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLoggerFactory(GetLoggerFactory());
        }
        
        public AdminContext(DbContextOptions<AdminContext> options) : base(options) { }
        // Apartir de esta informacion se crea una migracion con ef datamigration
        public DbSet<Equipo> Equipos { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<TicketsAsignados> TicketsAsignados { get; set; }
        public DbSet<AdjuntosTicket> AdjuntosTicket { get; set; }
        public DbSet<TicketRespuesta> TicketsRespuestas { get; set; }
        public DbSet<AdjuntosRespuesta> AdjuntosRespuestas { get; set; }
    
        // public DbSet<File> Files { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            // // genera todos los fluent api 
            // base.ApplyEntityTypeConfigurations(Assembly.GetExecutingAssembly());

            base.OnModelCreating(builder);

            builder.ApplyConfiguration(new TicketAsignadoConfiguration());

            builder.ApplyConfiguration(new EquipoConfiguration());

            builder.ApplyConfiguration(new TicketConfiguration());

            builder.ApplyConfiguration(new TicketRespuestaConfiguration());

            builder.ApplyConfiguration(new AdjuntosRespuestaConfiguration());

            builder.Entity<User>()
            .Property(u => u.Activo)
            .HasDefaultValue(true);

            builder.Entity<Equipo>()
             .HasOne(u => u.User)
             .WithOne(e => e.Equipo)
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


        }

    }
}