using System;
using System.Text.Json.Serialization;
using DTOs.Referrals.Query;
using System.Collections.Generic;
using DTOs.ReturnHeaders;

namespace DTOs.Referrals
{
	/// <summary>
	/// This DTO supports the data from the server to the client to confirm referral deletions 
	/// </summary>
	public class ReferralDeleteResponse
	{

		[JsonPropertyName("query")]
		public RefQuery DeleteList { get; set; }


		[JsonPropertyName("resultInfo")]
		public ResultInfo resInfo { get; set; } = new ResultInfo();


	}
}
