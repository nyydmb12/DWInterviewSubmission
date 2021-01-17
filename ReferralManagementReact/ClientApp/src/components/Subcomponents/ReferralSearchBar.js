import React, { Component  } from 'react';
import * as ReferralActions from "../../Actions/ReferralAction"
import { Container, Row, Col, Label, Input, Button, Toast, ToastBody, ToastHeader, Fade, Dropdown, DropdownToggle, DropdownMenu, DropdownItem  } from 'reactstrap';
import * as SearchCriteria from "../../Shared/Constants"
import referralStore from '../../Stores/ReferralStore';
var DatePicker = require("reactstrap-date-picker");


export class ReferralSearchBar extends Component {
    constructor(props) {
        super();
        this.state = {
            query: null,
            status: false,
            dateFrom: null,
            dateTo: null,
            memberId: null,
            dropdownOpen: false,
            fadeIn: false

        };

        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleCheckChange = this.handleCheckChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleStateChange = this.handleStateChange.bind(this);
        this.handleDropDown = this.handleDropDown.bind(this);
        
        this.toggle = this.toggle.bind(this);
        this.toggleDD = this.toggleDD.bind(this);
    }

    toggle() { //toggle advanced seard
        this.setState({
            fadeIn: !this.state.fadeIn
        });
    }

    toggleDD() { //toggle dropdown
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    handleStateChange(target, value) { //Updates the state of the item that changed

        switch (target) {

            case (SearchCriteria.Search_Query): {
                this.setState({
                    query: value
                });
                break;
            }
            case (SearchCriteria.Search_Status): {

                this.setState({
                    status: value
                });
                break;
            }
            case (SearchCriteria.Search_DateTo): {
                this.setState({
                    dateTo: value
                });
                break;
            }
            case (SearchCriteria.Search_DateFrom): {
                this.setState({
                    dateFrom: value
                });
                break;
            } case (SearchCriteria.Search_MemberID): {
                this.setState({
                    memberId: value
                });
                break;
            }

        }
    }




    handleDateChange(value, formattedDate, name) {
        this.handleStateChange(name, value);

        ReferralActions.UpdateQuery(name, value);
    }

    handleTextChange(event) {
        this.handleStateChange(event.target.id, event.target.value);

        ReferralActions.UpdateQuery(event.target.id, event.target.value);
    }

    handleCheckChange(event) {

        this.handleStateChange(event.target.id, event.target.checked);
        ReferralActions.UpdateQuery(event.target.id, event.target.checked);
    }
    handleDropDown(event) {
      
        if (event.target.value != "") { //set value only if there is a value present 
            this.handleStateChange(event.target.id, event.target.value);
            ReferralActions.UpdateQuery(event.target.id, event.target.value);
        }
        else { // set state back to null if blank is selected
            this.handleStateChange(event.target.id, null);
            ReferralActions.UpdateQuery(event.target.id, null);
		}
    }

    handleSubmit() {

        ReferralActions.LoadReferrals();

    }
    render() {



        let toastBody;
        if (this.state.fadeIn == false) {
            toastBody = <div></div>
        }
        else {
            toastBody = <ToastBody style={{ fontSize: "14px" }}>
                <div>
                    <Row>
                        <Col>
                            <Label for="status">Select</Label>
                            <Input type="select" name="select" id="status" onChange={this.handleDropDown}>
                                <option> </option>
                                <option>{SearchCriteria.Search_Status_Pending}</option>
                                <option>{SearchCriteria.Search_Status_Qualified}</option>
                                <option>{SearchCriteria.Search_Status_Denied}</option>
                                <option>{SearchCriteria.Search_Status_Approved}</option>
                            </Input>
                            
                        </Col>



                    </Row>
                    <Row>
                        <Col><Label >To Date:   </Label>
                            <DatePicker id={SearchCriteria.Search_DateTo}
                                value={this.state.dateTo}
                                onChange={(v, f) => this.handleDateChange(v, f, SearchCriteria.Search_DateTo)} />
                        </Col>
                    </Row>
                    <Row>
                        <Col> <Label >From Date:   </Label>
                            <DatePicker id={SearchCriteria.Search_DateFrom}
                                value={this.state.dateFrom}
                                onChange={(v, f) => this.handleDateChange(v, f, SearchCriteria.Search_DateFrom)} />
                        </Col>
                    </Row>
                </div>    </ToastBody>;
        }

        return (
            <Container>
                <Row>
                    <Col xs={8} style={{ display: "inline-block" }}>
                        <Label >Email/ExternalID/ReferralCode Search:  </Label>
                        <Input type="text" style={{ display: "inline-block" }} name="Query String" id={SearchCriteria.Search_Query} placeholder="Email/ExternalID/ReferralCode" onChange={this.handleTextChange} />
                    </Col>

                    <Col xs={2}>
                        <Button style={{ display: "inline-block", height: "50%", position: "absolute", bottom: "0" }} color="primary" size="sm" onClick={this.handleSubmit}>Filter</Button>{' '}
                    </Col>

                </Row>
                <Row>

                    <div className="p-3 my-2 rounded bg-docs-transparent-grid" style={{ margin: "0px", width: "100%" }}>

                        <Toast id="1" style={{ margin: "0px", width: "100%" }}>

                            <ToastHeader onClick={this.toggle} style={{ margin: "0px", width: "100%" }}>
                                Advanced Search Options
                        </ToastHeader>
                            <Fade in={this.state.fadeIn} tag="h5" className="mt-3" style={{ margin: "0px" }}>

                                {toastBody}

                            </Fade>

                        </Toast>

                    </div>

                </Row>



            </Container>
        );
    }
}
export default ReferralSearchBar;