using System;

namespace DTOs
{
	public interface IProgramItemSearch
	{
		 string ProgramID { get; set; }
		 string Query { get; set; }
		string Sort { get; set; }

		DateTime? DateFrom { get; set; }
		DateTime? DateTo { get; set; }

		int? Offset { get; set;}

	   int? Count { get; set; }

	}
}
