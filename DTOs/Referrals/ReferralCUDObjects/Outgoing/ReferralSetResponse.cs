using DTOs.ReturnHeaders;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Text;
using System.Text.Json.Serialization;

namespace  DTOs.Referrals
{
	public class ReferralSetResponse: PositionHeader
	{
		
		[JsonPropertyName("referrals")]
		public List<ReferralResponse> Referrals { get; set; }
	}
		

}
