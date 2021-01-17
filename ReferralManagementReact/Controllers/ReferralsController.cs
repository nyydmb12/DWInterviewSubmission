using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Services;
using AutoMapper;
using DTOs.Referrals;
using System.Net.Http;
using DTOs;
using DTOs.Referrals.Query;
using System.Text.Encodings.Web;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using System.Text.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ReferralManagementScreen.Controllers
{
	[Route("[controller]")]
	[ApiController]
	public class ReferralsController : ControllerBase
	{
		private readonly HttpClient _httpSender;
		private readonly IMapper _objMapper;
		private readonly HTTPService _httpService;
		private readonly UrlEncoder _urlEncoder;
		private readonly ILogger<ReferralsController> _logger;

		// GET: api/<ReferralsController>
		public ReferralsController(IHttpClientFactory httpSender, IMapper objMapper, UrlEncoder urlEncoder, ILogger<ReferralsController> logger)
		{
			_httpSender = httpSender.CreateClient("ReferralRock");
			_objMapper = objMapper;
			_urlEncoder = urlEncoder;
			_httpService = new HTTPService(_httpSender, _objMapper, _urlEncoder, logger);
			_logger = logger;
		}

		[HttpGet]
		public async Task<JsonResult> Get(string programID = null, string query = null, string memberId = null, string sort = null, DateTime? dateFrom = null, DateTime? dateTo = null,string status = null, int? offset = null, int? count = null)
		{
		ReferralItemSearch referralSearch = new ReferralItemSearch(programID, query, memberId, sort, dateFrom, dateTo, status, offset, count);
			ReferralSetResponse returnRes =new ReferralSetResponse();
			try { 
			 returnRes = await _httpService.GetModelsAsync<ReferralItemSearch, ReferralSetRequest, ReferralSetResponse>(referralSearch, EndPoints.GetReferrals);

		}
			catch(Exception e)
			{

				_logger.Log(LogLevel.Error, e, $"Parameters Sent {referralSearch}");
				Response.StatusCode = StatusCodes.Status500InternalServerError;
			}
			finally
			{
				_httpService.Dispose();
			}


return new JsonResult(returnRes);
		}

	
		[HttpPost]
		[Route("update")]
		public async void Post([FromBody] List<ReferralUpdateReqRes> updateRequest)
		{
			List<ReferralUpdateReqRes> returnRes = new List<ReferralUpdateReqRes>();
			try { 
			 returnRes = await _httpService.PostDTOAsync<List<ReferralUpdateReqRes>, List<ReferralUpdateReqRes>>(EndPoints.UpdateReferrals, updateRequest);
		}
			catch(Exception e)
			{

				_logger.Log(LogLevel.Error, e, $"Parameters Sent {JsonSerializer.Serialize<List<ReferralUpdateReqRes>>(updateRequest)}");
				Response.StatusCode = StatusCodes.Status500InternalServerError;
			}
			finally
			{
				_httpService.Dispose();
			}

		
		}

		[HttpPost]
		[Route("create")]
		public async Task Post([FromBody] ReferralCreateRequest createReqeust)
		{
			ReferralCreateResponse returnRes;
			try { 
			 returnRes = await _httpService.PostDTOAsync<ReferralCreateResponse, ReferralCreateRequest>(EndPoints.CreateReferral, createReqeust);
		}
			catch(Exception e)
			{

				_logger.Log(LogLevel.Error, e, $"Parameters Sent {JsonSerializer.Serialize<ReferralCreateRequest>(createReqeust)}");
				Response.StatusCode = StatusCodes.Status500InternalServerError;
			}
			finally
			{
				_httpService.Dispose();
			}

		}


		[HttpPost] //The way axios handles deletes is different than it handle posts and is being problematic changing to a post
		public async void Delete(List<string> deleteReferrals)
		{
			try { 
			List<ReferralDeleteRequest> querys = new List<ReferralDeleteRequest>();
			RefQuery query;
			ReferralDeleteRequest refDTO;
			foreach (string str in deleteReferrals)
				{
			    query = new RefQuery();
				query.PrimInfo.ReferralID = str;

				 refDTO = new ReferralDeleteRequest();
				refDTO.Query = query;
				querys.Add(refDTO);

			}

			List<ReferralDeleteResponse> returnRes = await _httpService.DeleteDTOAsync<List<ReferralDeleteResponse>, List<ReferralDeleteRequest>>(EndPoints.DeleteReferrals, querys);

		}
			catch(Exception e)
			{

				_logger.Log(LogLevel.Error, e, $"Parameters Sent {JsonSerializer.Serialize<List<string>>(deleteReferrals)}");
				Response.StatusCode = StatusCodes.Status500InternalServerError;
			}
			finally
			{
				_httpService.Dispose();
			}
		
		}
	}
}
