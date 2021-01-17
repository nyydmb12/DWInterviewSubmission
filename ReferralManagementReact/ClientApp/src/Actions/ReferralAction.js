import dispatcher from "../dispatcher";

export function LoadReferrals() {
    dispatcher.dispatch({
        type: "LoadReferrals"
    });
}
export function SetMemberData(Type, MemberRow) {

    dispatcher.dispatch({
        type: "SetMemberData", data: {
            type: Type,
            Row: MemberRow
        }
    });
}

export function UpdateQuery(Type, Value) {
    dispatcher.dispatch({
        type: "UpdateReferralQuery", data: {
            type: Type,
            value: Value
        }
    });
}
export function SetReferral(Value) {
        dispatcher.dispatch({
            type: "SetReferral", data: {
                value: Value
            }
        });
}
export function UpdateReferral(Value) {
    dispatcher.dispatch({
        type: "UpdateReferral", data: {
            value: Value
        }
    });
}

export function CreateReferral(Value) {
    dispatcher.dispatch({
        type: "CreateReferral", data: {
            value: Value
        }
    });
}
export function DeleteReferral(Value) {
    dispatcher.dispatch({
        type: "DeleteReferral", data: {
            value: Value
        }
    });
}




