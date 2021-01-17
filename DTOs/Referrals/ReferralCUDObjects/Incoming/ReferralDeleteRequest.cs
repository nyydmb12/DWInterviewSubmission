using System;
using System.Text.Json.Serialization;
using DTOs.Referrals.Query;
using System.Collections.Generic;

namespace DTOs.Referrals
{
	/// <summary>
	/// This DTO supports the data from the client to delete a referral record
	/// </summary>
	public class ReferralDeleteRequest
	{
		[JsonPropertyName("query")]
		public RefQuery Query { get; set; }

	}
}
