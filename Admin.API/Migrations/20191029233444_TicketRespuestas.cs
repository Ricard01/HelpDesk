using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Admin.API.Migrations
{
    public partial class TicketRespuestas : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Titulo",
                table: "Tickets",
                maxLength: 60,
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Mensaje",
                table: "Tickets",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "NombreEquipo",
                table: "Equipos",
                maxLength: 30,
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Ip",
                table: "Equipos",
                maxLength: 30,
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Caracteristicas",
                table: "Equipos",
                maxLength: 250,
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "TicketsRespuestas",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    TicketId = table.Column<int>(nullable: false),
                    UserId = table.Column<int>(nullable: false),
                    Respuesta = table.Column<string>(type: "text", nullable: false),
                    Estatus = table.Column<byte>(nullable: false),
                    Fecha = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TicketsRespuestas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TicketsRespuestas_Tickets_TicketId",
                        column: x => x.TicketId,
                        principalTable: "Tickets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TicketsRespuestas_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AdjuntosRespuestas",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    TicketRespuestaId = table.Column<int>(nullable: false),
                    Nombre = table.Column<string>(maxLength: 60, nullable: false),
                    ArchivoUrl = table.Column<string>(nullable: false),
                    PublicId = table.Column<string>(nullable: false),
                    FechaAlta = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdjuntosRespuestas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AdjuntosRespuestas_TicketsRespuestas_TicketRespuestaId",
                        column: x => x.TicketRespuestaId,
                        principalTable: "TicketsRespuestas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AdjuntosRespuestas_TicketRespuestaId",
                table: "AdjuntosRespuestas",
                column: "TicketRespuestaId");

            migrationBuilder.CreateIndex(
                name: "IX_TicketsRespuestas_TicketId",
                table: "TicketsRespuestas",
                column: "TicketId");

            migrationBuilder.CreateIndex(
                name: "IX_TicketsRespuestas_UserId",
                table: "TicketsRespuestas",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AdjuntosRespuestas");

            migrationBuilder.DropTable(
                name: "TicketsRespuestas");

            migrationBuilder.AlterColumn<string>(
                name: "Titulo",
                table: "Tickets",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 60);

            migrationBuilder.AlterColumn<string>(
                name: "Mensaje",
                table: "Tickets",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "NombreEquipo",
                table: "Equipos",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 30);

            migrationBuilder.AlterColumn<string>(
                name: "Ip",
                table: "Equipos",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 30);

            migrationBuilder.AlterColumn<string>(
                name: "Caracteristicas",
                table: "Equipos",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 250,
                oldNullable: true);
        }
    }
}
