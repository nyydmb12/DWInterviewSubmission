import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import axios from "axios";
import * as SearchCriteria from "../Shared/Constants"


class ReferralStore extends EventEmitter {
    #preFix = "?";
    #queryString = "";
    constructor() {
        super()
        this.referrals = [];
        this.serverCount = null;
        this.programId = null;
        this.query = null;
        this.memberId = null;
        this.memeberReferralCode = null;
        this.status = null
        this.dateFrom = null;
        this.dateTo = null;
        this.offSet = 0;
        this.Count = 10;
        this.buildQueryString = this.buildQueryString.bind(this);
        this.selectedReferral = null;
        this.updArrayReferrals = [];
        this.tablePageIndex = 0;
        this.tablePageSize = 10;
        this.deleteAry = [];
        this.deleteInProcess = false;
        this.referralStoreKey = null;
        this.errorMessage = [];
        this.queryObj = {
            query: {
                primaryInfo: {
                    referralId: ''
                },
                secondaryInfo: {
                    externalIdentifier: '',
                    email: '',
                    phoneNumber: ''
                },
                tertiaryInfo: {
                    ProgramId: '',
                    ProgramName: '',
                    ProgramTitle: ''
                },
                fuzzyInfo: {
                    Identifier: ''
                }
            }
        };
        this.refObj = {
            referral: {
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
                preferredContact: '',
                externalIdentifier: '',
                amount: null,
                companyName: '',
                note: '',
                publicNote: '',
                customOption1Name: '',
                customOption2Name: '',
                customText1Name: '',
                customText2Name: '',
                customText3Name: '',
                customOption1Value: '',
                customOption2Value: '',
                customText1Value: '',
                customText2Value: '',
                customText3Value: '',
                status: ''
            }
        };

        this.updObj = Object.assign(this.queryObj, this.refObj);
        

    }


    project(obj, projection) {
    let projectedObj = {}
        for (let key in projection) {
          
        projectedObj[key] = obj[key];
        }
        return projectedObj;
    }

    calculateStoreKey() {
        this.referralStoreKey = null;
        this.referrals.forEach((ref) => {
            this.referralStoreKey = this.referralStoreKey + ref.id;
        });
    }
    populateReferrals() { 
        let This = this;
        this.buildQueryString();
        if (this.memberId != null) { // we only want to populate if we have a memeber
            axios.get('Referrals' + this.#queryString)
                .then(function (response) {
                    This.referrals = response.data.referrals;
                    This.serverCount = response.data.total;
                    This.calculateStoreKey();
                        This.emit("referralChange");
               
                })
                .catch(function (error) {
                    This.handleErrors(error.response.data);
                    console.log(error);
                });
        }
    }
 
    handleErrors(responseData, This) {
        This.errorMessage = [];
        if (responseData.status == 400) {
            Object.keys(responseData.errors).forEach(function (key, index) {
                This.errorMessage.push(`${responseData.errors[key]}`);
            });

        }
        else {
            This.errorMessage.push(SearchCriteria.Error_Message_Default);
        }

	}


    //update the local array to support page refresh before state is available
    updateStoreArray()
    {
    this.referrals.forEach((ref, index) => {
        if (ref.id === this.selectedReferral.id) {

            this.referrals[index] = this.selectedReferral;
        }
    });
    }

    createReferrals(endpoint,referral) {
        let This = this;

        referral.referralCode =this.memeberReferralCode;
        this.updObj.referral = this.project(referral, this.updObj.referral);
       
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        };

        axios.post(endpoint, JSON.stringify(this.updObj.referral), axiosConfig)
            .then(function (response) {

                This.referrals.push(referral);
                This.calculateStoreKey();
                This.emit("referralPostSuccess");
            })
            .catch(function (error) {
                This.handleErrors(error.response.data, This);
                              This.emit("referralPostFailure");
            });
    }

    updReferrals(endpoint,referral) {
        let This = this;
        referral.referralCode = this.memeberReferralCode;
        console.log(referral.referralCode);
        this.updObj.referral = this.project(referral, this.updObj.referral);
        this.updObj.query.primaryInfo.referralId = referral.id;
 
        this.updArrayReferrals.push(this.updObj);
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        };
      
        axios.post(endpoint, JSON.stringify(This.updArrayReferrals), axiosConfig)
            .then(function (response) {

                This.updateStoreArray();
                This.calculateStoreKey();
                This.emit("referralPostSuccess");
            })
            .catch(function (error) {
   

                This.handleErrors(error.response.data, This);
                
                This.emit("referralPostFailure");
            });
        this.updArrayReferrals = [];
    }

    removeItemFromArray(targetId) {

        for (var i = 0; i < this.referrals.length; i++) {

            if (this.referrals[i].id === targetId) {
                this.referrals.splice(i, 1);
                i--;
            }
        }
    }


    deleteReferral(endpoint, referral) {
        this.deleteInProcess = true;
        let This = this;
        this.deleteAry.push(referral.id);
        let axiosConfig = {
            headers: {

                'Content-Type': 'application/json;c',
                "Access-Control-Allow-Origin": "*",
            }
        };

        axios.post(endpoint, JSON.stringify(this.deleteAry), axiosConfig)
            .then(function (response) {

                This.removeItemFromArray(referral);
                This.deleteInProcess = false;
                This.calculateStoreKey();
                This.emit("referralDeleteSuccess");
            })
            .catch(function (error) {
                This.handleErrors(error.response.data, This);
                This.deleteInProcess = false;
                This.emit("referralDeleteFailure");
            });
        this.deleteAry = [];
    }


    buildQueryString() {

        this.#preFix = "?";
        this.#queryString = "";
        if (this.programId != null) {

            this.#queryString = this.#preFix + SearchCriteria.Search_ProgramID + "=" + encodeURI(this.programId);
            this.#preFix = "&";
        }
        if (this.query != null) {
            this.#queryString = this.#queryString + this.#preFix + SearchCriteria.Search_Query + "=" + encodeURI(this.query);
            this.#preFix = "&";
        }
        if (this.memberId != null) {
            this.#queryString = this.#queryString + this.#preFix + SearchCriteria.Search_MemberID + "=" + encodeURI(this.memberId);
            this.#preFix = "&";
        }
        if (this.status != null) {
            this.#queryString = this.#queryString + this.#preFix + SearchCriteria.Search_Status + "=" + encodeURI(this.status);
            this.#preFix = "&";
        }

        if (this.dateFrom != null) {
            this.#queryString = this.#queryString + this.#preFix + SearchCriteria.Search_DateFrom + "=" + this.dateFrom.toISOString();
            this.#preFix = "&";
        }
        if (this.dateTo != null) {
            this.#queryString = this.#queryString + this.#preFix + SearchCriteria.Search_DateTo + "=" + this.dateTo.toISOString();
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
            case SearchCriteria.Search_MemberID: {
                this.memberId = query.value
               
                break;
            }
            case SearchCriteria.Search_Status: {
                this.status = query.value
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

    setSelectedReferral(value) {
        this.selectedReferral = value ?? this.updObj.referral;

        this.emit("selectedChange");
    }




    getReferrals() {
        
        return this.referrals;
    }


    handleActions(action) {

        switch (action.type) {
       
            case "LoadReferrals": {
                this.populateReferrals()
                break;

            } case "SetMemberData": {
                this.UpdateQuery({ type: SearchCriteria.Search_MemberID, value: action.data.Row.id });
                this.memeberReferralCode = action.data.Row.referralCode;
                console.log("Referr" + this.memeberReferralCode)
                this.populateReferrals("SetMemberData"); // if a member id is clicked we want to populate referrals table
                break;

            }
                
            case "UpdateReferralQuery":
                {
                    this.UpdateQuery(action.data);
                    break;
                }
            case "SetReferral":
                {
                    this.setSelectedReferral(action.data.value);
                    break;
                }
            case "UpdateReferral":
                {
                    this.updReferrals('/Referrals/update', action.data.value);
                    break;
                }
            case "CreateReferral":
                {
                    this.createReferrals('/Referrals/create', action.data.value);
                    break;
                }
            case "DeleteReferral":
                {
                    this.deleteReferral('/Referrals', action.data.value);
                    break;
                }

                
                
        }



    }
}

const referralStore = new ReferralStore();
ReferralStore.dispatchToken = dispatcher.register(referralStore.handleActions.bind(referralStore));
window.referralStore = referralStore;

export default referralStore;
