import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Navbar from "../partials/Navbar";
import Sidebar from "../partials/Sidebar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList} from "@fortawesome/free-solid-svg-icons/faList";
import {Link} from "react-router-dom";
import {faUserAlt} from "@fortawesome/free-solid-svg-icons/faUserAlt";
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import CanvasJSReact from '../../assets/canvasjs.react';
import { toast, ToastContainer} from "react-toastify";
import '../../css/dashboard.css';
import axios from "axios";
import keys from "../../actions/config";
import $ from 'jquery';

const url = keys.baseUrl;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 

class Dashboard extends Component {
 constructor(props) {
        super(props);

        this.state = {
            currentRecord: {
                records: [],
                id: '',
                userName: '',
                mobileoperatorname: '',
                status:'',
                address: '',
                lockVal: '',
                modalshow: false,
                modalshow1: false,
                responsive: true,
                totalusers:[],
               
            }
        };

        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.getData()
       
    };

 componentWillReceiveProps(nextProps) {
        if (nextProps.record) {
            this.setState({
                id: nextProps.record.id,
                userName: nextProps.record.userName,
                mobileoperatorname: nextProps.record.mobileoperatorname,
                address:nextProps.record.address,
            })
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }

        if (nextProps.auth !== undefined
            && nextProps.auth.updatenewuser !== undefined
            && nextProps.auth.updatenewuser.data !== undefined
            && nextProps.auth.updatenewuser.data.message !== undefined
            && nextProps.auth.updatenewuser.data.success) {
            $('#update-user-modal').modal('hide');
            toast(nextProps.auth.updatenewuser.data.message, {
                position: toast.POSITION.TOP_CENTER
            });
            nextProps.auth.updatenewuser = "";
        }
    }
    getData() {
        axios
            .post(url+"api/user-data")
            .then(res => {
                this.setState({ totalusers: res.data.length}); 
                       var activecount=0;
                    res.data.map((item,i)=>{
                            if(item.status==1){
                            activecount=activecount+1;
                        
                             } 
                        });
                     var deactivecount=0;
                        res.data.map((item,i)=>{
                            if(item.status==0){
                            deactivecount=deactivecount+1;
                        
                             } 
                        });
                this.setState({ activecount: activecount});
                this.setState({ deactivecount: deactivecount});
            })
            .catch()
    }
     
handleChange = selectedOption => {
    this.setState({ userName: selectedOption.value });
    //  console.log(`Option selected:`, selectedOption );
   
  };
    render() { 
        
        const useroptions = {
            exportEnabled: true,
            animationEnabled: true,

            data: [{
                type: "pie",
                startAngle: 20,
                toolTipContent: "<b>{label}</b>: {y}%",
                showInLegend: "true",
                legendText  :  "{label}",
                indexLabelFontSize: 16,
                indexLabel: "{label} - {y}%",
                dataPoints: [
                    { y: this.state.totalusers,label: "Total users" },
                    { y: this.state.activecount, label: "Active users" },
                    { y: this.state.deactivecount,label: "Deactive users" },
                   
                ]
            }]
        }
        const subscribtionoptions = {
            exportEnabled: true,
            animationEnabled: true,

            data: [{
                type: "pie",
                startAngle: 20,
                toolTipContent: "<b>{label}</b>: {y}%",
                showInLegend: "true",
                legendText  :  "{label}",
                indexLabelFontSize: 16,
                indexLabel: "{label} - {y}%",
                dataPoints: [
                    { y: this.state.totalusers,label: "Most purchased subscriptions" },
                  
                   
                ]
            }]
        }
        
        return (
            <div>
                <Navbar/>
                <div className="d-flex" id="wrapper">
                    <Sidebar/>
                    <div id="page-content-wrapper">
                        <div className="container-fluid">
                            <h3 className="mt-2 text-secondary">Dashboard</h3>
                            <div className="row px-0 px-md-2">
                             
                                <div className="col-sm-4 p-sm-1 mb-4 mb-sm-0">
                                    <div className="card text-white shadow-lg" style={{backgroundColor : "cornflowerblue"}}>
                                        <div className="card-body">
                                            <h5 className="card-title">Users</h5>
                                            <CanvasJSChart options = {useroptions}/>
                                        </div>
                                    </div>
                                </div>

                            {/*  <div className="col-sm-3 p-sm-2 mb-4 mb-sm-0">
                                    <div className="card text-white shadow-lg" style={{backgroundColor : "cornflowerblue"}}>
                                        <div className="card-body">
                                            <h5 className="card-title">Transaction </h5>
                                             <p className="card-text">With supporting text below as a natural lead-in to
                                                additional content.</p> 
                                            <Link to="/transaction" className="btn btn-light"><FontAwesomeIcon className="text-primary" icon={faUserAlt}/> Go to Transaction</Link>
                                        </div>
                                    </div>
                                </div>*/}
                                {/* <div className="col-sm-3 p-sm-2 mb-4 mb-sm-0">
                                    <div className="card text-white shadow-lg" style={{backgroundColor : "cornflowerblue"}}>
                                        <div className="card-body">
                                            <h5 className="card-title">Company / Agency </h5>
                                            <p className="card-text">With supporting text below as a natural lead-in to
                                                additional content.</p> 
                                            <Link to="/company" className="btn btn-light"><FontAwesomeIcon className="text-primary" icon={faUserAlt}/> Go to Company/Agency</Link>
                                        </div>
                                    </div>
                                </div>*/}
                              {/*     <div className="col-sm-4 p-sm-2 mb-4 mb-sm-0">
                                    <div className="card text-white shadow-lg" style={{backgroundColor : "cornflowerblue"}}>
                                        <div className="card-body">
                                            <h5 className="card-title">Subscription</h5>
                                            <CanvasJSChart options = {subscribtionoptions}/>
                                            
                                        </div>
                                    </div>
                                </div>*/} 
                             {/*    <div className="col-sm-3 p-sm-2 mb-4 mb-sm-0">
                                    <div className="card text-white shadow-lg" style={{backgroundColor : "cornflowerblue"}}>
                                        <div className="card-body">
                                            <h5 className="card-title">Sponsorship</h5>
                                            <p className="card-text">With supporting text below as a natural lead-in to
                                                additional content.</p>  
                                            <Link to="/sponsorship" className="btn btn-light"><FontAwesomeIcon className="text-primary" icon={faUserAlt}/> Go to Sponsorship</Link>
                                        </div>
                                    </div>
                                </div>*/}
                              {/*   <div className="col-sm-3 p-sm-2 mb-4 mb-sm-0">
                                    <div className="card text-white shadow-lg" style={{backgroundColor : "cornflowerblue"}}>
                                        <div className="card-body">
                                            <h5 className="card-title">Advertisement</h5>
                                            <p className="card-text">With supporting text below as a natural lead-in to
                                                additional content.</p> 
                                            <Link to="/advertisement" className="btn btn-light"><FontAwesomeIcon className="text-primary" icon={faUserAlt}/> Go to Advertisement</Link>
                                        </div>
                                    </div>
                                </div> */}
                               {/* <div className="col-sm-3 p-sm-2 mb-4 mb-sm-0">
                                    <div className="card text-white shadow-lg" style={{backgroundColor : "cornflowerblue"}}>
                                        <div className="card-body">
                                            <h5 className="card-title">Help Desk</h5>
                                             <p className="card-text">With supporting text below as a natural lead-in to
                                                additional content.</p>  
                                            <Link to="/helpdesk" className="btn btn-light"><FontAwesomeIcon className="text-primary" icon={faUserAlt}/> Go to Help Desk</Link>
                                        </div>
                                    </div>
                                </div>*/}

                                {/* <div className="col-sm-3 p-sm-2">
                                    <div className="card bg-primary text-white shadow-lg">
                                        <div className="card-body">
                                            <h5 className="card-title">Trade Pair</h5>
                                            <p className="card-text">Coming Soon
                                            
                                            </p>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                            
                        </div>
                        
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Dashboard);
