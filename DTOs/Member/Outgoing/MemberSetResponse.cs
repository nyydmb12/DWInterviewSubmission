using DTOs.ReturnHeaders;
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace DTOs.Member
{
	public class MemberSetResponse : PositionHeader
	{
	

		[JsonPropertyName("members")]
		public List<MemberResponse> Members { get; set; }

	}
}
