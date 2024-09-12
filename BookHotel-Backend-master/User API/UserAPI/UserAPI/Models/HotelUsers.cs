using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace UserAPI.Models
{
	public class HotelUsers
	{
		public int _id {  get; set; }
		public string mobile_number { get; set; }
		public string username { get; set; }
		public string password_hash { get; set; }
	}
}
