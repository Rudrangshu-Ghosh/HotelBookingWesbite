using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using ThirdParty.Json.LitJson;

namespace HotelBookingAPI.Models
{
	public class Booking
	{
		[BsonId]
		[BsonRepresentation(BsonType.ObjectId)]
		public string? Id { get; set; }          // Booking ID
		public int UserId { get; set; }       // Reference to User ID
		public int HotelId { get; set; }      // Reference to Hotel ID
		public DateOnly CheckInDate { get; set; }
		public DateOnly CheckOutDate { get; set; }
		public int NumGuests { get; set; }
		public int NumRooms { get; set; }
		public decimal TotalAmount { get; set; }
		public string PaymentStatus { get; set; }   // "confirmed", "pending", etc.

		public string Name {  get; set; }
		public string Email { get; set; }
		public DateOnly BookingDate {  get; set; }

	}
}
