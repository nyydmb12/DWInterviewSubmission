using System;
using System.Collections.Generic;
using System.Text;

using System.Text.Json.Serialization;

namespace DTOs.Referrals.Query
{
	public class FuzzyInfo
	{
		[JsonPropertyName("Identifier")]
		public string Identifier { get; set; }

	}
}
