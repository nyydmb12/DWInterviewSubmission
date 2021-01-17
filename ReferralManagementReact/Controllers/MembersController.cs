using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Services;
using DTOs.Member;
using AutoMapper;
using DTOs;
using System.Text.Encodings.Web;
using Microsoft.Extensions.Logging;
using System.Text.Json;
using Microsoft.AspNetCore.Http;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ReferralManagementScreen.Controllers
{
	[Route("[controller]")]
	[ApiController]
	public class MembersController : ControllerBase
	{
	private readonly HttpClient _httpSender;
	private readonly IMapper _objMapper;
	private readonly HTTPService _httpService;
	private readonly UrlEncoder _urlEncoder;
	private readonly ILogger<MembersController> _logger;

		public MembersController(IHttpClientFactory httpSender,IMapper objMapper, UrlEncoder urlEncoder, ILogger<MembersController> logger)
		{
			_httpSender = httpSender.CreateClient("ReferralRock");
			_objMapper = objMapper;
			_urlEncoder = urlEncoder;
			_logger = logger;
			_httpService = new HTTPService(_httpSender, _objMapper, _urlEncoder, logger);
			

		}

		// GET api/<MembersController>/5
		[HttpGet]
		public async Task<MemberSetResponse> Get(string programID = null, string  query= null,bool? showDisabled = null,string sort = null,DateTime? dateFrom = null,DateTime? dateTo=null,int? offset = null,int? count = null)
		{
			MemberItemSearch memberSearch = new MemberItemSearch(programID, query, showDisabled, sort, dateFrom, dateTo, offset, count);
			MemberSetResponse returnRes = new MemberSetResponse();

			try
			{


				returnRes = await _httpService.GetModelsAsync<MemberItemSearch, MemberSetRequest, MemberSetResponse>(memberSearch, EndPoints.GetMembers);

				
			}
			catch(Exception e)
			{

				_logger.Log(LogLevel.Error, e, $"Parameters Sent {memberSearch}");
				Response.StatusCode = StatusCodes.Status500InternalServerError;
			}
			finally
			{
				_httpService.Dispose();
			}
		



			return returnRes;

		}

	}
}
