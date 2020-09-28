import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { resetUser } from "../../actions/authActions";
import classnames from "classnames";
import { toast } from 'react-toastify';
import $ from 'jquery';
import keys from "../../actions/config";
const url = keys.baseUrl;

class Resetpassword extends Component {
    constructor() {
        super();
        this.state = {
            _id : "",
            password: "",
            password1: "",
            errors: {}
        };
    }

  componentDidMount() {
      
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    componentWillReceiveProps(nextProps) {
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
            $('#update-template-modal').modal('hide');
            toast(nextProps.auth.updatenewuser.data.message, {
                position: toast.POSITION.TOP_CENTER
            });
            nextProps.auth.updatenewuser = "";
               this.props.history.push("/login");
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const userData = {
            _id: this.props.match.params.id,
            password: this.state.password,
            password1: this.state.password1
        };
       console.log(userData,'dsajkdjiewrwurio')
        this.props.resetUser(userData);

    };

    render() {
        const { errors } = this.state;
        return (
            <div className="container">
                <div className="row mt-5">
                    <div className="col-md-4 mx-auto mt-5 card shadow-lg">
                        <div className="card-body p-1">
                        
                            <h2 className="text-center text-primary mt-3">Reset password</h2>
                            <form noValidate onSubmit={this.onSubmit} className="white">
                                <label htmlFor="password">New Password</label>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    error={errors.password}
                                    id="password"
                                    type="password"
                                    className={classnames("form-control", {
                                        invalid: errors.password
                                    })}
                                />
                                <span className="text-danger">{errors.password}</span>
                                <br/>
                                <label htmlFor="password1">Confirm Password</label>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password1}
                                    error={errors.password1}
                                    id="password1"
                                    type="password"
                                    className={classnames("form-control", {
                                        invalid: errors.password1
                                    })}
                                />
                                <span className="text-danger">{errors.password1}</span>
                                <p className="text-center pb-0 mt-2">
                                    <button
                                        type="submit"
                                        className="btn btn-large btn-primary mt-2 px-5">
                                       Update Password
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

Resetpassword.propTypes = {
    resetUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
    { resetUser }
)(Resetpassword);
