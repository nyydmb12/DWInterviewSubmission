using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace DTOs.ReturnHeaders
{
	public class PositionHeader:MessageHeader
	{
		[JsonPropertyName("offset")]
		public int Offset { get; set; }
		[JsonPropertyName("total")]
		public int Total { get; set; }
	}
}
