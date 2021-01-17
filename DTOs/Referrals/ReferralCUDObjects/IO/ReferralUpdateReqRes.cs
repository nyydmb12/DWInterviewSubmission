using System;
using System.Text.Json.Serialization;
using DTOs.Referrals.Query; 

namespace DTOs.Referrals
{
	/// <summary>
	///  This DTO supports the data from the client to update a referral records, it is a property of ReferralUpdateCollectionDTO
	///  It is also used to send data from the server to the client since the response is identical to the request
	/// </summary>
	public class ReferralUpdateReqRes
	{
		[JsonPropertyName("query")]
		public RefQuery QueryInfo { get; set; }
		[JsonPropertyName("referral")]
		public ReferralCreateRequest ReferralInfo { get; set; }

	}
}
