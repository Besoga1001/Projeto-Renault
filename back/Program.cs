using project_renault;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var mySqlConnector = builder.Configuration.GetConnectionString("DefaultConnection");
// Add services to the container.
builder.Services.AddDbContext<DBSettings>(options => options.UseMySql(mySqlConnector, ServerVersion.AutoDetect(mySqlConnector)));

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("http://localhost:5501");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
