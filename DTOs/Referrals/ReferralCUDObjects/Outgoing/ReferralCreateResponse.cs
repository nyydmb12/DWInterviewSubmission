using DTOs.ReturnHeaders;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace DTOs.Referrals
{/// <summary>
 /// This DTO supports the data from the server to the client to confirm referral record creation
 /// </summary>
	public class ReferralCreateResponse:MessageHeader
	{

		[JsonPropertyName("referral")]
		public ReferralResponse ReferralData { get; set; }
	}
}
