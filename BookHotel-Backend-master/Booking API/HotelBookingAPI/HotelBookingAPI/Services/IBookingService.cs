using HotelBookingAPI.Models;

namespace HotelBookingAPI.Services
{
	public interface IBookingService
	{
		Task<Booking> CreateBooking(Booking booking);
		Task<List<Booking>> GetUserBookings(int userId);
	}
}
