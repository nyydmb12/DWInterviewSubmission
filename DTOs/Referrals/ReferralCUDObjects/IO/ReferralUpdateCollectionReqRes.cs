using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using DTOs.Referrals.Query; 

namespace DTOs.Referrals
{
	/// <summary>
	///  This DTO supports the data from the client to update a referral records
	///  It is also used to send data from the server to the client since the response is identical to the request
	/// </summary>
	public class ReferralUpdateCollectionReqRes
	{
		[JsonPropertyName(null)]
		public List<ReferralUpdateReqRes> UpdateList {get; set;}

		public ReferralUpdateCollectionReqRes()
		{
			UpdateList = new List<ReferralUpdateReqRes>();
		}

	}
}
