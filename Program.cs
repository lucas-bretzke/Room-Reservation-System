using Microsoft.EntityFrameworkCore;
using Room_Reservation_System.api.Infra.Data;
using Room_Reservation_System.api.Model.Repository.Interfaces;
using Room_Reservation_System.api.Model.Repository;

var builder = WebApplication.CreateBuilder(args);

var roomReservationConectionString = builder.Configuration.GetConnectionString("RoomReservationConnection");
var serverVersion = new MySqlServerVersion(new Version(8, 0, 23));

builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseMySql(roomReservationConectionString, serverVersion)
                .LogTo(Console.WriteLine, LogLevel.Information)
                .EnableSensitiveDataLogging()
                .EnableDetailedErrors());

builder.Services.AddControllers();
builder.Services.AddScoped<IRoomRepository, RoomRepository>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        builder => builder
            .WithOrigins("http://localhost:4200")
            .AllowAnyMethod()
            .AllowAnyHeader());
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();
app.UseCors("AllowFrontend");
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run(); 