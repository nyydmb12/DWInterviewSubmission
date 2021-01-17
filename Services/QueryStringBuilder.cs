
using System.Reflection;
using System.Text;
using System.Text.Encodings.Web;
using System.Text.Json.Serialization;

namespace Services
{/// <summary>
/// Class used to build query string from search objects
/// </summary>
/// <typeparam name="T"></typeparam>
	public class QueryStringBuilder<T>
	{
		private T _queryObject;
		private UrlEncoder _urlEncoder;

	
		public QueryStringBuilder(T queryObject, UrlEncoder urlEncoder)
		{
			_queryObject = queryObject;
			_urlEncoder = urlEncoder;

		}
		//replace the object that will be used to build a query string
		public void SetQueryObject(T queryObject)
		{
			_queryObject = queryObject;
		}
		/// <summary>
		/// loops through search object and builds query string to call api
		/// </summary>
		/// <returns></returns>
		public string GetQueryString()
		{
			string preFix = "?";
			StringBuilder sb = new StringBuilder();
			PropertyInfo[] properties =  typeof(T).GetProperties();
			foreach (PropertyInfo property in properties)
			{
				if(property.GetValue(_queryObject) !=null && property.GetValue(_queryObject).ToString() != "" )
				{

					string propValue = System.Convert.ToString(property.GetValue(_queryObject));

					sb.AppendFormat("{0}{1}={2}", preFix,property.GetCustomAttribute<JsonPropertyNameAttribute>().Name, _urlEncoder.Encode(propValue));
					preFix = "&"; // additonal params are prefixed with &
				}
				
				
			}
			return sb.ToString();
			
		}
	
	}
}
