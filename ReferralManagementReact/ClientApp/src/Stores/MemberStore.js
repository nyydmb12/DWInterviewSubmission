import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import axios from "axios";
import * as SearchCriteria from "../Shared/Constants"


class MemberStore extends EventEmitter {
         #preFix = "?";
         #queryString = "";
    constructor() {
        super()
        this.members = [];
        this.serverCount = null;
        this.programId = null;
        this.query = null;
        this.showDisabled = false;
        this.dateFrom = null;
        this.dateTo = null;
        this.offSet = 0;
        this.Count = 10;
        this.tablePageIndex = 0;
        this.tablePageSize = 10;
        this.buildQueryString = this.buildQueryString.bind(this);
        this.memberStoreKey = null;


    }

    // generates a key to help render changes reliably  
    calculateKey() {
      this.memberStoreKey = null;
        this.members.forEach(member => {
            this.memberStoreKey = this.memberStoreKey + member.id;
        });
	}
  
    populateMembers() {
        let This = this;
        this.buildQueryString();
        axios.get('members' + this.#queryString)
            .then(function (response) {
                This.members = response.data.members;
                This.serverCount = response.data.total;
                This.calculateKey();
                This.emit("memberChange");
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    buildQueryString() {  

        this.#preFix = "?";

        if (this.programId != null) {

            this.#queryString = this.#preFix + SearchCriteria.Search_ProgramID + "=" + encodeURI(this.programId);
            this.#preFix = "&";
        }
        if (this.query != null) {
            this.#queryString = this.#queryString + this.#preFix + SearchCriteria.Search_Query + "=" + encodeURI(this.query);
            this.#preFix = "&";
        }
        if (this.showDisabled != null) {
            this.#queryString = this.#queryString + this.#preFix + SearchCriteria.Search_ShowDisabled + "=" + encodeURI(this.showDisabled);
            this.#preFix = "&";
        }

        if (this.dateFrom != null) {
            this.#queryString = this.#queryString + this.#preFix + SearchCriteria.Search_DateFrom + "=" + this.dateFrom;
            this.#preFix = "&";
        }
        if (this.dateTo != null) {
            this.#queryString = this.#queryString + this.#preFix + SearchCriteria.Search_DateTo + "=" + this.dateTo;
            this.#preFix = "&";
        }
        if (this.offSet != null) {
            this.#queryString = this.#queryString + this.#preFix + "offSet=" + this.offSet;
            this.#preFix = "&";
        }
        if (this.Count != null) {
            this.#queryString = this.#queryString + this.#preFix + "Count=" + this.Count;
            this.#preFix = "&";
        }
    }


    UpdateQuery(query) {

        switch (query.type) {
            case SearchCriteria.Search_ProgramID: {
                this.programId = query.value
                break;
            }
            case SearchCriteria.Search_Query: {
                this.query = query.value
                break;
            }
            case SearchCriteria.Search_ShowDisabled: {
                this.showDisabled = query.value
                break;
            }
            case SearchCriteria.Search_DateFrom: {
                this.dateFrom = query.value
                break;
            }
            case SearchCriteria.Search_DateTo: {

                this.dateTo = query.value
                break;
            }
            case "offSet": {
                this.offSet = query.value
                break;
            }
            case "Count": {
                this.Count = query.value
                break;
            }
        }
    }


    getMembers() {
        return this.members;
    }


    handleActions(action) {
        switch (action.type) {
            case "LoadMembers": {
                this.populateMembers()
                break;

            }
            case "UpdateMemberQuery":
                {
         
                    this.UpdateQuery(action.data);
                    break;
                }
        }



    }
}

const memberStore = new MemberStore();
MemberStore.dispatchToken = dispatcher.register(memberStore.handleActions.bind(memberStore));
window.memberStore = memberStore;

export default memberStore;
