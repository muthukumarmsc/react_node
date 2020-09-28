import React, { Component, Fragment } from "react";
import Navbar from "../partials/Navbar";
import classnames from "classnames";
import Sidebar from "../partials/Sidebar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList} from "@fortawesome/free-solid-svg-icons/faList";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import { updateForgotpassword } from "../../actions/authActions";
import axios from "axios";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer} from "react-toastify";
import keys from "../../actions/config";
import { withRouter } from "react-router-dom";
const url = keys.baseUrl;
class Forgotpassword extends Component {
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
            && nextProps.auth.Forgotpassword !== undefined
            && nextProps.auth.Forgotpassword.data !== undefined
            && nextProps.auth.Forgotpassword.data.message !== undefined) {
            toast(nextProps.auth.Forgotpassword.data.message, {
                position: toast.POSITION.TOP_CENTER
            });
            nextProps.auth.Forgotpassword = undefined;
        }
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

     onChangepasswordUpdate = e => {
        e.preventDefault();
        const updateForgotpassword = {
            _id: this.props.auth.user.id,
            oldpassword: this.state.oldpassword,
            password: this.state.password,
            password2: this.state.password2
        };
        this.props.updateForgotpassword(updateForgotpassword);
    };

    render() {
        const { errors } = this.state;
        return (
            <div className="container">
                <div className="row mt-5">
                    <div className="col-md-4 mx-auto mt-5 card shadow-lg">
                        <div className="card-body p-1">
                       
                            <h2 className="text-center text-primary mt-3">Reset Password</h2>
                            <form noValidate onSubmit={this.onSubmit} className="white">
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
                                                }) }/>
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
                                <br/>
                                <p className="text-center pb-0 mt-2">
                                    <button
                                        type="submit"
                                        className="btn btn-large btn-primary mt-2 px-5">
                                        Forgot
                                    </button>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

Forgotpassword.propTypes = {
    updateForgotpassword: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { updateForgotpassword }
)(withRouter(Forgotpassword));
