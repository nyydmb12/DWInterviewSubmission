using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace DTOs
{
	public class ReferralItemSearch : IReferralItemSearch
	{

		[JsonPropertyName("programID")]
		public string ProgramID {get; set; }
		[JsonPropertyName("query")]
		public string Query {get; set; }

		[JsonPropertyName("memberId")]

		public string MemberId { get; set; }
		[JsonPropertyName("sort")]
		public string Sort {get; set; }
		[JsonPropertyName("dateFrom")]
		public DateTime? DateFrom {get; set; }
		[JsonPropertyName("dateTo")]
		public DateTime? DateTo {get; set; }
		[JsonPropertyName("status")]
		public string Status { get; set; }
		[JsonPropertyName("offset")]
		public int? Offset {get; set; }
		[JsonPropertyName("count")]
		public int? Count {get; set; }

		public ReferralItemSearch(string programID, string query, string memberID, string sort, DateTime? dateFrom, DateTime? dateTo, string status, int? offset, int? count)
		{
			ProgramID = programID;
			Query = query;
			MemberId = memberID;
			Sort = sort;
			DateFrom = dateFrom;
			DateTo = dateTo;
			Status = status;
			Offset = offset;
			Count = count;

		}
	}
}
