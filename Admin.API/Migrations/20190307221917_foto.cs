using Microsoft.EntityFrameworkCore.Migrations;

namespace Admin.API.Migrations
{
    public partial class foto : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PublicId",
                table: "AspNetUsers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PublicId",
                table: "AspNetUsers");
        }
    }
}
