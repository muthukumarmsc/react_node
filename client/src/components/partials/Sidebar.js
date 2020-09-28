import React, { Component } from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import {connect} from "react-redux";
import {logoutUser} from "../../actions/authActions";
import {Link} from "react-router-dom";
import {faList} from "@fortawesome/free-solid-svg-icons/faList";

class Sidebar extends Component {
    constructor(props) {
        super(props);
    this.state = {
        show:(window.innerWidth>768)?true:false
    }
}
onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
};

componentDidMount() {
    window.addEventListener("resize", this.changestate);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.changestate);
  }

    changestate= e => {
        this.setState({show:(this.state.show)?false:true});
    }

    render() {
        const { user } = this.props.auth.user;
        console.log(this.props.auth.user,'fsdlfsdlkfjsldkjflskdjflsdf');
        return (
            <div>
          {/*   <button className="btn" onClick={this.changestate} id="menu-toggle"><FontAwesomeIcon icon={faList}/></button>*/}
            { this.state.show?
            <div className="border-right h-100" >

                <div className="list-group list-group-flush">
                    {
                    (this.props.auth.user.moderator=='1')?
                    <div>
                        <Link to="/users" className="list-group-item list-group-item-action">Users</Link>
                        <Link to="/chat" className="list-group-item list-group-item-action">Chat</Link>  
                    </div> :
                    <div>
                        <Link to="/dashboard" className="list-group-item list-group-item-action">Dashboard</Link>
                        <Link to="/users" className="list-group-item list-group-item-action">Users</Link>
                         <Link to="/transaction" className="list-group-item list-group-item-action">Transaction</Link>
                        <Link to="/company" className="list-group-item list-group-item-action">Company / Agency</Link>
                        <Link to="/subscription" className="list-group-item list-group-item-action">Subscription</Link>
                        <Link to="/sponsorship" className="list-group-item list-group-item-action">Sponsorship</Link>
                        <Link to="/advertisement" className="list-group-item list-group-item-action">Advertisement</Link>
                        <Link to="/helpdesk" className="list-group-item list-group-item-action">Help Desk</Link>
        
                           {/* <Link to="/subcategory" className="list-group-item list-group-item-action">Help Center Sub Category</Link> */}
          
                    </div>}

                    <button className="list-group-item list-group-item-action" onClick={this.onLogoutClick}>Logout <FontAwesomeIcon icon={faSignOutAlt} /></button>
                </div>
            </div>:'' }
            </div>
        );
    }
}

Sidebar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Sidebar);
