using HotelBookingAPI.Models;
using HotelBookingAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HotelBookingAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class BookingController : ControllerBase
	{
		private readonly IBookingService _bookingService;

		public BookingController(IBookingService bookingService)
		{
			_bookingService = bookingService;
		}

		// POST: api/booking
		[HttpPost]
		public async Task<IActionResult> CreateBooking([FromBody] Booking booking)
		{
			if (ModelState.IsValid)
			{
				// Ensure the `Id` is not set manually
				await _bookingService.CreateBooking(booking);
				return Ok(booking);
			}

			return BadRequest(ModelState);
		}

		// GET: api/booking/user/{userId}
		[HttpGet("user/{userId}")]
		public async Task<IActionResult> GetUserBookings(int userId)
		{
			var bookings = await _bookingService.GetUserBookings(userId);
			return Ok(bookings);
		}
	}
}
