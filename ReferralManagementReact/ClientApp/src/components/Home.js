import React, { Component } from 'react';
import Member from "./Subcomponents/Member"
import Referral from "./Subcomponents/Referral"
import { TabContent, TabPane, Nav, NavItem, NavLink, Row,Container, Button, Col } from "reactstrap";
import classnames from "classnames";

import ReferralStore from "../Stores/ReferralStore"
import Loader from "./Loader";

export class Home extends Component {
    static displayName = Home.name;
    constructor(props) {
        super();
        this.setActiveTab = this.setActiveTab.bind(this);
        this.setReferralsLoaded = this.setReferralsLoaded.bind(this);

        
        

        

        this.state = {
            activeTab: '1',
            referralsLoaded: false
        };

    }


    componentDidMount() {

        ReferralStore.on("referralChange", this.setReferralsLoaded);
    }

    componentWillUnmount() {

        ReferralStore.removeListener("referralChange", this.setReferralsLoaded);
    }

    setReferralsLoaded() {

        this.setState({
            referralsLoaded: true,
            activeTab:'2'
        });
	}

    setActiveTab(tab) {

        this.setState({
            activeTab: tab

        });
    }



    render() {

        let activeTab = this.state.activeTab;
        let referralsTabVisible
        let refClassName;


        const rowStyles =
        {
            marginTop:"1em"
        };




    
        if (this.state.referralsLoaded) {
            referralsTabVisible = { display: "block" };
            refClassName = "tab-fade-in";

        }
        else {
            referralsTabVisible = { display: "none" };
            refClassName = "";
        }


            const toggle = tab => {
                if (activeTab !== tab) this.setActiveTab(tab);
            }
            return (
                <div id="home">
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '1' })} 
                                onClick={() => { toggle('1'); }}>
                                Members
          </NavLink>
                        </NavItem>
                        <NavItem className={refClassName} style={referralsTabVisible}>
                            <NavLink
                                className={classnames({ active: activeTab === '2' })}
                                onClick={() => { toggle('2'); }} >
                                Referrals
          </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">

                           
                            <Row style={rowStyles}>
                                <Col>
                                    <Member/>
                                </Col>
                            </Row>
                        </TabPane>
                                <TabPane tabId="2" >

                            <Row style={rowStyles}>
                                <Col>
                                    <Referral />
                                </Col>
                            </Row>
                        </TabPane>


                    </TabContent>




                   
               </div>


            );
        }
    
}