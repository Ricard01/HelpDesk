using Admin.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Admin.API.Persistence.Configurations
{
    public class TicketRespuestaConfiguration : IEntityTypeConfiguration<TicketRespuesta>
    {
        public void Configure(EntityTypeBuilder<TicketRespuesta> builder)
        {
            builder.Property(t => t.Respuesta).HasColumnType("text").IsRequired();
            builder.Property(t => t.Estatus).IsRequired();     
            builder.Property(t => t.Fecha).IsRequired();

        }
    }
}