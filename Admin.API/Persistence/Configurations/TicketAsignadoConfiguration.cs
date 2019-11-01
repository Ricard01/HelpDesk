using Admin.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Admin.API.Persistence.Configurations
{
    internal class TicketAsignadoConfiguration : IEntityTypeConfiguration<TicketsAsignados>
    {
        public void Configure(EntityTypeBuilder<TicketsAsignados> builder)
        {

            builder.HasKey(t => new { t.TicketId, t.UserId });

        }

        //     builder.Property( t => t.UserId)
        //     .HasColumnName("UserIdAsignado");
    }
}
