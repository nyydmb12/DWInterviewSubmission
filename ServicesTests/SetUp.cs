using Microsoft.Extensions.Configuration;
using System;
using AutoMapper;
using DTOs.Member;
using DTOs.Referrals;
using System.Net.Http;
using System.IO;
namespace ServicesTests
{
	public class SetUp
	{
		private IConfiguration Configuration;
		public SetUp()
		{
			ConfigurationBuilder configBuilder =  new ConfigurationBuilder();
			configBuilder.SetBasePath(Directory.GetCurrentDirectory());  // errors here
			configBuilder.AddJsonFile(path: "appsettings.json", optional: false, reloadOnChange: true); // errors here
			Configuration = configBuilder.Build();
			
		}

		public HttpClient ConfigureHTTPClient()
		{
			HttpClient testClient = new HttpClient();
			testClient.BaseAddress = new Uri("https://api.referralrock.com/");
			testClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Basic", Configuration.GetSection("APIKey").Value);
			return testClient;
		}

		public IMapper ConfigureAutoMapper()
		{
			var configuration = new MapperConfiguration(cfg =>
			{
				cfg.CreateMap<MemberReqest, MemberResponse>();
				cfg.CreateMap<MemberSetRequest, MemberSetResponse>();
				cfg.CreateMap<ReferralRequest, ReferralResponse>();
				cfg.CreateMap<ReferralSetRequest, ReferralSetResponse>();
			});

			return configuration.CreateMapper();
		}
	
	}

	
}
