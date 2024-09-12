using MongoDB.Driver;
using UserAPI.Models;

namespace UserAPI.Services
{
	public class HotelUsersService
	{
		private readonly IMongoCollection<HotelUsers> _users;

    public HotelUsersService(IMongoDatabase database)
    {
        _users = database.GetCollection<HotelUsers>("HotelUsers");
    }

    public async Task<HotelUsers> SignUpAsync(HotelUsers user)
    {
        // Check if mobile number already exists
        var existingUser = await _users.Find(u => u.mobile_number == user.mobile_number).FirstOrDefaultAsync();
        if (existingUser != null) throw new Exception("Mobile number already exists");

        // Hash the password
        user.password_hash = BCrypt.Net.BCrypt.HashPassword(user.password_hash);

        // Insert user into database
        await _users.InsertOneAsync(user);
        return user;
    }

    public async Task<HotelUsers> LoginAsync(string mobile_number, string password)
    {
        var user = await _users.Find(u => u.mobile_number == mobile_number).FirstOrDefaultAsync();
        if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.password_hash))
        {
            throw new Exception("Invalid mobile number or password");
        }

        return user;
    }

		public async Task<int> GetMaxIdAsync()
		{
			var userWithMaxId = await _users
				.Find(FilterDefinition<HotelUsers>.Empty)
				.SortByDescending(u => u._id)
				.FirstOrDefaultAsync();

			return userWithMaxId?._id ?? 0;  // Return 0 if no users found
		}

		public async Task<string> GetUsernameByMobileNumberAsync(string mobile_number)
		{
			var filter = Builders<HotelUsers>.Filter.Eq(user => user.mobile_number, mobile_number);
			var user = await _users.Find(filter).FirstOrDefaultAsync();

			return user?.username; // Return null if user is not found
		}

		public async Task<HotelUsers> GetUserByMobileAsync(string mobile_number)
		{
			var filter = Builders<HotelUsers>.Filter.Eq("mobile_number", mobile_number);
			return await _users.Find(filter).FirstOrDefaultAsync();
		}


	}
}
