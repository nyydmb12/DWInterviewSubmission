using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace DTOs.ReturnHeaders
{
	/// <summary>
	/// Contains message which is on nearly every return DTO and Model
	/// </summary>
	public class MessageHeader
	{


		[JsonPropertyName("message")]
		public string Message { get; set; }


	}
}
