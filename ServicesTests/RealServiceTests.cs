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
using Microsoft.Extensions.Logging;
using ReferralManagementScreen.Controllers;

namespace ServicesTests
{
	/// <summary>
	/// Normally the point of unit testing is to make it so we don't update data, but this class exists so we can make sure our data mappings are correct
	/// </summary>
	public class RealServiceTests
	{
		private readonly HttpClient _httpSender;
		private readonly IMapper _objMapper;
		private readonly HTTPService _httpService;
		private string _programID = "48bbaa6d-b077-47ef-8dc1-10f2f9d5c49c";
		private readonly ILogger<RealServiceTests> _logger;
		private ReferralsController testController;


	   public RealServiceTests()
		{
			SetUp setUp = new SetUp();
			_httpSender = setUp.ConfigureHTTPClient();
			_objMapper = setUp.ConfigureAutoMapper();
			UrlEncoder urlEncoder = UrlEncoder.Create();
			_httpService = new HTTPService(_httpSender, _objMapper, urlEncoder, _logger);
		}



		[Fact]
		public async Task ShouldGetMembersAsync()
		{
			MemberItemSearch memberSearch = new MemberItemSearch(_programID, null, null, null, null, null, null, null);

			MemberSetResponse returnRes = await _httpService.GetModelsAsync<MemberItemSearch, MemberSetRequest, MemberSetResponse>(memberSearch, EndPoints.GetMembers);

			Assert.True(returnRes.Members.Count > 0);
		}

		[Fact]
		public async Task ShouldGetReferralsAsync()
		{

			ReferralItemSearch referralSearch = new ReferralItemSearch(_programID, null, null, null, null, null, null, null, null);

			DTOs.Referrals.ReferralSetResponse returnRes = await _httpService.GetModelsAsync<ReferralItemSearch, ReferralSetRequest, ReferralSetResponse>(referralSearch, EndPoints.GetReferrals);

			Assert.True(returnRes.Referrals.Count > 0);
		}
		

		[Fact]
		public async Task ShouldInsertReferralsAsync()
		{
	    	var fixture = new Fixture();
		    fixture.Customizations.Add(
			new StringGenerator(() =>
				Guid.NewGuid().ToString().Substring(0, 10)));
			ReferralCreateRequest mocUpdate = fixture.Create<ReferralCreateRequest>();
			mocUpdate.ReferralCode = "1DANIELWEST44";
			mocUpdate.Status = "pending";
			mocUpdate.Email = "";
			mocUpdate.PhoneNumber = "";
			mocUpdate.PreferredContact = "";


			ReferralCreateResponse returnRes = await _httpService.PostDTOAsync<ReferralCreateResponse, ReferralCreateRequest>(EndPoints.CreateReferral, mocUpdate);

			Assert.True(returnRes.ReferralData.ProgramID != "");
		}

		[Fact]
		public async Task ShouldUpdateReferralsAsync()
		{
			var fixture = new Fixture();
			fixture.Customizations.Add(
			new StringGenerator(() =>
				Guid.NewGuid().ToString().Substring(0, 10)));
			List<ReferralUpdateReqRes> mocUpdate = fixture.Create<List<ReferralUpdateReqRes>>();

			ReferralItemSearch referralSearch = new ReferralItemSearch(_programID, null, null, null, null, null, null, null,3);


			//get some referalls to update
			DTOs.Referrals.ReferralSetResponse referrals = await _httpService.GetModelsAsync<ReferralItemSearch, ReferralSetRequest, ReferralSetResponse>(referralSearch, EndPoints.GetReferrals);
		
			
			int i = 0;
			foreach (DTOs.Referrals.ReferralResponse referal in referrals.Referrals)
			{

				mocUpdate[i].ReferralInfo.CompanyName = "DW";

				mocUpdate[i].QueryInfo.PrimInfo.ReferralID = referal.Id;
				i++;
			}


			List<ReferralUpdateReqRes> returnRes = await _httpService.PostDTOAsync<List<ReferralUpdateReqRes>, List<ReferralUpdateReqRes>>(EndPoints.UpdateReferrals, mocUpdate);

			Assert.True(returnRes.Count>0);
		}

		[Fact]
		public async Task ShouldDeleteReferralsAsync()
		{
			
			List<ReferralDeleteRequest> mocDelete = new List<ReferralDeleteRequest>();

			ReferralItemSearch referralSearch = new ReferralItemSearch(_programID, null, null, null, null, null, null, null, 1);


			//get some referalls to update
			DTOs.Referrals.ReferralSetResponse referrals = await _httpService.GetModelsAsync<ReferralItemSearch, ReferralSetRequest, ReferralSetResponse>(referralSearch, EndPoints.GetReferrals);

			RefQuery query = new RefQuery();
			query.PrimInfo.ReferralID = referrals.Referrals[0].Id;
			
			ReferralDeleteRequest refDTO = new ReferralDeleteRequest();
			refDTO.Query = query;
			mocDelete.Add(refDTO);


			List < ReferralDeleteResponse> returnRes = await _httpService.DeleteDTOAsync<List<ReferralDeleteResponse>, List<ReferralDeleteRequest>>(EndPoints.DeleteReferrals, mocDelete);



			Assert.True(returnRes[0].resInfo.Status=="Success");
		}




	}
}
