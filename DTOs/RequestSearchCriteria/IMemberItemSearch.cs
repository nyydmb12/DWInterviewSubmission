using System;

namespace DTOs
{
	public interface IMemberItemSearch : IProgramItemSearch
	{
		bool? ShowDisabled { get; set; }

	}
}
