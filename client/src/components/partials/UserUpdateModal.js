import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateUser } from "../../actions/userActions";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';
import Select from 'react-select';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import keys from "../../actions/config";
const url = keys.baseUrl;

class UserUpdateModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            _id: "",
            first_name: "",
            last_name:"",
            email: "",
            user_phone_number:"",
            picture:"",
            address:"",
            mapAddress:"",
            country:"",
            balance:"",
            city:"",
            picture:"",
            file: "",
            profile: "",
            profileurl : "",
            errors: {},
        };
         
    
    }

    componentDidMount() {
        this.getData()
    };
    handleChange = (event) => {
      this.setState({
        profileurl: URL.createObjectURL(event.target.files[0]),
        picture: event.target.files[0]
      })
   
    }


    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps : ',nextProps);

        if (nextProps.record.first_name) {
            console.log('nextProps.record  fsgs : ');
            this.setState({
                id: nextProps.record.id,
                first_name: nextProps.record.first_name,
                last_name: nextProps.record.last_name,
                user_phone_number:nextProps.record.user_phone_number,
                address:nextProps.record.address,
                map:nextProps.record.map,
                balance:nextProps.record.balance,
                email: nextProps.record.email,
                city: nextProps.record.city,
                picture:nextProps.record.picture,
            
            })

           
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        if (nextProps.auth !== undefined
            && nextProps.auth.updatenewuser1 !== undefined
            && nextProps.auth.updatenewuser1.data !== undefined
            && nextProps.auth.updatenewuser1.data.message !== undefined
            && nextProps.auth.updatenewuser1.data.success) {
            $('#update-template-modal').modal('hide');
            toast(nextProps.auth.updatenewuser1.data.message, {
                position: toast.POSITION.TOP_CENTER
            });
            nextProps.auth.updatenewuser1 =undefined;
        }
    }
     getData() {
         if (this.props.auth !== undefined && this.props.auth.user !== undefined) {
            const id = this.props.auth.user.id;
            axios
            .get(url+"api/userget/"+id)
            .then(res => {
                console.log(res,'ressdcfdvcfvfv');
                this.setState(res.data);
                
                if(this.state.picture == ""){
                    this.setState({profileurl : keys.baseUrl+"uploads/No_image_available.png"})
                }else{
                    this.setState({profileurl : keys.baseUrl+this.state.picture})
                }
                console.log(this.state.picture,'Profile');
            })
            .catch()
        }
        console.log(this.props.auth);
    }

    onChange = e => {
        
        if (e.target.id === 'user-update-first_name') {
            this.setState({ first_name: e.target.value });
        }
        if (e.target.id === 'user-update-last_name') {
            this.setState({ last_name: e.target.value });
        }
        if (e.target.id === 'user-update-user_phone_number') {
            this.setState({ user_phone_number: e.target.value });
        }
       
        if (e.target.id === 'user-update-city') {
            this.setState({ city: e.target.value });
        }
        
        if (e.target.id === 'user-update-address') {
            this.setState({ address: e.target.value });
        }
        if (e.target.id === 'user-update-map') {
            this.setState({ map: e.target.value });
        }
    
        if (e.target.id === 'user-update-email') {
            this.setState({ email: e.target.value });
        }
        if (e.target.id === 'user-update-balance') {
            this.setState({ balance: e.target.value });
        }
        if (e.target.id === 'user-update-password') {
            this.setState({ password: e.target.value });
        }
          if (e.target.id === 'user-update-picture') {
            this.setState({ picture: e.target.value });
        }
    }; 

    onUserUpdate = e => {

        e.preventDefault();
        const updateUser = {
            _id: this.state.id,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            user_phone_number:this.state.user_phone_number,
            address:this.state.address,
            map:this.state.map,
            balance:this.state.balance,
            city:this.state.city,
            file:this.state.picture,
        };
        const updatenewuser1 = new FormData();
        updatenewuser1.append('first_name', this.state.first_name);
        updatenewuser1.append('last_name', this.state.last_name);
        updatenewuser1.append('email', this.state.email);
        updatenewuser1.append('user_phone_number', this.state.user_phone_number);
        updatenewuser1.append('address', this.state.address);
        updatenewuser1.append('map', this.state.map);
        updatenewuser1.append('city', this.state.city);
        updatenewuser1.append('balance', this.state.balance);
        updatenewuser1.append('file', this.state.picture);
        updatenewuser1.append('_id', this.state.id);
        // this.props.updateUser(updatenewuser1);
        this.props.updateUser(updatenewuser1);
        console.log(updatenewuser1,'data')
    };
    render() {
          const { errors} = this.state;
        return (
            <div>
                <div className="modal fade" id="update-template-modal">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Update User</h4>
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
                                            <label htmlFor="first_name">First Name</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.first_name}
                                                id="user-update-first_name"
                                                type="text"
                                                error={errors.first_name}
                                                className={classnames("form-control", {
                                                    invalid: errors.first_name
                                                })}/>
                                            <span className="text-danger">{errors.first_name}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="last_name">Last Name</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.last_name}
                                                id="user-update-last_name"
                                                type="text"
                                                error={errors.last_name}
                                                className={classnames("form-control", {
                                                    invalid: errors.last_name
                                                })}/>
                                            <span className="text-danger">{errors.last_name}</span>
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
                                                error={errors.email}
                                                id="user-update-email"
                                                type="email"
                                                className={classnames("form-control", {
                                                    invalid: errors.email
                                                })}
                                            />
                                            <span className="text-danger">{errors.email}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="user_phone_number">Business Phone No</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.user_phone_number}
                                                id="user-update-user_phone_number"
                                                type="text"
                                                error={errors.user_phone_number}
                                                className={classnames("form-control", {
                                                    invalid: errors.user_phone_number
                                                })}/>
                                            <span className="text-danger">{errors.user_phone_number}</span>
                                        </div>
                                    </div>

                                   
                                  {/*   <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="password">Password</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                data-reset-input={true}
                                                autoComplete={''}
                                                onChange={this.onChange}
                                                error={errors.password}
                                                id="user-update-password"
                                                type="password"
                                                className={classnames("form-control", {
                                                    invalid: errors.password
                                                })}
                                            />
                                            <span className="text-danger">{errors.password}</span>
                                        </div>
                                    </div>*/}

                                     <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="address">address</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.address}
                                                error={errors.address}
                                                id="user-update-address"
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
                                            <label htmlFor="map">Map address</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.map}
                                                error={errors.map}
                                                id="user-update-map"
                                                type="text"
                                                className={classnames("form-control", {
                                                    invalid: errors.map
                                                })}
                                            />
                                            <span className="text-danger">{errors.map}</span>
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
                                                error={errors.city}
                                                id="user-update-city"
                                                type="text"
                                                className={classnames("form-control", {
                                                    invalid: errors.city
                                                })}
                                            />
                                    <span className="text-danger">{errors.city}</span>
                                    </div>
                                </div>              
                               
                   
                                     <div className="row mt-2">
                                        <div className="col-md-3">
                                        <label htmlFor="balance">Balance</label>
                                        </div>
                                    <div className="col-md-9">
                                       
                                    <input
                                                onChange={this.onChange}
                                                value={this.state.balance}
                                                id="user-update-balance"
                                                type="text"
                                                error={errors.balance}
                                                className={classnames("form-control", {
                                                    invalid: errors.balance
                                                })}/>
                                        <span className="text-danger"> {errors.balance}</span>
                                        </div>
                                       </div>

                                <div className="row mt-2">
                                        <div className="col-md-3">
                                        <label htmlFor="picture">Profile</label>
                                        </div>
                                    <div className="col-md-9">
                                     <input type="file" onChange={this.handleChange}  className={classnames("form-control", {
                                                    invalid: errors.file
                                                })}
                                        />
                                       <img width="100px" src={this.state.profileurl} />
                                    <span className="text-danger">{errors.picture}</span>
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

UserUpdateModal.propTypes = {
    updateUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { updateUser }
)(withRouter(UserUpdateModal));
