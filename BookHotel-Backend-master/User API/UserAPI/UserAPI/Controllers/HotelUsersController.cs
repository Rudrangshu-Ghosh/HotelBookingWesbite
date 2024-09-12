using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UserAPI.Models;
using UserAPI.Services;

namespace UserAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class HotelUsersController : ControllerBase
	{
		private readonly HotelUsersService _userService;

		public HotelUsersController(HotelUsersService userService)
		{
			_userService = userService;
		}

		[HttpPost("signup")]
		public async Task<IActionResult> SignUp([FromBody] HotelUsers user)
		{
			try
			{
				var newUser = await _userService.SignUpAsync(user);
				return Ok(newUser);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpPost("login")]
		public async Task<IActionResult> Login([FromBody] LoginModel loginModel)
		{
			try
			{
				var user = await _userService.LoginAsync(loginModel.mobile_number, loginModel.password);
				return Ok(user);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpGet("max-id")]
		public async Task<IActionResult> GetMaxId()
		{
			try
			{
				// Call the UserService to get the maximum _id value
				var maxId = await _userService.GetMaxIdAsync();

				if (maxId == 0)
				{
					return NotFound("No users found.");
				}

				return Ok(new { maxId });
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpGet("username")]
		public async Task<IActionResult> GetUsernameByMobileNumber([FromQuery] string mobile_number)
		{
			if (string.IsNullOrEmpty(mobile_number))
			{
				return BadRequest("Mobile number is required.");
			}

			var username = await _userService.GetUsernameByMobileNumberAsync(mobile_number);

			if (username == null)
			{
				return NotFound("User not found.");
			}

			return Ok(new { username = username });
		}

		[HttpGet("getByMobile")]
		public async Task<IActionResult> GetUserByMobile(string mobile_number)
		{
			var user = await _userService.GetUserByMobileAsync(mobile_number);
			if (user == null)
			{
				return NotFound();
			}
			return Ok(user);
		}


	}




}
