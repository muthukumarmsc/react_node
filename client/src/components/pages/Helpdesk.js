import React, {useState,Component, Fragment } from "react";
import classnames from "classnames";
import Select from "react-select";
import Navbar from "../partials/Navbar";
import Sidebar from "../partials/Sidebar";
import { addHelpdesk } from "../../actions/userActions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList} from "@fortawesome/free-solid-svg-icons/faList";
import ReactDatatable from '@ashvin27/react-datatable';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import axios from "axios";
import $ from 'jquery';
import { withRouter } from "react-router-dom";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import UserAddModal from "../partials/UserAddModal";
import UserUpdateModal from "../partials/UserUpdateModal";
import { toast, ToastContainer} from "react-toastify";
import keys from "../../actions/config";
import CsvDownloader from 'react-csv-downloader';
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import {Modal,Button} from 'react-bootstrap/';
import Logo from "../../Logo-small.png"
import easysoft from "../../EasyLogo-FinalLogo.jpg";
const url = keys.baseUrl;

class Helpdesk extends Component {
constructor() {
        super();
        this.state = {
            _id : "",
            username: "",
            email:"",
            account:"",
            Query_generated:"",
            errors: {},
            
        };
    }

    componentDidMount() {
           this.getData();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        if (nextProps.auth !== undefined
            && nextProps.auth.newuser !== undefined
            && nextProps.auth.newuser.data !== undefined
            && nextProps.auth.newuser.data.message !== undefined) {
            $('#add-user-modal').modal('hide');
            toast(nextProps.auth.newuser.data.message, {
                position: toast.POSITION.TOP_CENTER
            });
            nextProps.auth.newuser = undefined;
        }
    }

    getData() {
        // alert('hi')
         if (this.props.auth !== undefined && this.props.auth.user !== undefined) {
            const id = this.props.auth.user.id;
            axios
            .get(url+"api/userget/"+id)
            .then(res => {
                console.log(res,'helpdesk');
                this.setState(res.data);
            })
            .catch()
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onUserAdd1 = e => {

        e.preventDefault();
        const newUser = {
             _id: this.state.id,
            username: this.state.username,
            email:this.state.email,
            account: this.state.account,
            Query_generated:this.state.Query_generated,
        };
      
        this.props.addHelpdesk(newUser, this.props.history);
    };

    render() {
             const { errors }= this.state;
        return (
            <div>
                <Navbar/>
                <div className="d-flex" id="wrapper">
                    <Sidebar/>
                    <div id="page-content-wrapper">
                        <div className="container-fluid">
                            <h3 className="mt-2 text-secondary">Help Desk</h3><br/>
                            <form noValidate onSubmit={this.onUserAdd1} id="update-Changepassword">
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="username">User Name</label>
                                        </div>
                                        <div className="col-md-6">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.username}
                                                id="username"
                                                type="text"
                                                error={errors.username}
                                                className={classnames("form-control", {
                                                    invalid: errors.username
                                                })}/>
                                            <span className="text-danger">{errors.username}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="email">Email ID</label>
                                        </div>
                                        <div className="col-md-6">
                                           <input
                                                onChange={this.onChange}
                                                value={this.state.email}
                                                id="email"
                                                type="email"
                                                error={errors.email}
                                                className={classnames("form-control", {
                                                    invalid: errors.email
                                                })}/>
                                            <span className="text-danger">{errors.email}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="User_type">User Type</label>
                                        </div>
                                        <div className="col-md-6">
                                        <input
                                                onChange={this.onChange}
                                                value={this.state.account}
                                                id="account"
                                                type="text"
                                                error={errors.account}
                                                className={classnames("form-control", {
                                                    invalid: errors.account
                                                })}/>
                                            <span className="text-danger">{errors.account}</span>
                                        </div>
                                    </div>
                                     <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="Query_generated">Query Generated</label>
                                        </div>
                                        <div className="col-md-6">
                                        <input
                                                onChange={this.onChange}
                                                value={this.state.Query_generated}
                                                id="Query_generated"
                                                type="text"
                                                error={errors.Query_generated} 
                                                className={classnames("form-control", {
                                                    invalid: errors.Query_generated
                                                })}/ >
                                            <span className="text-danger">{errors.Query_generated}</span>
                                        </div>
                                    </div>
                                    
                                </form>
                                    <br />
                                <button
                                    form="update-Changepassword"
                                    type="submit"
                                    className="btn btn-primary " >
                                    Submit
                                </button>
                         </div>
                    </div>
                    <ToastContainer/>
                </div>
            </div>
        )
    }
}


Helpdesk.propTypes = {
    addHelpdesk: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    records: state.records
});

export default connect(
    mapStateToProps,
    { addHelpdesk }
)(withRouter(Helpdesk));