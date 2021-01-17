using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;
namespace DTOs
{
	public class MemberItemSearch : IMemberItemSearch
	{
		[JsonPropertyName("programID")]
		public string ProgramID {get; set; }

		[JsonPropertyName("query")]
		public string Query {get; set; }

		[JsonPropertyName("showDisabled")]
		public bool? ShowDisabled { get; set; }
		
		[JsonPropertyName("sort")] 
		public string Sort {get; set; }
		[JsonPropertyName("dateFrom")] 
		public DateTime? DateFrom {get; set; }
		[JsonPropertyName("dateTo")] 
		public DateTime? DateTo {get; set; }
		[JsonPropertyName("offset")] 
		public int? Offset {get; set; }
		[JsonPropertyName("count")]
		public int? Count {get; set; }

		public MemberItemSearch( string programID, string query, bool? showDisabled, string sort, DateTime? dateFrom, DateTime? dateTo, int? offset, int? count)
		{
			
			ProgramID = programID;
			Query = query;
			ShowDisabled = showDisabled;
			Sort = sort;
			DateFrom = dateFrom;
			DateTo = dateTo;
			Offset = offset;
			Count = count;
		}
	}
}
