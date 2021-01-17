import React, { Component } from 'react';
import * as MemberActions from "../../Actions/MemberAction"
import { Container, Row, Col, Label, Input, Button, Toast, ToastBody, ToastHeader,Fade  } from 'reactstrap';
import * as SearchCriteria from "../../Shared/Constants"
var DatePicker = require("reactstrap-date-picker");


export class MemberSearchBar extends Component {
    constructor(props) {
        super();
        this.state = {
            query :null,
            showDisabled : false,
            dateFrom : null,
            dateTo: null,
            fadeIn: false,
            
        };

        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleCheckChange = this.handleCheckChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleStateChange = this.handleStateChange.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            fadeIn: !this.state.fadeIn
        });
    }


    handleStateChange(target, value) { //Updates the state of the item that changed

        switch (target) {
            
            case (SearchCriteria.Search_Query): {
            this.setState({
                query: value
            });
                break;
        }
            case (SearchCriteria.Search_ShowDisabled): {

            this.setState({
                showDisabled: value
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
    }

        }
    }




    handleDateChange(value, formattedDate, name) {
        this.handleStateChange(name, value);

        MemberActions.UpdateQuery(name, value);
    }

        handleTextChange(event) {
            this.handleStateChange(event.target.id, event.target.value);

            MemberActions.UpdateQuery(event.target.id, event.target.value);
    }

    handleCheckChange(event) {

        this.handleStateChange(event.target.id, event.target.checked);
        MemberActions.UpdateQuery(event.target.id, event.target.checked);
    }

    handleSubmit() {

       MemberActions.LoadMembers();

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
                        <Col >
                            <Input id={SearchCriteria.Search_ShowDisabled} style={{ margin: "0px" }} type="checkbox" onChange={this.handleChange} />{' '}
                       
                            <Label style={{marginLeft:"1.25em"}}>   
                               
                                Show Disabled Members </Label>
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
                </div>    </ToastBody>  ;
		}

        return (
            <Container>
                <Row>
                    <Col xs={8} style={{ display: "inline-block" }}>
                        <Label >Email/ExternalID/ReferralCode Search:  </Label>
                        <Input type="text" style={{ display: "inline-block" }} name="Query String" id={SearchCriteria.Search_Query} placeholder="Email/ExternalID/ReferralCode" onChange={this.handleTextChange} />
                    </Col>
                
                    <Col xs={2}>
                        <Button style={{ display: "inline-block", height: "50%", position: "absolute", bottom:"0"  }}  color="primary" size="sm" onClick={this.handleSubmit}>Search</Button>{' '}
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
export default MemberSearchBar;