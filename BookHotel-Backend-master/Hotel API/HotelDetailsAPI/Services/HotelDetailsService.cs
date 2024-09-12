using HotelDetailsAPI.Models;
using MongoDB.Driver;

namespace HotelDetailsAPI.Services
{
	public class HotelDetailsService
	{
		private readonly IMongoCollection<HotelDetails> _hotelDetailsCollection;

		
		public HotelDetailsService(IMongoDatabase database)
		{
			_hotelDetailsCollection = database.GetCollection<HotelDetails>("HotelDetails");
		}
		
		//  Basic CRUD Operations
		public async Task<HotelDetails> GetHotelByIdAsync(int id)
		{
			return await _hotelDetailsCollection.Find(hotel => hotel._id == id).FirstOrDefaultAsync();
		}

		public async Task<List<HotelDetails>> GetAllHotelsAsync()
		{
			return await _hotelDetailsCollection.Find(hotel => true).ToListAsync();
		}

		public async Task CreateHotelAsync(HotelDetails hotel)
		{
			await _hotelDetailsCollection.InsertOneAsync(hotel);
		}

		public async Task UpdateHotelAsync(int id, HotelDetails updatedHotel)
		{
			await _hotelDetailsCollection.ReplaceOneAsync(hotel => hotel._id == id, updatedHotel);
		}

		public async Task DeleteHotelAsync(int id)
		{
			await _hotelDetailsCollection.DeleteOneAsync(hotel => hotel._id == id);
		}

		// Other operations:

		// Get hotel by search parameters
		public async Task<List<HotelDetails>> SearchHotels(string destination, DateTime checkInDate, DateTime checkOutDate)
		{
			// Extract months from check-in and check-out dates
			int checkInMonth = checkInDate.Month;
			int checkOutMonth = checkOutDate.Month;

			// MongoDB query to find hotels available in the range of months
			var filter = Builders<HotelDetails>.Filter.Eq(h => h.city, destination) &
						 Builders<HotelDetails>.Filter.Lte(h => h.availableFromMonth, checkInMonth) &
						 Builders<HotelDetails>.Filter.Gte(h => h.availableUntilMonth, checkOutMonth);

			var hotels = await _hotelDetailsCollection.Find(filter).ToListAsync();
			return hotels;
		}

		// Method to get distinct cities
		public async Task<List<string>> GetDistinctCities()
		{
			var distinctCities = await _hotelDetailsCollection.Distinct<string>("city", Builders<HotelDetails>.Filter.Empty).ToListAsync();
			return distinctCities;
		}
	}
}
