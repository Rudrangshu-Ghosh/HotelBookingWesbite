using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.Text.Json.Serialization;

namespace HotelDetailsAPI.Models
{
	public class HotelDetails
	{
		public int _id {  get; set; }
		public string title { get; set; }
		public string rating {  get; set; }
		public string city {  get; set; }
		public string location {  get; set; }
		public Score score { get; set; }
		public List<string> amenities { get; set; }
		public int price {  get; set; }
		public int availableFromMonth { get; set; }
		public int availableUntilMonth { get; set; }
		public int n_rooms {  get; set; }
		public string description { get; set; }

	}

	public class Score
	{
		public decimal scorenum {  get; set; }
		public string scoreDesc {  get; set; }
		public int n_ratings {  get; set; }
	}
}
