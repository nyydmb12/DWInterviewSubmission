using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Text;
using System.Text.Json.Serialization;

namespace DTOs.Referrals
{
	public class ReferralSetRequest 
	{
		[JsonPropertyName("offset")]
		public int Offset { get; set; }
		[JsonPropertyName("total")]
		public int Total { get; set; }
		[JsonPropertyName("message")]
		public string Message { get; set; }

		[JsonPropertyName("referrals")]
		public List<ReferralRequest> Referrals { get; set; }
	}
		

}
