using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace DTOs.Referrals.Query
{
 public class PrimaryInfo
	{
		[JsonPropertyName("referralId")]
		public string ReferralID { get; set; }
	}
}
