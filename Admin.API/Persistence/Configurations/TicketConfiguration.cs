using Admin.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Admin.API.Persistence.Configurations
{
    internal class TicketConfiguration : IEntityTypeConfiguration<Ticket>
    {
        public void Configure(EntityTypeBuilder<Ticket> builder)
        {
            builder.Property( t => t.Titulo).HasMaxLength(60).IsRequired();
            builder.Property( t => t.Mensaje).HasColumnType("text").IsRequired();
        }
    }
}