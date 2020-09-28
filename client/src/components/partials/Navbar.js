import React, { Component } from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import {connect} from "react-redux";
import {logoutUser} from "../../actions/authActions";
import { Link } from "react-router-dom";
import keys from "../../actions/config";
import {faList} from "@fortawesome/free-solid-svg-icons/faList";
import Logo from "../../Logo-small.png"
import easysoft from "../../EasyLogo-FinalLogo.jpg";
const url = keys.baseUrl;
class Navbar extends Component {

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        const { user } = this.props.auth;
      
        return (
            <div className="container-fluid p-0">
                  
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark adminNav">
                <a href="/dashboard">  <img className="easysoft" src={easysoft} width="5%" height="5%"/></a>
                    {/* <a className="navbar-brand" href="/"> 
                        <img src={url+"statics/cms_images/logo.png"} />
                    </a> */}
                   
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="settings"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Settings
                                </a>
                                <div className="dropdown-menu" aria-labelledby="settings">
                                     <Link to="/profile">
                                       Profile
                                     </Link>
                                    <Link to="/changepassword">
                                       Change Password
                                     </Link>
                                    {/*  <Link to="/settings">
                                       Settings
                                     </Link>*/}


                                    
                                </div>
                            </li>
                            <li className="nav-item active">
                                <a className="nav-link" href="#" onClick={this.onLogoutClick}>Logout ({user.name}) <FontAwesomeIcon icon={faSignOutAlt} /> </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Navbar);
