import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateAdvertisement } from "../../actions/userActions";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';
import Select from 'react-select';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import keys from "../../actions/config";
const url = keys.baseUrl;

class AdvertisementUpdateModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.record.id,
            categories: this.props.record.categories,
            image:this.props.record.image,
            url:this.props.record.url,
            description:this.props.record.description,
            errors: {},
        };
    }
    componentDidMount() {
     
       
    }
     handleChange = (event) => {


  }
    componentWillReceiveProps(nextProps) {
        if (nextProps.record) {
            this.setState({
                id: nextProps.record.id,
                categories: nextProps.record.categories,
                image: nextProps.record.image,
                url: nextProps.record.url,
                description:nextProps.record.description,
            })
        }

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        if (nextProps.auth !== undefined
            && nextProps.auth.updateadvertisement !== undefined
            && nextProps.auth.updateadvertisement.data !== undefined
            && nextProps.auth.updateadvertisement.data.message !== undefined
            && nextProps.auth.updateadvertisement.data.success) {
            $('#update-user-modal').modal('hide');
            toast(nextProps.auth.updateadvertisement.data.message, {
                position: toast.POSITION.TOP_CENTER
            });
            nextProps.auth.updateadvertisement = "";
        }
    }

    onChange = e => {
        if (e.target.id === 'user-update-categories') {
            this.setState({ categories: e.target.value });
        }
        if (e.target.id === 'user-update-image') {
            this.setState({ image: e.target.value });
        }
        if (e.target.id === 'user-update-url') {
            this.setState({ url: e.target.value });
        }
         if (e.target.id === 'user-update-description') {
            this.setState({ description: e.target.value });
        }
    };

    onUserUpdate = e => {
        e.preventDefault();
        const newAdvertisement = {
            _id: this.state.id,
            categories: this.state.categories,
            image:this.state.image,
            url:this.state.url,
            description:this.state.description,
           
        };
        this.props.updateAdvertisement(newAdvertisement);
    };
    render() {
          const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="update-template-modal1">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Update Advertisement</h4>
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
                                            <label htmlFor="categories">categories</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.categories}
                                                id="user-update-categories"
                                                type="text"
                                                error={errors.categories}
                                                className={classnames("form-control", {
                                                    invalid: errors.categories
                                                })}/>
                                            <span className="text-danger">{errors.categories}</span>
                                        </div>
                                    </div>
                                     <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="image">Image</label>
                                        </div>
                                        <div className="col-md-9">
                                        <input 
                                            type="file" 
                                            id="user-update-image" 
                                            onChange={this.handleChange}
                                            
                                             error={errors.image}
                                                className={classnames("form-control", {
                                                    invalid: errors.image
                                                })}/>
                                                 <span className="text-success" >{this.state.image}</span>
                                            <span className="text-danger" >{errors.image}</span>
                                        </div>
                                    </div>
                                  {/*  <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="url">URL</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.url}
                                                error={errors.url}
                                                id="user-update-url"
                                                type="text"
                                                className={classnames("form-control", {
                                                    invalid: errors.url
                                                })}
                                            />
                                            <span className="text-danger">{errors.url}</span>
                                        </div>
                                    </div>
                                    */} 
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="description">Description</label>
                                        </div>
                                        <div className="col-md-9">
                                        <textarea 
                                                onChange={this.onChange}
                                                value={this.state.description}
                                                id="user-update-description"
                                                type="text"
                                                rows="4" 
                                                cols="50"
                                                error={errors.description}
                                                className={classnames("form-control", {
                                                    invalid: errors.description
                                                })}/>
                                            
                                            <span className="text-danger">{errors.description}</span>
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

AdvertisementUpdateModal.propTypes = {
    updateAdvertisement: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { updateAdvertisement }
)(withRouter(AdvertisementUpdateModal));
