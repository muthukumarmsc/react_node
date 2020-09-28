import React, { Component, Fragment } from "react";
import Navbar from "../partials/Navbar";
import classnames from "classnames";
import Sidebar from "../partials/Sidebar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList} from "@fortawesome/free-solid-svg-icons/faList";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import { updateProfile } from "../../actions/userActions";
import axios from "axios";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer} from "react-toastify";
import keys from "../../actions/config";
import { withRouter } from "react-router-dom";
const url = keys.baseUrl;
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id : "",
            first_name: "",
            last_name: "",
            email: "",
            file: "",
            picture: "",
            user_phone_number:"",
            profile: "",
            profileurl : "",
            errors: {},
        };
    }

    componentDidMount() {
        this.getData()
    };

     componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        if (nextProps.auth !== undefined
            && nextProps.auth.profile !== undefined
            && nextProps.auth.profile.data !== undefined
            && nextProps.auth.profile.data.message !== undefined) {
            toast(nextProps.auth.profile.data.message, {
                position: toast.POSITION.TOP_CENTER
            });
            nextProps.auth.profile = undefined;
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

    handleChange = (event) => {
      this.setState({
        profileurl: URL.createObjectURL(event.target.files[0]),
        picture: event.target.files[0]
      })
   
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

     onProfileUpdate = e => {
        e.preventDefault();
        console.log(this.state.profile,'profile')
        const updateprofile1 = {
            _id: this.state.id,
            first_name: this.state.first_name,
            last_name:this.state.last_name,
            email: this.state.email,
            user_phone_number: this.state.user_phone_number,
            picture: this.state.picture
        };
        const data = new FormData();
        data.append('first_name', this.state.first_name);
        data.append('last_name', this.state.last_name);
        data.append('email', this.state.email);
        data.append('user_phone_number', this.state.user_phone_number);
        data.append('file', this.state.picture);
        data.append('_id', this.state.id);
        this.props.updateProfile(data);
        console.log(updateProfile,'updateProfile')
        // axios.post(url+"api/profileupload", data, { // receive two parameter endpoint url ,form data 
        // })
        // .then(res => { // then print response status
        //     console.log(res.statusText)
        // })

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
                          {/*   <button className="btn mt-3" id="menu-toggle"><FontAwesomeIcon icon={faList}/>
                            </button>*/}
                            <h3 className="mt-2 text-secondary">Edit Profile</h3>
                            <form noValidate onSubmit={this.onProfileUpdate} id="update-profile">
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="name">First Name</label>
                                        </div>
                                        <div className="col-md-6">
                                            
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.first_name}
                                                id="first_name"
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
                                            <label htmlFor="name">Last Name</label>
                                        </div>
                                        <div className="col-md-6">
                                            
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.last_name}
                                                id="last_name"
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
                                        <div className="col-md-6">
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
                                            <label htmlFor="user_phone_number">Business Phone Number</label>
                                        </div>
                                        <div className="col-md-6">
                                             <input
                                                onChange={this.onChange}
                                                value={this.state.user_phone_number}
                                                id="user_phone_number"
                                                type="text"
                                                error={errors.user_phone_number}
                                                className={classnames("form-control", {
                                                    invalid: errors.user_phone_number
                                                })}/>
                                            <span className="text-danger">{errors.user_phone_number}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                        <br/>
                                        <label htmlFor="picture">Profile Image</label>
                                        </div>
                                        <div className="col-md-6">
                                        <input type="file" onChange={this.handleChange}
                                        />
                                        <img width="100px" src={this.state.profileurl} />
                                        
                                        </div>
                                    </div>
                                </form>
                                    <br />
                                <button
                                    form="update-profile"
                                    type="submit"
                                    className="btn btn-primary">
                                    Update Profile
                                </button>
                         </div>
                    </div>
                    <ToastContainer/>
                </div>
            </div>
        );
    }

}

Profile.propTypes = {
    updateProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { updateProfile }
)(withRouter(Profile));
