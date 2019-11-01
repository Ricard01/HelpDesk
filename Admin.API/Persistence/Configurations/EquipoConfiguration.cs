using Admin.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Admin.API.Persistence.Configurations
{
    public class EquipoConfiguration : IEntityTypeConfiguration<Equipo>
    {
        public void Configure(EntityTypeBuilder<Equipo> builder)
        {
            builder.Property( e => e.NombreEquipo).HasMaxLength(30).IsRequired();
            builder.Property( e => e.Ip).HasMaxLength(30).IsRequired();
            builder.Property( e => e.Caracteristicas).HasMaxLength(250);

        }
    }
}