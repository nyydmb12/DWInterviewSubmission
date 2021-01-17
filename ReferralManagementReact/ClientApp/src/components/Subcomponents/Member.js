import React, { Component } from 'react';
import MembersTable from "./MembersTable"
import * as MemberActions from "../../Actions/MemberAction"
import ReferralStore from "../../Stores/ReferralStore"
import MemberStore from "../../Stores/MemberStore"
import MemberSearchBar from "./MemberSearchBar"
import { Row, Col } from "reactstrap";
import referralStore from '../../Stores/ReferralStore';

export default class Member extends Component {
    constructor(props) {
        super();
        this.getMembers = this.getMembers.bind(this);
        this.handleRefChange = this.handleRefChange.bind(this);
        this.getReferralKey = this.getReferralKey.bind(this);
        
        this.state = {
            members: [],
            referrals: [],
            render: false,
            referralStoreKey: null,
            memberStoreKey:null
        };

    }


    componentDidMount() {

        ReferralStore.on("referralChange", this.getReferralKey);
        MemberStore.on("memberChange", this.getMembers);
        ReferralStore.on("referralDeleteSuccess", this.handleRefChange);
        ReferralStore.on("referralPostSuccess", this.handleRefChange);

        MemberActions.UpdateQuery("programId", "48bbaa6d-b077-47ef-8dc1-10f2f9d5c49c");
    }

    componentWillUnmount() {


        ReferralStore.removeListener("referralChange", this.getReferralKey);
        MemberStore.removeListener("memberChange", this.getMembers);
        ReferralStore.removeListener("referralDeleteSuccess", this.handleRefChange);
        ReferralStore.removeListener("referralPostSuccess", this.handleRefChange);

    }

    getReferralKey()
    {
    this.setState({
        referralStoreKey: ReferralStore.referralStoreKey

    });
}


   //called when members load
    getMembers() {
        ReferralStore.tablePageIndex = 0;
        this.setState({
            members: MemberStore.getMembers(),
            memberStoreKey: MemberStore.memberStoreKey
        });
    }
    //update view when refrrals count changes
    handleRefChange() {

       
        MemberActions.LoadMembers();

	}



    homePopulateMember() {
   
        MemberActions.LoadMembers();

 
      

    }


    render() {

        const rowStyles =
        {
            marginTop: "1em"
        };



            return (
                <div>
                
                    <Row style={rowStyles}>
                                <Col>
                            <MemberSearchBar />
                            <MembersTable key={this.state.memberStoreKey + this.state.referralStoreKey} data={this.state.members} populateHandler={this.homePopulateMember} />
                                </Col>
                            </Row>
                      
               </div>


            );
        }
    
}