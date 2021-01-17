import dispatcher from "../dispatcher";




export function LoadMembers() {
    dispatcher.dispatch({
        type: "LoadMembers"
    });


}

export function UpdateQuery(Type,Value) {
    dispatcher.dispatch({
        type: "UpdateMemberQuery", data: {
            type: Type,
            value:Value
        }
    });


}


