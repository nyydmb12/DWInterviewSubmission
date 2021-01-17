import React, { Component } from 'react';
import * as ReferralActions from "../../Actions/ReferralAction"
import ReferralStore from "../../Stores/ReferralStore"
import ReferralSearchBar from "./ReferralSearchBar"
import ReferralsTable from "./ReferralsTable"
import ReferralModal from "./ReferralModal"
import axios from "axios";
import * as SearchCriteria from "../../Shared/Constants"
import ConfirmationModal from "./ConfirmationModal"

import { Row, Button, Col } from "reactstrap";
import referralStore from '../../Stores/ReferralStore';
export default class Referral extends Component {
    constructor(props) {
        super();
        this.getSelectedReferral = this.getSelectedReferral.bind(this);
        this.getReferrals = this.getReferrals.bind(this);
        this.handleReferralChange = this.handleReferralChange.bind(this);
        this.toggleCreateModal = this.toggleCreateModal.bind(this);
        this.toggleUpdateModal = this.toggleUpdateModal.bind(this);
        this.toggleConfirmModal = this.toggleConfirmModal.bind(this);
        this.setSubmitFail = this.setSubmitFail.bind(this);
        this.setSubmitSuccess = this.setSubmitSuccess.bind(this);
        this.handleCreateSubmit = this.handleCreateSubmit.bind(this);
        this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.homePopulateReferrals = this.homePopulateReferrals.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.validateUniqueAttribute = this.validateUniqueAttribute.bind(this);
        this.handleConfirmDelete = this.handleConfirmDelete.bind(this);  
        

        

        this.state = {
            referrals: [],
            selectedReferral: ReferralStore.selectedReferral ?? ReferralStore.updObj.referral,
            createModalIsOpen: false,
            updateModalIsOpen: false,
            confimrationModalIsOpen: false,
            submitSuccess: null,
             errorMessage :null
        };

    }


    componentDidMount() {

        ReferralStore.on("referralChange", this.getReferrals);
        ReferralStore.on("selectedChange", this.getSelectedReferral);
        ReferralStore.on("referralPostSuccess", this.handleReferralChange);
        ReferralStore.on("referralPostSuccess", this.setSubmitSuccess);
        ReferralStore.on("referralPostFailure", this.setSubmitFail);
        ReferralStore.on("referralDeleteSuccess", this.handleReferralChange);
    }

    componentWillUnmount() {

        ReferralStore.removeListener("referralChange", this.getReferrals);
        ReferralStore.removeListener("selectedChange", this.getSelectedReferral);
        ReferralStore.removeListener("referralPostSuccess", this.handleReferralChange);
        ReferralStore.removeListener("referralPostSuccess", this.setSubmitSuccess);
        ReferralStore.removeListener("referralPostFailure", this.setSubmitFail);
        ReferralStore.removeListener("referralDeleteSuccess", this.handleReferralChange);

    }



    setSubmitSuccess(event) {
        ReferralActions.SetReferral(null);

        this.setState({
            submitSuccess: true
        });



    }
    setSubmitFail() {
        this.setState({
            submitSuccess: false,
            errorMessage: referralStore.errorMessage
        });
        console.log(this.state.errorMessage);
    }



    //called when a user updates a refererral
    handleReferralChange() {

        ReferralActions.LoadReferrals();
        this.setState({
            referrals: ReferralStore.getReferrals()

        });
       
    }
    //called when a user clicks a referral
    getSelectedReferral() {

        let updateModChange;
        if (this.state.createModalIsOpen || this.state.updateModalIsOpen) { //don't open the update modual if the create modual is open a system probably tirggered this event
            updateModChange = false;
        }
        else {
            updateModChange = true;

            this.setState({
                selectedReferral: ReferralStore.selectedReferral,
                submitSuccess: null,
                updateModalIsOpen: updateModChange

            });
        }
    }

    getReferrals() {
        //update referrals and move to the referral tab
     
        this.setState({
            referrals: ReferralStore.getReferrals(),
            activeTab: '2'        

        });

      
    }
   
    setActiveTab(tab) {

        this.setState({
            activeTab: tab

        });
    }

    toggleConfirmModal() {
      
     


        this.setState({
            confimrationModalIsOpen: !this.state.confimrationModalIsOpen,

        });
    }

    toggleCreateModal() {
        let selecRef; 
        if (this.state.createModalIsOpen)
        { selecRef = null }
        else {
            selecRef = this.state.selectedReferral;
		}


        this.setState({
            createModalIsOpen: !this.state.createModalIsOpen,
            selectedReferral: null,
            submitSuccess:null
        });
    }
    toggleUpdateModal() {


        let selecRef;
        if (this.state.updateModalIsOpen) {
            ReferralActions.SetReferral(null);
        }

        else {
            selecRef = this.state.selectedReferral;
        }

            this.setState({
                updateModalIsOpen: !this.state.updateModalIsOpen,
                selectedReferral: selecRef
            });
    }


    validateUniqueAttribute(event) {
        let This = this;
    let value = event.target.value;
    let target = event.target;
    let isValid = true;
    let DifferentAccountExist = false;
        this.workingReferral = this.state.selectedReferral ?? ReferralStore.updObj.referral;
        console.log(value);
        if (value != "" && value != null && value != " ") { //null values can be duplicated
            axios.get('Referrals?query=' + encodeURI(value))
                .then(function (response) {
                    console.log(response)
                    if (response.data.referrals.length > 0) {
                        for (var i = 0; i < response.data.referrals.length; i++) { // loop thorugh and see if different account is assoiated with this email
                            if (This.workingReferral.id != response.data.referrals[i].id) { DifferentAccountExist = true; } // a different account has this email
                        }

                        if (DifferentAccountExist) {
                            isValid = false;
                            target.setCustomValidity(target.id + " already is assoicated with an account");
                        } else {

                            target.setCustomValidity("");
                        }
                    }
                    else {
                        target.setCustomValidity("");
                    }

                })
                .catch(function (error) {

                    console.log(error);
                });

        }
    return isValid;
}




    //hadnles create from modal
    handleCreateSubmit(event) {
        this.workingReferral = this.state.selectedReferral ?? ReferralStore.updObj.referral; //initize to default empty if blank submit
        event.preventDefault();
        const form = event.target
        const isValid = form.checkValidity() // returns true or false



        if (isValid == true) {
            ReferralActions.CreateReferral(this.workingReferral);
            ReferralStore.populateReferrals();
        }
      
    }
    //handles submit from modal
    handleUpdateSubmit(event) {
        event.preventDefault();
        const form = event.target
        const isValid = form.checkValidity() // returns true or false


        if (isValid == true) {

      
        ReferralActions.UpdateReferral(this.state.selectedReferral);
        ReferralStore.populateReferrals();
        }
    }

    //handles delete from table
    handleDelete(referral) {

        console.log(referral);
        this.setState({
            confimrationModalIsOpen: true,
            selectedReferral: referral //store the selected referral so after confirmation we can delete it
        });

    }
    //handles confirmationOfDelete
    handleConfirmDelete(event) {
        event.preventDefault();
        console.log(this.state.selectedReferral);
        ReferralActions.DeleteReferral(this.state.selectedReferral);
        ReferralStore.populateReferrals();
        this.setState({
            confimrationModalIsOpen: false
        });

    }


    //handles change to text from modal
    handleTextChange(event) {
        console.log(event.target.value);
        this.workingReferral = this.state.selectedReferral ?? ReferralStore.updObj.referral;

        Reflect.set(this.workingReferral, event.target.id, event.target.value)
        console.log(this.workingReferral);
        this.setState({
            selectedReferral: this.workingReferral
        });
    }


    

    homePopulateReferrals() {

        ReferralActions.LoadReferrals();

    }

    render() {

        let activeTab = this.state.activeTab;
        let referralsSpace;
        const rowStyles =
        {
            marginTop: "1em"
        };


            const toggle = tab => {
                if (activeTab !== tab) this.setActiveTab(tab);
            }
            return (
                <div>                <Row style={rowStyles}>
                    <Col>
                        <Col>
                            <ReferralSearchBar />


                            <ReferralsTable key={ReferralStore.referralStoreKey + this.state.selectedReferral} deleteHandler={this.handleDelete} data={this.state.referrals} populateHandler={this.homePopulateReferrals} />
                            <Row style={rowStyles}>
                                <Button color="primary" style={{marginLeft:"1.25em"}} onClick={this.toggleCreateModal}>Create Referral</Button>{' '}
                            </Row>
                            <ReferralModal action={SearchCriteria.Modal_Referral_Create} isOpen={this.state.createModalIsOpen} clickHandler={this.toggleCreateModal} changeHandler={this.handleTextChange}
                                submitHandler={this.handleCreateSubmit} referral={this.state.selectedReferral} submitSuccess={this.state.submitSuccess} errorMessage={this.state.errorMessage} handleUniqueBlur={this.validateUniqueAttribute}/>
                            <ReferralModal action={SearchCriteria.Modal_Referral_Update} isOpen={this.state.updateModalIsOpen} clickHandler={this.toggleUpdateModal} changeHandler={this.handleTextChange}
                                submitHandler={this.handleUpdateSubmit} referral={this.state.selectedReferral} submitSuccess={this.state.submitSuccess} errorMessage={this.state.errorMessage} handleUniqueBlur={this.validateUniqueAttribute} />

                            <ConfirmationModal isOpen={this.state.confimrationModalIsOpen} clickHandler={this.toggleConfirmModal} submitHandler={this.handleConfirmDelete} referralName={this.state.selectedReferral?.firstName + " " + this.state.selectedReferral?.lastName} action={SearchCriteria.Modal_Referral_Delete} />

                        </Col>
                    </Col>
                </Row>
               </div>


            );
        }
    
}