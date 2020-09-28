import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addTemplate } from "../../actions/templateActions";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';
import { Editor } from '@tinymce/tinymce-react';
import 'react-toastify/dist/ReactToastify.css';
class TemplateAddModal extends React.Component {
    constructor() {
        super();
        this.state = {
            subject: "",
            identifier: "",
            content: "",
            errors: {},
        };
        this.handleEditorChange = this.handleEditorChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
              $("#add-template-modal").find(".text-danger").show();
            this.setState({
                errors: nextProps.errors
            });
        }
        if (nextProps.auth !== undefined
            && nextProps.auth.template !== undefined
            && nextProps.auth.template.data !== undefined
            && nextProps.auth.template.data.message !== undefined) {
            $('#add-template-modal').modal('hide');
            toast(nextProps.auth.template.data.message, {
                position: toast.POSITION.TOP_CENTER
            });
            nextProps.auth.template = undefined;
        }
    }
    handleEditorChange(content, editor) {
       this.setState({ content });
     }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onTemplateAdd = e => {
        e.preventDefault();
        const newTemplate = {
            subject: this.state.subject,
            content: this.state.content,
            identifier: this.state.identifier,
        };
        console.log(newTemplate);
        this.props.addTemplate(newTemplate);
    };


    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="add-template-modal" data-reset="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Add Templates</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onTemplateAdd} id="add-template">
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="subject">Subject Name</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.subject}
                                                id="subject"
                                                type="text"
                                                error={errors.subject}
                                                className={classnames("form-control", {
                                                    invalid: errors.subject
                                                })}/>
                                            <span className="text-danger">{errors.subject}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="identifier">Identifier</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.identifier}
                                                error={errors.identifier}
                                                id="identifier"
                                                type="text"
                                                className={classnames("form-control", {
                                                    invalid: errors.identifier
                                                })}
                                            />
                                            <span className="text-danger">{errors.identifier}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="content">Content</label>
                                        </div>
                                        <div className="col-md-9">
                                        <Editor apiKey='5vk89nvvi2zckrb2lp2ctyyolewhq1v3pzdiwb7at68h40a5'
                                           initialValue="<p>This is the initial content of the editor</p>"
                                           value={this.state.content} onEditorChange={this.handleEditorChange}
                                           init={{
                                             height: 500,
                                             menubar: false,
                                             plugins: [
                                               'advlist autolink lists link image charmap print preview anchor',
                                               'searchreplace visualblocks code fullscreen',
                                               'insertdatetime media table paste code help wordcount'
                                             ],
                                             toolbar:
                                               'undo redo code | formatselect | bold italic backcolor | \
                                               alignleft aligncenter alignright alignjustify | \
                                               bullist numlist outdent indent | removeformat | help'
                                           }}
                                         />
                                            <span className="text-danger">{errors.content}</span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button
                                    form="add-template"
                                    type="submit"
                                    className="btn btn-primary">
                                    Add Template
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

TemplateAddModal.propTypes = {
    addTemplate: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { addTemplate }
)(withRouter(TemplateAddModal));
