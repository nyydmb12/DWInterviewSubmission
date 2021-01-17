using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Text;
using System.Text.Json.Serialization;

namespace DTOs.Member
{
	public class MemberSetRequest 
	{
		[JsonPropertyName("offset")]
		public int Offset { get; set; }
		[JsonPropertyName("total")]
		public int Total { get; set; }
		[JsonPropertyName("message")]
		public string Message { get; set; }

		[JsonPropertyName("members")]
		public List<MemberReqest> Members { get; set; }
	}
		

}
