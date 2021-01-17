using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace DTOs.ReturnHeaders
{/// <summary>
/// This class is used on delete calls to return result of delete request
/// </summary>
 public class ResultInfo
	{
		[JsonPropertyName("Status")]
		public string Status { get; set; }
		[JsonPropertyName("Message")]
		public string Message { get; set; }
	}
}
