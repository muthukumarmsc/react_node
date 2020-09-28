import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateSubscription } from "../../actions/userActions";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import Select from "react-select";
import keys from "../../actions/config";
const url = keys.baseUrl;
class SubscriptionUpdateModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.record.id,
            name: this.props.record.name,
            categoryname: this.props.record.category_name,
            price: this.props.record.amount,
            duration:this.props.record.duration,
            features:this.props.record.features,
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.record) {
            this.setState({
                id: nextProps.record.id,
                name: nextProps.record.name,
                category_name: nextProps.record.category_name,
                amount:nextProps.record.amount,
                duration:nextProps.record.duration,
                features:nextProps.record.features,
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
  };
    onChange = e => {
        if (e.target.id === 'user-update-name') {
            this.setState({ name: e.target.value });
        }
        if (e.target.id === 'user-update-category_name') {
            this.setState({ category_name: e.target.value });
        }
        if (e.target.id === 'user-update-amount') {
            this.setState({ amount: e.target.value });
        }
        if (e.target.id === 'user-update-duration') {
            this.setState({ duration: e.target.value });
        }
        if (e.target.id === 'user-update-features') {
            this.setState({ features: e.target.value });
        }
    };

    onUserUpdate = e => {
        e.preventDefault();
        const newSubscription = {
            _id: this.state.id,
            name: this.state.name,
            categoryname: this.state.category_name,
            price: this.state.amount,
            duration:this.state.duration,
            features:this.state.features,
        };
        this.props.updateSubscription(newSubscription);
    };
    render() {
         const { errors } = this.state;
      
        return (
            <div>
                <div className="modal fade" id="update-user-modal">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Update Subscription </h4>
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
                                            <label htmlFor="category_name">Category name</label>
                                        </div>
                                        <div className="col-md-9">
                                    
                                             <input
                                                onChange={this.onChange}
                                                value={this.state.category_name}
                                                error={errors.categoryname}
                                                id="user-update-category_name"
                                                type="text"
                                                className={classnames("form-control", {
                                                    invalid: errors.categoryname
                                                })}
                                            />
                                            <span className="text-danger">{errors.categoryname}</span>
                                        </div>
                                    </div>
                                  <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="amount">Price</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.amount}
                                                id="user-update-amount"
                                                type="text"
                                                error={errors.price}
                                                className={classnames("form-control", {
                                                    invalid: errors.price
                                                })}/>
                                            <span className="text-danger">{errors.price}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="duration">Duration</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.duration}
                                                id="user-update-duration"
                                                type="text"
                                                error={errors.duration}
                                                className={classnames("form-control", {
                                                    invalid: errors.duration
                                                })}/>
                                            <span className="text-danger">{errors.duration}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="features">Features</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.features}
                                                id="user-update-features"
                                                type="text"
                                                error={errors.features}
                                                className={classnames("form-control", {
                                                    invalid: errors.features
                                                })}/>
                                            <span className="text-danger">{errors.features}</span>
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

SubscriptionUpdateModal.propTypes = {
    updateSubscription: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { updateSubscription }
)(withRouter(SubscriptionUpdateModal));
