using System;
using System.Collections.Generic;
using System.Text;
using DTOs.Member;
using DTOs;
using System.Threading.Tasks;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text.Json;
using System.Text.Json.Serialization;
using AutoMapper;
using System.Text.Encodings.Web;
using Microsoft.Extensions.Logging;

namespace Services
{
	public class HTTPService : IDisposable
	{
		private readonly HttpClient _httpSender;
		private readonly IMapper _objMapper;
		private readonly JsonSerializerOptions _options;
		private readonly UrlEncoder _urlEncoder;
		private readonly ILogger _logger;
		private bool disposedValue;

		public HTTPService(HttpClient httpSender, IMapper objMapper, UrlEncoder urlEncoder, ILogger logger)
		{
			_httpSender = httpSender;
			_objMapper = objMapper;
			_options = new JsonSerializerOptions // this library performs html encoding by defualt
			{
				DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull
				
			};
			_urlEncoder = urlEncoder;
			_logger = logger;
		}

		public async Task<TDTO> GetModelsAsync<TSearch, TModel, TDTO>(TSearch searchObj, EndPoints endpointType)
		{
			TModel ModelSet = default(TModel);
			TDTO returnDTOSet = default(TDTO);
			QueryStringBuilder<TSearch> qsb = new QueryStringBuilder<TSearch>(searchObj, _urlEncoder);
			StringBuilder sb = new StringBuilder(endpointType.Value);

			try
			{
			
				sb.Append(qsb.GetQueryString());

				HttpResponseMessage response = await _httpSender.GetAsync(sb.ToString());

				ModelSet = JsonSerializer.Deserialize<TModel>(response.Content.ReadAsStringAsync().Result);

				returnDTOSet = _objMapper.Map<TDTO>(ModelSet);

				if (!response.IsSuccessStatusCode)
				{
					throw new ArgumentException("Referral Rock request failed");
				}
			}
			catch(ArgumentException ae)
			{
				_logger.LogError(ae, $"Get Request to {endpointType.Value} Failed Query String Failed: {sb} Referral Rock Response: {JsonSerializer.Serialize<TModel>(ModelSet)}");
				throw;
			}
			catch(Exception e)
			{
				_logger.LogError(e, $"Get Request to {endpointType.Value} Failed Query String Failed: {sb}");
				throw;
			}
		
			return returnDTOSet;
			

		}
		public async Task<TDTOResponse> PostDTOAsync<TDTOResponse, TDTORequest>(EndPoints endpointType, TDTORequest dataBody)
		{

			TDTOResponse returnDTOSet = default(TDTOResponse); ;


			try { 
			

				var request = new HttpRequestMessage(HttpMethod.Post, endpointType.Value);
				request.Content = new StringContent(JsonSerializer.Serialize<TDTORequest>(dataBody, _options), Encoding.UTF8, "application/json");
				HttpResponseMessage response = await _httpSender.SendAsync(request);


				returnDTOSet = JsonSerializer.Deserialize<TDTOResponse>(response.Content.ReadAsStringAsync().Result);
			if (!response.IsSuccessStatusCode)
			{
				throw new ArgumentException("Referral Rock request failed");
			}
		}
			catch(ArgumentException ae)
			{
				_logger.LogError(ae, $"Get Request to {endpointType.Value} Referral Rock Response: {JsonSerializer.Serialize<TDTOResponse>(returnDTOSet)} Payload Failed: {JsonSerializer.Serialize<TDTORequest>(dataBody)}");
				throw;
			}
			catch(Exception e)
			{
				_logger.LogError(e, $"Get Request to {endpointType.Value} Payload Failed: {JsonSerializer.Serialize<TDTORequest>(dataBody)}");
				throw;
			}
		
			return returnDTOSet;
			
		

		}


		public async Task<TDTOResponse> DeleteDTOAsync<TDTOResponse,TDTORequest> (EndPoints endpointType, TDTORequest dataBody)
		{

			TDTOResponse returnDTOSet = default(TDTOResponse);
			try
			{
			

				StringBuilder sb = new StringBuilder(endpointType.Value);

				var request = new HttpRequestMessage(HttpMethod.Delete, endpointType.Value);
				request.Content = new StringContent(JsonSerializer.Serialize<TDTORequest>(dataBody, _options), Encoding.UTF8, "application/json");
				HttpResponseMessage response = await _httpSender.SendAsync(request);
				returnDTOSet = JsonSerializer.Deserialize<TDTOResponse>(response.Content.ReadAsStringAsync().Result);
			
				if (!response.IsSuccessStatusCode)
				{
					throw new ArgumentException("Referral Rock request failed");
				}
			}
			catch (ArgumentException ae)
			{
				_logger.LogError(ae, $"Get Request to {endpointType.Value}  Referral Rock Response: {JsonSerializer.Serialize<TDTOResponse>(returnDTOSet)} Payload Failed: {JsonSerializer.Serialize<TDTORequest>(dataBody)}");
				throw;
			}
			catch (Exception e)
			{
				_logger.LogError(e, $"Get Request to {endpointType.Value} Payload Failed: {JsonSerializer.Serialize<TDTORequest>(dataBody)}");
				throw;
			}
			
			return returnDTOSet;

		}

		protected virtual void Dispose(bool disposing)
		{
			if (!disposedValue)
			{
				if (disposing)
				{

					_httpSender.Dispose();
					
				}

				disposedValue = true;
			}
		}


		public void Dispose()
		{
			// Do not change this code. Put cleanup code in 'Dispose(bool disposing)' method
			Dispose(disposing: true);
			GC.SuppressFinalize(this);
		}
	}
}
