using HotelDetailsAPI.Models;
using HotelDetailsAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HotelDetailsAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class HotelDetailsController : ControllerBase
	{
		private readonly HotelDetailsService _hotelDetailsService;

		public HotelDetailsController(HotelDetailsService hotelDetailsService)
		{
			_hotelDetailsService = hotelDetailsService;
		}

		// Basic CRUD operations:

		[HttpPost]
		public async Task<IActionResult> CreateHotel([FromBody] HotelDetails hotel)
		{
			await _hotelDetailsService.CreateHotelAsync(hotel);
			return CreatedAtAction(nameof(GetHotelById), new { id = hotel._id }, hotel);
		}

		[HttpGet("{id}")]
		public async Task<IActionResult> GetHotelById(int id)
		{
			var hotel = await _hotelDetailsService.GetHotelByIdAsync(id);
			if (hotel == null) return NotFound();
			return Ok(hotel);
		}


		[HttpGet]
		public async Task<IActionResult> GetAllHotels()
		{
			var hotels = await _hotelDetailsService.GetAllHotelsAsync();
			return Ok(hotels);
		}

		[HttpPut("{id}")]
		public async Task<IActionResult> UpdateHotel(int id, [FromBody] HotelDetails hotel)
		{
			await _hotelDetailsService.UpdateHotelAsync(id, hotel);
			return NoContent();
		}

		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteHotel(int id)
		{
			await _hotelDetailsService.DeleteHotelAsync(id);
			return NoContent();
		}

		// Other operations:

		// Get hotel by search parameters
		[HttpGet("search")]
		public async Task<IActionResult> SearchHotels(string destination, DateTime checkInDate, DateTime checkOutDate)
		{
			var hotels = await _hotelDetailsService.SearchHotels(destination, checkInDate, checkOutDate);
			return Ok(hotels);
		}

		// Endpoint to get distinct cities
		[HttpGet("distinct-cities")]
		public async Task<IActionResult> GetDistinctCities()
		{
			var cities = await _hotelDetailsService.GetDistinctCities();
			return Ok(cities);
		}
	}
}
