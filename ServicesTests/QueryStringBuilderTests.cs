using AutoMapper;
using Services;
using System;
using System.Net.Http;
using Xunit;
using DTOs;
using DTOs.Member;
using System.Threading.Tasks;
using DTOs.Referrals;
using System.Collections.Generic;
using AutoFixture;
using DTOs.Referrals.Query;
using System.Text.Encodings.Web;
using System.Web;

namespace ServicesTests
{
	/// <summary>
	/// Normally the point of unit testing is to make it so we don't update data, but this class exists so we can make sure our data mappings are correct
	/// </summary>
	public class QueryStringBuilderTests
	{
		private UrlEncoder _urlEncoder;
		public QueryStringBuilderTests()
		{
			_urlEncoder = UrlEncoder.Create();
		}



		[Theory]
		[InlineData("",null)]
		[InlineData("?programID=%61","a")]
		[InlineData("?programID=%61&query=%62", "a", "b")]
		[InlineData("?programID=%61&query=%62&showDisabled=%46%61%6C%73%65", "a", "b",false)]
		[InlineData("?programID=%61&query=%62&showDisabled=%46%61%6C%73%65&sort=%63", "a", "b", false,"c")]
		public  void MemberSearchQueryStringShouldHave(string expected,string programID =null, string query = null, bool? showDisabled = null, string sort = null, DateTime? dateFrom = null, DateTime? dateTo = null, int? offset = null, int? count = null)
		{
			MemberItemSearch memberSearch = new MemberItemSearch(programID, query, showDisabled, sort, dateFrom, dateTo, offset, count);

			QueryStringBuilder<MemberItemSearch> qsb = new QueryStringBuilder<MemberItemSearch>(memberSearch, _urlEncoder);
			string restult = qsb.GetQueryString();
			Assert.Equal(expected, restult);
		}




	}
}
