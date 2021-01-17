using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
namespace DTOs.Referrals
{
	public class ReferralRequest
	{
		[Required(ErrorMessage = "Id is required.")]
		[JsonPropertyName("id")]
		public string Id { get; set; }
		[JsonPropertyName("displayName")]
		public string DisplayName { get; set; }
		[JsonPropertyName("firstName")]
		[Required(ErrorMessage = "First is required.")]
		public string FirstName { get; set; }
		[JsonPropertyName("lastName")]
		[Required(ErrorMessage = "Last name is required.")]
		public string LastName { get; set; }
		[JsonPropertyName("fullName")]
		public string FullName { get; set; }
		[Required]
		[EmailAddress(ErrorMessage = "Email address is not valid")]
		[JsonPropertyName("email")]
		public string Email { get; set; }
		[JsonPropertyName("externalIdentifier")]

		public string ExternalIdentifier { get; set; }
		[JsonPropertyName("phoneNumber")]
		[RegularExpression(@"^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$", ErrorMessage = "Not a valid phone number")]
		public string PhoneNumber { get; set; }
		[JsonPropertyName("amount")]
		public decimal? Amount { get; set; }
		[JsonPropertyName("amountFormatted")]
		public string AmountFormatted { get; set; }
		[JsonPropertyName("preferredContact")]
		public string PreferredContact { get; set; }
		[JsonPropertyName("createDate")]
		public DateTime? CreateDate { get; set; }
		[JsonPropertyName("updateDate")]
		public DateTime? UpdateDate { get; set; }
			[JsonPropertyName("source")]
			public string Source { get; set; }
		[JsonPropertyName("programID")]
		public string ProgramID { get; set; }
		[JsonPropertyName("programName")]
		public string ProgramName { get; set; }
		[JsonPropertyName("programTitle")]
		public string ProgramTitle { get; set; }
		[JsonPropertyName("referringMemberId")]
		public string ReferringMemberId { get; set; }
		[JsonPropertyName("referringMemberName")]
		public string ReferringMemberName { get; set; }
		[JsonPropertyName("memberEmail")]
		public string MemberEmail { get; set; }
		[JsonPropertyName("memberReferralCode")]

		[Required(ErrorMessage = "Referral Code is required.")]
		public string MemberReferralCode { get; set; }
		[JsonPropertyName("memeberExternalIdentifier")]
		public string MemeberExternalIdentifier { get; set; }
		[JsonPropertyName("approvedDate")]
		public DateTime? ApprovedDate { get; set; }
		[JsonPropertyName("qualifiedDate")]
		public DateTime? QualifiedDate { get; set; }
		[JsonPropertyName("status")]
		public string Status { get; set; }
		[JsonPropertyName("companyName")]
		public string CompanyName { get; set; }
		[JsonPropertyName("note")]
		public string Note { get; set; }
		[JsonPropertyName("publicNote")]
		public string PublicNote { get; set; }
		[JsonPropertyName("customOption1Name")]
		public string CustomOption1Name { get; set; }
		[JsonPropertyName("customOption2Name")]
		public string CustomOption2Name { get; set; }
		[JsonPropertyName("customText1Name")]
		public string CustomText1Name { get; set; }
		[JsonPropertyName("customText2Name")]
		public string CustomText2Name { get; set; }
		[JsonPropertyName("customText3Name")]
		public string CustomText3Name { get; set; }
		[JsonPropertyName("customOption1Value")]
		public string CustomOption1Value { get; set; }
		[JsonPropertyName("customOption2Value")]
		public string CustomOption2Value { get; set; }
		[JsonPropertyName("customText1Value")]

		public string CustomText1Value { get; set; }
		[JsonPropertyName("customText2Value")]
		public string CustomText2Value { get; set; }
		[JsonPropertyName("customText3Value")]
		public string CustomText3Value { get; set; }
		[JsonPropertyName("conversionNote")]

		public string ConversionNote { get; set; }
		[JsonPropertyName("utmSource")]
		public string UtmSource { get; set; }
		[JsonPropertyName("utmMedium")]
		public string UtmMedium { get; set; }
		[JsonPropertyName("utmCampaign")]
		public string UtmCampaign { get; set; }
		[JsonPropertyName("browserReferralUrl")]
		public string BrowserReferralUrl { get; set; }
		[JsonPropertyName("IPAddressSource")]
		public string IPAddressSource { get; set; }

	}
}
