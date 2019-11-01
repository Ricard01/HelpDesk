using Admin.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Admin.API.Persistence.Configurations
{
    public class AdjuntosRespuestaConfiguration : IEntityTypeConfiguration<AdjuntosRespuesta>
    {
        public void Configure(EntityTypeBuilder<AdjuntosRespuesta> builder)
        {
            builder.Property(ar => ar.Nombre).HasMaxLength(60).IsRequired();
            builder.Property(ar => ar.PublicId).IsRequired();     
            builder.Property(ar => ar.ArchivoUrl).IsRequired();

        }
    }
}