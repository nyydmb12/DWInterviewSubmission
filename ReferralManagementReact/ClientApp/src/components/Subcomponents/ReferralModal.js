import React, { Component  } from 'react';
import { Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert, Form, FormGroup } from 'reactstrap';
import * as Constants from "../../Shared/Constants"


//This componenet will be used for Create, Update, Delete Operations
export class ReferralModal extends Component {
    workingReferral
    constructor(props) {
        super();
        this.state = {
            query: null,
            status: false,
            dateFrom: null,
            dateTo: null,
            memberId: null,
            dropdownOpen: false,
            fadeIn: false,
     
            

        };


 
        this.getSubmitSpace = this.getSubmitSpace.bind(this);


    }




  
  

    getSubmitSpace() {
        let submitSpace;

       // if (this.state.submitting) {
       //     submitSpace = <Spinner style={{ width: '3rem', height: '3rem' }} />;
      //  }
      //  else {
            if (this.props.submitSuccess == null) {
                submitSpace = <div><Button color="primary" type="submit">Submit</Button>
                <Button color="secondary" onClick={this.props.clickHandler}>Cancel</Button>
                    </div>
            }
            else if (this.props.submitSuccess == false) {
                const errors = this.props.errorMessage.map((error) => {
                    return <li>{error}</li>;
                });
                submitSpace = submitSpace = <div>
                    <Alert color="danger">
                        <h4 className="alert-heading">{this.props.action} Failed </h4>
            
                        <p>
                            
                         <ul>
                                {errors}
                            </ul>
                           </p>

                    </Alert>
                    <Button color="primary" type="submit">Submit</Button>
                     <Button color="secondary" onClick={this.props.clickHandler}>Cancel</Button>
                </div>;
            }
            else {
              
                submitSpace = <div>
                    <Alert color="success">
                        <h4 className="alert-heading">Successfully {this.props.action}d </h4>
                        <p>
                            Your transaction completed successfully.
                         </p>
     
                    </Alert>
                    <Button color="secondary" onClick={this.props.clickHandler}>Close</Button>
                </div>;
                }

            
     //  }
        return submitSpace;
    }


    render() {


        return (
            <div>
              
                <Modal isOpen={this.props.isOpen} modalTransition={{ timeout: 350 }} backdropTransition={{ timeout: 700 }}
                    toggle={this.props.clickHandler}>
                    <ModalHeader toggle={this.props.clickHandler}>Referral {this.props.action}</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.props.submitHandler}>
                            <h4>Referral Details</h4>
                            <FormGroup>
                                <Label for="firstName">First Name:*</Label>
                                <Input type="text" name="firstName" id="firstName" placeholder="Joe" onChange={this.props.changeHandler} value={this.props.referral?.firstName ?? ""} required/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="lastName">Last Name:*</Label>
                                <Input type="text" name="lastName" id="lastName" placeholder="Smith" onChange={this.props.changeHandler} value={this.props.referral?.lastName ?? ""} required/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="email">Email:*</Label>
                                <Input type="email" name="email" id="email" placeholder="Joe.Smith@example.com" onChange={this.props.changeHandler} onBlur={this.props.handleUniqueBlur} value={this.props.referral?.email ?? ""} required/>
                            </FormGroup>
                            <FormGroup>
                                <label for="phoneNumber">Enter your phone number:</label>
                                <input type="tel" id="phoneNumber" name="phone" placeholder="555-555-5555" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" onChange={this.props.changeHandler} value={this.props.referral?.phoneNumber ?? ""} oninput="this.reportValidity()" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="externalIdentifier">External Identifier:</Label>
                                <Input type="text" name="externalIdentifier" id="externalIdentifier" onChange={this.props.changeHandler} onBlur={this.props.handleUniqueBlur} value={this.props.referral?.externalIdentifier ?? ""}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="companyName">Company Name:</Label>
                                <Input type="text" name="companyName" id="companyName" onChange={this.props.changeHandler} value={this.props.referral?.companyName ?? ""} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="status">Select</Label>
                                <Input type="select" name="select" id="status" onChange={this.props.changeHandler} value={this.props.referral?.status??""}>
                                <option> </option>
                                    <option value={Constants.Search_Status_Pending}>{Constants.Search_Status_Pending}</option>
                                    <option value={Constants.Search_Status_Qualified}>{Constants.Search_Status_Qualified}</option>
                                    <option value={Constants.Search_Status_Denied}>{Constants.Search_Status_Denied}</option>
                                    <option value={Constants.Search_Status_Approved}>{Constants.Search_Status_Approved}</option>
                                </Input>
                            </FormGroup>
                            <hr class="rounded"/>
                            <h4>Additional Details</h4>
                            <FormGroup>
                                <Label for="customText1">Custom Text 1:</Label>
                                <Input type="text" name="customText1" id="customText1Name" onChange={this.props.changeHandler} value={this.props.referral?.customText1Name ?? ""}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="customValue1">Custom Value 1:</Label>
                                <Input type="text" name="customValue1" id="customText1Value" onChange={this.props.changeHandler} value={this.props.referral?.customText1Value ?? ""}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="customText2">Custom Text 2:</Label>
                                <Input type="text" name="customText2" id="customText2Name" onChange={this.props.changeHandler} value={this.props.referral?.customText2Name ?? ""}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="customValue2">Custom Value 2:</Label>
                                <Input type="text" name="customValue2" id="customText2Value" onChange={this.props.changeHandler} value={this.props.referral?.customText2Value ?? ""} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="customText3">Custom Text 3:</Label>
                                <Input type="text" name="customText3" id="customText3Name" onChange={this.props.changeHandler} value={this.props.referral?.customText3Name ?? ""}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="customValue3">Custom Value 3:</Label>
                                <Input type="text" name="customValue3" id="customText3Value" onChange={this.props.changeHandler} value={this.props.referral?.customText3Value ?? ""} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="note">Private Note:</Label>
                                <Input type="textarea" name="privateNote" id="note" onChange={this.props.changeHandler} value={this.props.referral?.note ?? ""} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="publicNote">Public Note:</Label>
                                <Input type="textarea" name="publicNote" id="publicNote" onChange={this.props.changeHandler} value={this.props.referral?.publicNote ?? ""} />
                            </FormGroup>
                            {this.getSubmitSpace()}
                           
                              </Form>
                     </ModalBody>
                     <ModalFooter>
                    
                       
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
export default ReferralModal;