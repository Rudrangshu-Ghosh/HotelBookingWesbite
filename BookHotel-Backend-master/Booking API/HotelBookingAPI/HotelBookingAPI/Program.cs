
using HotelBookingAPI.Services;
using MongoDB.Driver;

namespace HotelBookingAPI
{
	public class Program
	{
		public static void Main(string[] args)
		{
			var builder = WebApplication.CreateBuilder(args);

			// Add services to the container.

			builder.Services.AddControllers();
			// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
			builder.Services.AddEndpointsApiExplorer();
			builder.Services.AddSwaggerGen();

			// Load configuration for MongoDB
			builder.Services.Configure<BookingDbSettings>(
				builder.Configuration.GetSection(nameof(BookingDbSettings)));

			builder.Services.AddSingleton<IMongoClient>(s =>
				new MongoClient(builder.Configuration.GetValue<string>("DbSettings:ConnectionString")));

			builder.Services.AddSingleton<IMongoDatabase>(s =>
				s.GetRequiredService<IMongoClient>().GetDatabase(builder.Configuration.GetValue<string>("DbSettings:DatabaseName")));

			// Register IBookingService and BookingService
			builder.Services.AddScoped<IBookingService, BookingService>();

			builder.Services.AddCors(); //Cross Origin Resource Sharing

			var app = builder.Build();

			// Configure the HTTP request pipeline.
			if (app.Environment.IsDevelopment())
			{
				app.UseSwagger();
				app.UseSwaggerUI();
			}

			app.UseCors(options => options.WithOrigins("http://localhost:4200/").AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin());

			app.UseHttpsRedirection();

			app.UseAuthorization();


			app.MapControllers();

			app.Run();
		}
	}
}
