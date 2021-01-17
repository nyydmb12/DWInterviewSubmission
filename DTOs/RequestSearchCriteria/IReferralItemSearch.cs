using System;

namespace DTOs
{
	public interface IReferralItemSearch:IProgramItemSearch
	{

		string MemberId { get; set; }
		string Status { get; set; }
	}
}
