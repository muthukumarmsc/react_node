    import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addSubscription } from "../../actions/userActions";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from "axios";
import $ from 'jquery';
import Select from "react-select";
import 'react-toastify/dist/ReactToastify.css';
import keys from "../../actions/config";
const url = keys.baseUrl;
class SubscriptionAddModal extends React.Component {

    constructor() {
        super();
        this.state = {
            name: "",
            categoryname:"",
            price:"",
            duration:"",
            features:"",
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
        const newSubscription = {
            name: this.state.name,
            categoryname:this.state.categoryname,
            price: this.state.price,
            duration:this.state.duration,
            features:this.state.features,
        };
        console.log(newSubscription);
        this.props.addSubscription(newSubscription, this.props.history);
    };

    render() {
        const { errors } = this.state;
           
        return (
            <div>
                <div className="modal fade" id="add-user-modal" data-reset="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Add New Plans</h4>
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
                                     <label htmlFor="categoryname">Category Name</label>
                                         </div>
                                    <div className="col-md-9">
                                        <input
                                                onChange={this.onChange}
                                                value={this.state.categoryname}
                                                id="categoryname"
                                                type="text"
                                                error={errors.categoryname}
                                                className={classnames("form-control", {
                                                    invalid: errors.categoryname
                                                })}/>
                                         <span className="text-danger"> {errors.categoryname}</span>
                                     </div>
                                    </div>
                                  
                                      <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="price">Price</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.price}
                                                error={errors.price}
                                                id="price"
                                                type="text"
                                                className={classnames("form-control", {
                                                    invalid: errors.price
                                                })}
                                            />
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
                                                error={errors.duration}
                                                id="duration"
                                                type="text"
                                                className={classnames("form-control", {
                                                    invalid: errors.duration
                                                })}
                                            />
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
                                                error={errors.features}
                                                id="features"
                                                type="text"
                                                className={classnames("form-control", {
                                                    invalid: errors.features
                                                })}
                                            />
                                            <span className="text-danger">{errors.features}</span>
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

SubscriptionAddModal.propTypes = {
    addSubscription: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};


const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { addSubscription }
)(withRouter(SubscriptionAddModal));
