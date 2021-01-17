
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace DTOs.Referrals.Query
{
	public class RefQuery
	{
		[JsonPropertyName("primaryInfo")]
		public PrimaryInfo PrimInfo { get; set; } = new PrimaryInfo();

		[JsonPropertyName("secondaryInfo")]
		public SecondaryInfo SecondInfo { get; set; } = new SecondaryInfo();

		[JsonPropertyName("tertiaryInfo")]
		public TertiaryInfo ThirdInfo { get; set; } = new TertiaryInfo();

		[JsonPropertyName("fuzzyInfo")]
		public FuzzyInfo FuzInfo { get; set; } = new FuzzyInfo();


	}
}
