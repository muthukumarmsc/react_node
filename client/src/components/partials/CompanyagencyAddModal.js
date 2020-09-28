    import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addCompany } from "../../actions/userActions";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from "axios";
import $ from 'jquery';
import Select from "react-select";
import 'react-toastify/dist/ReactToastify.css';
import keys from "../../actions/config";
const url = keys.baseUrl;
class CompanyagencyAddModal extends React.Component {

    constructor() {
        super();
        this.state = {
            name: "",
            mobileoperatorname:"",
            address:"",
            errors: {},
        };
    }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
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

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onUserAdd = e => {
        e.preventDefault();
        const newCompany = {
            name: this.state.name,
            mobileoperatorname:this.state.mobileoperatorname,
            address: this.state.address,
             
        };
        console.log(newCompany)
        this.props.addCompany(newCompany, this.props.history);
    };

    render() {
        const { errors } = this.state;
           
        return (
            <div>
                <div className="modal fade" id="add-user-modal" data-reset="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Add Company /Agency</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onUserAdd} id="add-user">
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="name">Name</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.name}
                                                id="name"
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
                      <label htmlFor="first_currency">Mobile operator Name</label>
                    </div>
                    <div className="col-md-9">
                     <input
                                                onChange={this.onChange}
                                                value={this.state.mobileoperatorname}
                                                id="mobileoperatorname"
                                                type="text"
                                                error={errors.mobileoperatorname}
                                                className={classnames("form-control", {
                                                    invalid: errors.mobileoperatorname
                                                })}/>
                      <span className="text-danger">
                        {errors.mobileoperatorname}
                      </span>
                    </div>
                  </div>
                                  
                                      <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="address">Address</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.address}
                                                error={errors.address}
                                                id="address"
                                                type="text"
                                                className={classnames("form-control", {
                                                    invalid: errors.address
                                                })}
                                            />
                                            <span className="text-danger">{errors.address}</span>
                                        </div>
                                    </div>
                                      
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button
                                    form="add-user"
                                    type="submit"
                                    className="btn btn-primary">
                                    Add 
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

CompanyagencyAddModal.propTypes = {
    addCompany: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};


const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { addCompany }
)(withRouter(CompanyagencyAddModal));
