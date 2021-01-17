using System;

namespace DTOs
{
	public class EndPoints
	{
		public static EndPoints GetMembers { get { return new EndPoints("api/members");	} }

		public static EndPoints GetReferrals { get { return new EndPoints("api/referrals"); } }

		public static EndPoints CreateReferral { get { return new EndPoints("api/referrals"); } }
		public static EndPoints UpdateReferrals { get { return new EndPoints("api/referral/update"); } }
		public static EndPoints DeleteReferrals { get { return new EndPoints("api/referral/remove"); } }


		public string Value { get; set; }

		public EndPoints(string value)
		{
			Value = value;
		}
	}
}
