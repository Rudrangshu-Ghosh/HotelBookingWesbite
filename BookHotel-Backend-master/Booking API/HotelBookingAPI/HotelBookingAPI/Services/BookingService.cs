using HotelBookingAPI.Models;
using MongoDB.Driver;

namespace HotelBookingAPI.Services
{
	public class BookingService : IBookingService
	{
		private readonly IMongoCollection<Booking> _bookingsCollection;

		public BookingService(IMongoDatabase database)
		{
			_bookingsCollection = database.GetCollection<Booking>("Bookings");
		}

		// Create a booking
		public async Task<Booking> CreateBooking(Booking booking)
		{
			await _bookingsCollection.InsertOneAsync(booking);
			return booking;
		}

		// Get bookings by userId
		public async Task<List<Booking>> GetUserBookings(int userId)
		{
			return await _bookingsCollection.Find(b => b.UserId == userId).ToListAsync();
		}
	}
}
