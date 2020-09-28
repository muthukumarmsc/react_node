import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Advertisement } from "../../actions/AdvertisementActions";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import Select from "react-select";
import keys from "../../actions/config";
const url = keys.baseUrl;
class AdvertisementAddModal extends React.Component {

    constructor() {
        super();
        this.state = {
              
                categories: '',
                image: '',
                description:'',
            
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
            && nextProps.auth.updateadvertisement !== undefined
            && nextProps.auth.updateadvertisement.data !== undefined
            && nextProps.auth.updateadvertisement.data.message !== undefined) {
            $('#add-advertisement-modal').modal('hide');
            toast(nextProps.auth.updateadvertisement.data.message, {
                position: toast.POSITION.TOP_CENTER
            });
            nextProps.auth.updateadvertisement = undefined;
        }
    }


  
   
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onAdvertisementAdd = e => {
        e.preventDefault();
        const Advertisement = {
            categories: this.state.categories,
            image:this.state.image,
            url: this.state.url,
            description: this.state.description,
            
        };
         const newAdvertisement = new FormData();
        newAdvertisement.append('categories', this.state.categories);
        newAdvertisement.append('url', this.state.url);
        newAdvertisement.append('description', this.state.description);
        newAdvertisement.append('file', this.state.image);
        console.log(newAdvertisement,'newAdvertisement')
        this.props.Advertisement(newAdvertisement, this.props.history);
    };

    render() {
        const { errors } = this.state;
 
        return (
            <div>
                <div className="modal fade" id="add-advertisement-modal" data-reset="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Add New Advertisement</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this. onAdvertisementAdd} id="add-advertisement">
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="categories">Categories</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.categories}
                                                id="categories"
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
                                            id="image" 
                                            onChange={this.handleChange}
                                            name="image" 
                                                className={classnames("form-control",{
                                                    invalid: errors.image
                                                })}/>
                                          
                                            <span className="text-danger">{errors.image}</span>
                                        </div>
                                    </div>

                                  {/*   <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="url">URL</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.url}
                                                
                                                id="url"
                                                type="text"
                                                className={classnames("form-control")}
                                            />
                                            <span className="text-danger"></span>
                                        </div>
                                    </div> */}
                                    
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="description">Description</label>
                                        </div>
                                        <div className="col-md-9">
                                        <textarea 
                                                onChange={this.onChange}
                                                value={this.state.description}
                                                id="description"
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
                                    form="add-advertisement"
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

AdvertisementAddModal.propTypes = {
    Advertisement: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};


const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { Advertisement }
)(withRouter(AdvertisementAddModal));
