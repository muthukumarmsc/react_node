import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateCompany } from "../../actions/userActions";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import Select from "react-select";
import keys from "../../actions/config";
const url = keys.baseUrl;
class CompanyagencyUpdateModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.record.id,
            name: this.props.record.name,
            mobileoperatorname: this.props.record.mobile_operator_name,
            address: this.props.record.address,
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.record) {
            this.setState({
                id: nextProps.record.id,
                name: nextProps.record.name,
                mobile_operator_name: nextProps.record.mobile_operator_name,
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
 
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
 handleChange = selectedOption => {
    this.setState({mobileoperatorname : selectedOption.value });
  //  console.log(`Option selected:`, selectedOption );
  };
    onChange = e => {
        if (e.target.id === 'user-update-name') {
            this.setState({ name: e.target.value });
        }
        if (e.target.id === 'user-update-mobile_operator_name') {
            this.setState({ mobile_operator_name: e.target.value });
        }
        if (e.target.id === 'user-update-address') {
            this.setState({ address: e.target.value });
        }
    };

    onUserUpdate = e => {
        e.preventDefault();
        const newCompany = {
            _id: this.state.id,
            name: this.state.name,
            mobileoperatorname: this.state.mobile_operator_name,
            address: this.state.address
        };
        this.props.updateCompany(newCompany);
    };
    render() {
         const { errors } = this.state;
         // const { selectedOption } = this.state.mobileoperatorname;
        return (
            <div>
                <div className="modal fade" id="update-user-modal">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Update Company/Agency</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onUserUpdate} id="update-user">
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.id}
                                        id="user-update-id"
                                        type="text"
                                        className="d-none"/>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="name">Name</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.name}
                                                id="user-update-name"
                                                type="text"
                                                error={errors.name}
                                                className={classnames("form-control", {
                                                    invalid: errors.name
                                                })}/>
                                            <span className="text-danger">{errors.name}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="mobileoperatorname">Mobile Operator Name</label>
                                        </div>
                                        <div className="col-md-9">
                                   
                                             <input
                                                onChange={this.onChange}
                                                value={this.state.mobile_operator_name}
                                                error={errors.mobileoperatorname}
                                                id="user-update-mobile_operator_name"
                                                type="text"
                                                className={classnames("form-control", {
                                                    invalid: errors.mobileoperatorname
                                                })}
                                            />
                                            <span className="text-danger">{errors.mobileoperatorname}</span>
                                        </div>
                                    </div>
                                  <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="userName">address</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.address}
                                                id="user-update-address"
                                                type="text"
                                                error={errors.address}
                                                className={classnames("form-control", {
                                                    invalid: errors.address
                                                })}/>
                                            <span className="text-danger">{errors.address}</span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button
                                    form="update-user"
                                    type="submit"
                                    className="btn btn-primary">
                                    Update User
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

CompanyagencyUpdateModal.propTypes = {
    updateCompany: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { updateCompany }
)(withRouter(CompanyagencyUpdateModal));
