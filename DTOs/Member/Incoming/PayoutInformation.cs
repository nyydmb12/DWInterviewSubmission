using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;
using System.Web;

namespace DTOs.Member
{
	public class PayoutInformation
	{
		[JsonPropertyName("payoutType")]
		public string PayoutType { get; set; }
		[JsonPropertyName("useDefaultValues")]
		public bool UseDefaultValues { get; set; }
		[JsonPropertyName("email")]
		public string Email { get; set; }
	}
}
