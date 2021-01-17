using DTOs.Referrals;
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace DTOs.Member
{
	public class MemberReqest
	{
		[JsonPropertyName("id")]
		public string Id { get { return _id; } set { setID(value); } }
		private string _id;
		private void setID(string val)
		{
			_id = val;
			ReferralsLink = $"{EndPoints.GetReferrals.Value}?memberID={val}";
		}
		[JsonPropertyName("displayName")]
		public string DisplayName { get; set; }
		[JsonPropertyName("firstName")]
		public string FirstName { get; set; }

		[JsonPropertyName("lastName")]
		public string LastName { get; set; }
		[JsonPropertyName("email")]
		public string Email { get; set; }
		[JsonPropertyName("phone")]
		public string Phone { get; set; }
		[JsonPropertyName("externalIdentifier")]
		public string ExternalIdentifier { get; set; }
		[JsonPropertyName("dateOfBirth")]
		public string DateOfBirth { get; set; }
		[JsonPropertyName("addressLine1")]
		public string AddressLine1 { get; set; }
		[JsonPropertyName("addressLine2")]
		public string AddressLine2 { get; set; }
		[JsonPropertyName("city")]
		public string City { get; set; }
		[JsonPropertyName("countrySubdivision")]
		public string CountrySubdivision { get; set; }
		[JsonPropertyName("country")]
		public string Country { get; set; }
		[JsonPropertyName("postalCode")]
		public string PostalCode { get; set; }
		[JsonPropertyName("disabledFlag")]
		public bool? DisabledFlag { get; set; }
		[JsonPropertyName("customOverrideURL")]
		public string CustomOverrideURL { get; set; }
		[JsonPropertyName("payoutInfo")]
		public PayoutInformation PayoutInfo { get; set; }
		[JsonPropertyName("customOption1Name")]
		public string CustomOption1Name { get; set; }
		[JsonPropertyName("customOption1Value")]
		public string CustomOption1Value { get; set; }
		[JsonPropertyName("customText1Name")]
		public string CustomText1Name { get; set; }
		[JsonPropertyName("customText1Value")]
		public string CustomText1Value { get; set; }
		[JsonPropertyName("customText2Name")]
		public string CustomText2Name { get; set; }
		[JsonPropertyName("customText2Value")]
		public string CustomText2Value { get; set; }
		[JsonPropertyName("programId")]
		public string ProgramId { get; set; }
		[JsonPropertyName("programTitle")]
		public string ProgramTitle { get; set; }
		[JsonPropertyName("programName")]
		public string ProgramName { get; set; }
		[JsonPropertyName("referralURL")]
		public string ReferralURL { get; set; }
		[JsonPropertyName("referralCode")]
		public string ReferralCode { get; set; }
		[JsonPropertyName("memberURL")]
		public string MemberURL { get; set; }
		[JsonPropertyName("emailShares")]
		public int NumberOfEmailShares { get; set; }
		[JsonPropertyName("socialShares")]
		public int NumberOfSocialShares { get; set; }
		[JsonPropertyName("views")]
		public int NumberOfViews { get; set; }
		[JsonPropertyName("referrals")]
		public int NumberOfReferrals { get; set; }
		[JsonPropertyName("lastShare")]
		public DateTime? LastShare { get; set; }
		[JsonPropertyName("referralsApproved")]
		public int ReferralsApproved { get; set; }
		[JsonPropertyName("referralsQualified")]
		public int ReferralsQualified { get; set; }
		[JsonPropertyName("referralsPending")]
		public int ReferralsPending { get; set; }
		[JsonPropertyName("referralsApprovedAmount")]
		public decimal ReferralsApprovedAmount { get; set; }
		[JsonPropertyName("rewardsPendingAmount")]
		public decimal RewardsPendingAmount { get; set; }
		[JsonPropertyName("rewardsIssuedAmount")]
		public decimal RewardsIssuedAmount { get; set; }
		[JsonPropertyName("rewardsAmountTotals")]
		public decimal RewardsAmountTotals { get; set; }
		[JsonPropertyName("createDt")]
		public DateTime? CreatedDate { get; set; }
		[JsonPropertyName("utmSource")]
		public string UtmSource { get; set; }
		[JsonPropertyName("utmMedium")]
		public string UtmMedium { get; set; }
		[JsonPropertyName("utmCampaign")]
		public string UtmCampaign { get; set; }
		[JsonPropertyName("browserReferralUrl")]
		public string BrowserReferralUrl { get; set; }
		[JsonPropertyName("lastViewIPAddress")]
		public string LastViewIPAddress { get; set; }
		
		[JsonPropertyName("referralsLink")]
		public string ReferralsLink { get; set; }
		[JsonIgnore]
		public ICollection<ReferralRequest> Referrals;

		public MemberReqest(ICollection<ReferralRequest> referrals)
		{
			Referrals = referrals;
		}
		public MemberReqest()
		{
			Referrals = new List<ReferralRequest>();
		}

	}
}
