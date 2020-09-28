import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateTemplate } from "../../actions/templateActions";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';
import { Editor } from '@tinymce/tinymce-react';
import 'react-toastify/dist/ReactToastify.css';
class TemplateUpdateModal extends React.Component {
    constructor(props) {
        super(props);
         $("#update-template-modal").find(".text-danger").hide();
        this.state = {
            id: this.props.record._id,
            identifier: this.props.record.identifier,
            subject: this.props.record.subject,
            content: this.props.record.content,
            errors: {},
        };
        this.handleEditorChange = this.handleEditorChange.bind(this);
    }

    handleEditorChange(content, editor) {
       this.setState({ content });
     }

    componentWillReceiveProps(nextProps) {
        if (nextProps.record) {
            this.setState({
                id: nextProps.record._id,
                identifier: nextProps.record.identifier,
                subject: nextProps.record.subject,
                content: nextProps.record.content
            })
        }
        if (nextProps.errors) {
             $("#update-template-modal").find(".text-danger").show();
            this.setState({
                errors: nextProps.errors
            });
        }
        if (nextProps.auth !== undefined
            && nextProps.auth.updatetemplate !== undefined
            && nextProps.auth.updatetemplate.data !== undefined
            && nextProps.auth.updatetemplate.data.message !== undefined
            && nextProps.auth.updatetemplate.data.success) {
            $('#update-template-modal').modal('hide');
            toast(nextProps.auth.updatetemplate.data.message, {
                position: toast.POSITION.TOP_CENTER
            });
            nextProps.auth.updatetemplate = "";
        }
    }

    onChange = e => {
         $("#update-template-modal").find(".text-danger").show();
        if (e.target.id === 'template-update-subject') {
            this.setState({ subject: e.target.value });
        }
        if (e.target.id === 'template-update-identifier') {
            this.setState({ identifier: e.target.value });
        }
    };

    onTemplateUpdate = e => {
        e.preventDefault();
         $("#update-template-modal").find(".text-danger").show();
        const newTemplate = {
            _id: this.state.id,
            identifier: this.state.identifier,
            subject: this.state.subject,
            content: this.state.content
        };
        
        this.props.updateTemplate(newTemplate);
    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="update-template-modal">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Update Template</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onTemplateUpdate} id="update-template">
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.id}
                                        id="template-update-id"
                                        type="text"
                                        className="d-none"/>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="name">Subject</label>
                                        </div>
                                        <div className="col-md-9">
                                        <input
                                            onChange={this.onChange}
                                            value={this.state.subject}
                                            id="template-update-subject"
                                            type="text"
                                            error={errors.subject}
                                            className={classnames("form-control", {
                                                invalid: errors.subject
                                            })}/>
                                            <span className="text-danger">{errors.name}</span>
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
                                            id="template-update-identifier"
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
                                           initialValue={this.state.content}
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
                                    form="update-template"
                                    type="submit"
                                    className="btn btn-primary">
                                    Update Template
                                </button>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>

        )
    }
}

TemplateUpdateModal.propTypes = {
    updateTemplate: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { updateTemplate }
)(withRouter(TemplateUpdateModal));
