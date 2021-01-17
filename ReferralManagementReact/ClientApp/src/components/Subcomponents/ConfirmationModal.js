import React, { Component  } from 'react';
import { Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert, Form, FormGroup  } from 'reactstrap';


//This componenet will be used for Create, Update, Delete Operations
export class ConfirmationModal extends Component {
    workingReferral
    constructor(props) {
        super();
  
    }




    render() {

        const modalStyle = {
            position: "absolute",
            left: "50%",
            top: "50%",
            marginLeft: "-150px",
        marginTop: "-150px"
        };

        return (
      
            <div >
              
                <Modal style={ modalStyle } isOpen={this.props.isOpen} modalTransition={{ timeout: 350 }} backdropTransition={{ timeout: 700 }}
                    toggle={this.props.clickHandler}>
                    <ModalHeader toggle={this.props.clickHandler}>Confirm {this.props.action}</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.props.submitHandler}>
                          
                            <FormGroup>
                                <p>Are you sure you would like to delete {this.props.referralName}?</p>
                                <Button color="danger" type="submit">Delete</Button>
                                <Button color="secondary" onClick={this.props.clickHandler}>Cancel</Button>
                            </FormGroup>
                         
                           
                              </Form>
                     </ModalBody>
                     <ModalFooter>
                    
                       
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
export default ConfirmationModal;