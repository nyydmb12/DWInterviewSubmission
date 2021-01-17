using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization; 

namespace DTOs.Referrals.Query
{
	public class SecondaryInfo
	{
		[JsonPropertyName("externalIdentifier")]
		public string ExternalIdentifier { get; set; }

		[JsonPropertyName("email")]
		public string Email { get; set; }
		[JsonPropertyName("phoneNumber")]
		public string PhoneNumber { get; set; }
	}
}
