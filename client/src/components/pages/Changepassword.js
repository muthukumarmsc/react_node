import React, { Component, Fragment } from "react";
import Navbar from "../partials/Navbar";
import classnames from "classnames";
import Sidebar from "../partials/Sidebar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList} from "@fortawesome/free-solid-svg-icons/faList";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import { updateChangepassword } from "../../actions/userActions";
import axios from "axios";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer} from "react-toastify";
import keys from "../../actions/config";
import { withRouter } from "react-router-dom";
const url = keys.baseUrl;
class Changepassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id : "",
            oldpassword: "",
            password: "",
            password2: "",
            errors: {},
        };
    }

    componentDidMount() {
       
    };

     componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        if (nextProps.auth !== undefined
            && nextProps.auth.Changepassword !== undefined
            && nextProps.auth.Changepassword.data !== undefined
            && nextProps.auth.Changepassword.data.message !== undefined) {
            toast(nextProps.auth.Changepassword.data.message, {
                position: toast.POSITION.TOP_CENTER
            });
            nextProps.auth.Changepassword = undefined;
        }
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

     onChangepasswordUpdate = e => {
        e.preventDefault();
        const updatechangepassword = {
            _id: this.props.auth.user.id,
            oldpassword: this.state.oldpassword,
            password: this.state.password,
            password2: this.state.password2
        };
        this.props.updateChangepassword(updatechangepassword);
    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <Navbar/>
                <div className="d-flex" id="wrapper">
                    <Sidebar/>
                    <div id="page-content-wrapper">
                        <div className="container-fluid">
                            {/*<button className="btn mt-3" id="menu-toggle"><FontAwesomeIcon icon={faList}/>
                            </button> */}
                            <h3 className="mt-2 text-secondary">Change Password</h3>
                            <form noValidate onSubmit={this.onChangepasswordUpdate} id="update-Changepassword">
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="name">Old Password</label>
                                        </div>
                                        <div className="col-md-6">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.oldpassword}
                                                id="oldpassword"
                                                type="password"
                                                error={errors.oldpassword}
                                                className={classnames("form-control", {
                                                    invalid: errors.oldpassword
                                                })}/>
                                            <span className="text-danger">{errors.oldpassword}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="password">New Password</label>
                                        </div>
                                        <div className="col-md-6">
                                           <input
                                                onChange={this.onChange}
                                                value={this.state.password}
                                                id="password"
                                                type="password"
                                                error={errors.password}
                                                className={classnames("form-control", {
                                                    invalid: errors.password
                                                })}/>
                                            <span className="text-danger">{errors.password}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="password2">Confirm Password</label>
                                        </div>
                                        <div className="col-md-6">
                                        <input
                                                onChange={this.onChange}
                                                value={this.state.password2}
                                                id="password2"
                                                type="password"
                                                error={errors.password2}
                                                className={classnames("form-control", {
                                                    invalid: errors.password2
                                                })}/>
                                            <span className="text-danger">{errors.password2}</span>
                                        </div>
                                    </div>
                                    
                                    
                                </form>
                                    <br />
                                <button
                                    form="update-Changepassword"
                                    type="submit"
                                    className="btn btn-primary">
                                    Update Password
                                </button>
                         </div>
                    </div>
                    <ToastContainer/>
                </div>
            </div>
        );
    }

}

Changepassword.propTypes = {
    updateChangepassword: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { updateChangepassword }
)(withRouter(Changepassword));
