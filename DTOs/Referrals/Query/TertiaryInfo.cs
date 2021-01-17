using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace DTOs.Referrals.Query
{
	public class TertiaryInfo
	{

		[JsonPropertyName("ProgramId")]
		public string ProgramId { get; set; }

		[JsonPropertyName("ProgramName")]
		public string ProgramName { get; set; }
		[JsonPropertyName("ProgramTitle")]
		public string ProgramTitle { get; set; }


	}
}
