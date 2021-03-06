﻿using System.Net;
using System.Text;
using Admin.API.Data;
using Admin.API.Persistence;
using Admin.API.Helpers;
using Admin.API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using static Admin.API.Helpers.Extensions;
using Microsoft.Extensions.Hosting;

namespace Admin.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {

            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureDevelopmentServices(IServiceCollection services)
        {

            services.AddDbContext<AdminContext>(x => x.UseMySql(Configuration.GetConnectionString("DefaultConnection")));
            ConfigureServices(services);
        }

        public void ConfigureProductionServices(IServiceCollection services)
        {

            services.AddDbContext<AdminContext>(x => x.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            ConfigureServices(services);
        }



        public void ConfigureServices(IServiceCollection services)
        {

            services.AddDbContext<AdminContext>(x => x.UseMySql(Configuration.GetConnectionString("DefaultConnection")));
            // ConfigureServices(services);

            // // No hizo ni madres esto
            // CultureInfo.CurrentCulture = new CultureInfo("es-ES");
            IdentityBuilder builder = services.AddIdentityCore<User>(opt =>
        {
            opt.Password.RequireDigit = false;
            opt.Password.RequiredLength = 6;
            opt.Password.RequireNonAlphanumeric = false;
            opt.Password.RequireUppercase = false;

        });


            builder = new IdentityBuilder(builder.UserType, typeof(Role), builder.Services);
            builder.AddEntityFrameworkStores<AdminContext>();
            builder.AddRoleValidator<RoleValidator<Role>>();
            builder.AddRoleManager<RoleManager<Role>>();
            builder.AddSignInManager<SignInManager<User>>();




            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration.GetSection("AppSettings:Token").Value)),
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        // ValidIssuer = "smesk.in"
                        // ValidAudience = "readers"

                    };
                });

            services.AddAuthorization(options =>
        {
            options.AddPolicy("RequireAdminRole", policy => policy.RequireRole("Admin"));
            options.AddPolicy("ModeratePhotoRole", policy => policy.RequireRole("Admin", "Moderator"));
            options.AddPolicy("VipOnly", policy => policy.RequireRole("VIP"));
        });

            services.AddControllers(options =>
            {
                var policy = new AuthorizationPolicyBuilder()
    .RequireAuthenticatedUser()
    .Build();
                options.Filters.Add(new AuthorizeFilter(policy));
            })
            .AddNewtonsoftJson(options =>
            {

                options.SerializerSettings.ReferenceLoopHandling =
                                    Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            });
            // services.AddMvc(options =>
            //  {
            //      // Con esto pedimos autorizacion para todo el proyecto en lugar de un controlador en especifico.

            //      var policy = new AuthorizationPolicyBuilder()
            //       .RequireAuthenticatedUser()
            //       .Build();
            //      options.Filters.Add(new AuthorizeFilter(policy));
            //  })
            //  .SetCompatibilityVersion(CompatibilityVersion.Version_3_0)
            //  .AddJsonOptions(opt =>
            //  {
            //      opt.SerializerSettings.ReferenceLoopHandling =
            //          Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            //  });

            services.AddCors();
            services.Configure<CloudinarySettings>(Configuration.GetSection("CloudinarySettings"));
            // este se puede eliminar o mejorar ya add automaper se ejecuta 2 veces entonces hay que validar si esta en dev mode
            // Mapper.Reset();
            // Actualizacio net core 2.2
            // services.AddAutoMapper(typeof(AdminRepository).Assembly);

            services.AddAutoMapper();
            services.AddTransient<Seed>();
            //
            services.AddScoped<IAuthRepository, AuthRepository>();
            services.AddScoped<IAdminRepository, AdminRepository>();
            services.AddScoped<IEquipoRepository, EquipoRepository>();
            services.AddScoped<ITicketRepository, TicketRepository>();
            services.AddScoped<LogUserActivity>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, Seed seeder, ILogger<Startup> logger)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // logger.LogInformation("RICARDO In Development environment RICARDO");          
                app.UseExceptionHandler(builder =>
                {
                    builder.Run(async context =>
                    {
                        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                        var error = context.Features.Get<IExceptionHandlerFeature>();
                        if (error != null)
                        {
                            context.Response.AddApplicationError(error.Error.Message);
                            await context.Response.WriteAsync(error.Error.Message);
                        }
                    });
                });
                // app.UseHsts();
            }
            // El orden es importante
            // app.UseHttpsRedirection();
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            seeder.SeedUsers();
            // Hay que cambiar esto ya que permite TODO
            app.UseCors(x => x.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapFallbackToController("Index", "Fallback");
            });

        }
    }
}
