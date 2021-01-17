using System;
using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;

namespace DTOs.Referrals
{
/// <summary>
/// This DTO supports the data from the client to create a referral record
/// </summary>
	public class ReferralCreateRequest
	{
		[JsonPropertyName("referralCode")]
		//[Required] causes issues with updates, since if this is indicative of a issue in the app and the user can't add it we'll let it bubble up, 
		public string ReferralCode { get; set; }
		[JsonPropertyName("displayName")]
		public string DisplayName { get; set; }
		[JsonPropertyName("firstName")]
		[Required]
		public string FirstName { get; set; }
		[JsonPropertyName("lastName")]
		[Required]
		public string FullName { get; set; }
		[Required]
		[EmailAddress]
		[JsonPropertyName("email")]
		public string Email { get; set; }
		[JsonPropertyName("phoneNumber")]
		[RegularExpression(@"^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$", ErrorMessage = "Not a valid phone number")]

		public string PhoneNumber { get; set; }


		[JsonPropertyName("preferredContact")]
		public string PreferredContact { get; set; }
		[JsonPropertyName("externalIdentifier")]
		public string ExternalIdentifier { get; set; }


		[JsonPropertyName("amount")]
		public decimal? Amount { get; set; }

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
		[JsonPropertyName("status")]
		public string Status { get; set; }

	}
}
