import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addUser } from "../../actions/userActions";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import Select from "react-select";
import keys from "../../actions/config";
const url = keys.baseUrl;
class UserAddModal extends React.Component {

    constructor() {
        super();
        this.state = {
                firstname: "",
                lastname: "",
                businessPhoneNumber:"",
                email:"",
                address:"",
                mapAddress:"",
                city:"",
                balance:"",
                image: '',
                errors: {},
            
        };
        
    }
    componentDidMount() {
      // this.getData();
     
       }
 handleChange = (event) => {
console.log("in habdle chaneg");
      this.setState({     
        image: event.target.files[0]
      })

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


  
   
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onUserAdd = e => {
       
        e.preventDefault();
        const User = {
            firstname: this.state.firstname,
            lastname:this.state.lastname,
            email:this.state.email,
            businessPhoneNumber:this.state.businessPhoneNumber,
            address:this.state.address,
            mapAddress:this.state.mapAddress,
            city:this.state.city,
            balance:this.state.balance,
            image:this.state.image,
            
        };
         const newUser = new FormData();
        newUser.append('firstname', this.state.firstname);
        newUser.append('lastname', this.state.lastname);
        newUser.append('email', this.state.email);
        newUser.append('businessPhoneNumber', this.state.businessPhoneNumber);
        newUser.append('address', this.state.address);
        newUser.append('mapAddress', this.state.mapAddress);
        newUser.append('city', this.state.city);
        newUser.append('balance', this.state.balance);
        newUser.append('file', this.state.image);
    
        this.props.addUser(newUser, this.props.history);
    };

    render() {
        const { errors } = this.state;
 
        return (
            <div>
                <div className="modal fade" id="add-user-modal" data-reset="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Add User</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this. onUserAdd} id="add-user">
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="firstname">First name</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.firstname}
                                                id="firstname"
                                                type="text"
                                                error={errors.firstname}
                                                className={classnames("form-control", {
                                                    invalid: errors.firstname
                                                })}/>
                                            <span className="text-danger">{errors.firstname}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="lastname">Last name</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.lastname}
                                                id="lastname"
                                                type="text"
                                                error={errors.lastname}
                                                className={classnames("form-control", {
                                                    invalid: errors.lastname
                                                })}/>
                                            <span className="text-danger">{errors.lastname}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="email">Email</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.email}
                                                id="email"
                                                type="text"
                                                error={errors.email}
                                                className={classnames("form-control", {
                                                    invalid: errors.email
                                                })}/>
                                            <span className="text-danger">{errors.email}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="businessPhoneNumber">Business Phone No</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.businessPhoneNumber}
                                                error={errors.businessPhoneNumber}
                                                id="businessPhoneNumber"
                                                type="text"
                                                className={classnames("form-control", {
                                                    invalid: errors.businessPhoneNumber
                                                })}
                                            />
                                            <span className="text-danger">{errors.businessPhoneNumber}</span>
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
                                      <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="mapAddress">Map address</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.mapAddress}
                                                error={errors.mapAddress}
                                                id="mapAddress"
                                                type="text"
                                                className={classnames("form-control", {
                                                    invalid: errors.mapAddress
                                                })}
                                            />
                                            <span className="text-danger">{errors.mapAddress}</span>
                                        </div>
                                    </div>
                                 
                                   <div className="row mt-2">
                                        <div className="col-md-3">
                                        <label htmlFor="first_currency">City</label>
                                        </div>
                                    <div className="col-md-9">
                                   
                                     <input
                                                onChange={this.onChange}
                                                value={this.state.city}
                                                id="city"
                                                type="text"
                                                error={errors.city}
                                                className={classnames("form-control", {
                                                    invalid: errors.city
                                                })}/>
                                 
                      <span className="text-danger">
                        {errors.city}
                      </span>
                    </div>
                  </div>
                               
                                 <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="image">Image</label>
                                        </div>
                                        <div className="col-md-9">
                                        <input 
                                            type="file" 
                                            id="image" 
                                            onChange={this.handleChange}
                                            name="image" 
                                                className={classnames("form-control",{
                                                    invalid: errors.image
                                                })}/>
                                          
                                            <span className="text-danger">{errors.image}</span>
                                        </div>
                                    </div>

                                     <div className="row mt-2">
                                        <div className="col-md-3">
                                        <label htmlFor="first_currency">Balance</label>
                                        </div>
                                    <div className="col-md-9">
                                    
                                  <input
                                                onChange={this.onChange}
                                                value={this.state.balance}
                                                id="balance"
                                                type="text"
                                                error={errors.balance}
                                                className={classnames("form-control", {
                                                    invalid: errors.balance
                                                })}/>
                      <span className="text-danger">
                        {errors.balance}
                      </span>
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

UserAddModal.propTypes = {
    addUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};


const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { addUser }
)(withRouter(UserAddModal));
