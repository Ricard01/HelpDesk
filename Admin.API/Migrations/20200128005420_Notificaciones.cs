using Microsoft.EntityFrameworkCore.Migrations;

namespace Admin.API.Migrations
{
    public partial class Notificaciones : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte>(
                name: "MostrarNotificacion",
                table: "TicketsAsignados",
                nullable: false,
                defaultValue: (byte)1);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MostrarNotificacion",
                table: "TicketsAsignados");
        }
    }
}
