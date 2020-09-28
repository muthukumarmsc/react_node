import React, { Component, Fragment } from "react";
import Navbar from "../partials/Navbar";
import Sidebar from "../partials/Sidebar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList} from "@fortawesome/free-solid-svg-icons/faList";
import ReactDatatable from '@ashvin27/react-datatable';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import axios from "axios";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import CompanyagencyAddModal from "../partials/CompanyagencyAddModal";
import CompanyagencyUpdateModal from "../partials/CompanyagencyUpdateModal";
import { toast, ToastContainer} from "react-toastify";
import keys from "../../actions/config";
import {Modal,Button} from 'react-bootstrap/';
const url = keys.baseUrl;
class Company extends Component {

    constructor(props) {
        super(props);


        this.columns = [
        {
                key: "name",
                text: "Name",
                className: "name",
                align: "left",
                sortable: true,
                
            },  
            
            {
                key: "mobile_operator_name",
                text: "Mobile operator Name",
                className: "Mobile operator Name",
                align: "left",
                sortable: true
            },
             {
                key: "address",
                text: "Address",
                className: "address",
                align: "left",
                sortable: true
            },
             {
                key: "active",
                text: "Status",
                className: "status",
                align: "left",
                sortable: true,
                cell: record => {
                    console.log(record,'recordssssss');
                    const checkin = record.active;
                    console.log(checkin,'checkineeed');
                    if(checkin=='0' || checkin==''){
                        var lockVal = 'Inactive';
                    } else{
                        var lockVal = 'Active';
                    }
                   
                    return (
                        lockVal
                    );
                }
            },
            
            {
                key: "action",
                text: "Action",
                className: "action",
                width: 200,
                align: "left",
                sortable: false,
                cell: record => {
                    console.log(record,'recordssssss');
                    const checkin = record.active;
                    console.log(checkin,'checkineeed');
                    if(checkin=='0'){
                        var lockVal = 'fa fa-lock';
                    } else{
                        var lockVal = 'fa fa-unlock';
                    }
                   
                    return (
                        <Fragment>
                         <button
                                data-toggle="modal"
                                data-target="#update-user-modal"
                                className="btn btn-primary btn-sm"
                                onClick={() => this.editRecord(record)}
                                style={{marginRight: '5px'}}>
                                <i className="fa fa-edit"></i>
                            </button>
                            <button
                                className="btn btn-danger btn-sm mr-1"  
                                onClick={() => this.deleteRecord(record)}>
                                <i className="fa fa-trash"></i>
                            </button>
                             <button 
                               className="btn btn-primary btn-sm mr-1"
                                onClick={() => this.changestatus(record)}>
                                <i className={lockVal}></i>
                            </button>
                           


                        </Fragment>
                    );
                }
            }
        ];

        this.config = {
            page_size: 10,
            length_menu: [ 10, 20, 50 ],
            filename: "Company",
            no_data_text: 'No user found!',
            sort:{column: "Created date", order: "desc"},
            language: {
                length_menu: "Show _MENU_ result per page",
                filter: "Filter in records...",
                info: "Showing _START_ to _END_ of _TOTAL_ records",
                pagination: {
                    first: "First",
                    previous: "Previous",
                    next: "Next",
                    last: "Last"
                }
            },
            show_length_menu: true,
            show_filter: true,
            show_pagination: true,
            show_info: true,
            defaultSortAsc: true,
        };

        this.state = {
            currentRecord: {
                records: [],
                id: '',
                userName: '',
                mobileoperatorname: '',
                status:'',
                address: '',
                lockVal: '',
                modalshow: false,
                modalshow1: false,
                responsive: true,
            }
        };

        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.getData()
        console.log(this.state,'statezzzzzz');
    };

    componentWillReceiveProps(nextProps) {
        this.getData()
    }

    getData() {
        axios
            .post(url+"api/company-data")
            .then(res => {
                this.setState({ records: res.data})
               console.log(res,'reszzzzhhhhhh');
            })
            .catch()
    }

    editRecord(record) {
        this.setState({ currentRecord: record});
       
    }

    deleteRecord(record) {
        axios
            .post(url+"api/company-agency-delete", {id: record.id})
            .then(res => {
                if (res.status === 200) {
                   toast(res.data.message, {
                       position: toast.POSITION.TOP_CENTER,
                   })
                }
            })
            .catch();
        this.getData();
    }
 blockingsubmission = () => {
        if(this.state.blockinguser=='' || this.state.blocking_time=='')
        {
            alert("Enter blockind time");
            return false;
        }
        axios
            .post(url+"api/blockuser", {_id: this.state.blockinguser,blocking_time:this.state.blocking_time})
            .then(res => {
                if (res.status === 200) {
                   toast(res.data.message, {
                       position: toast.POSITION.TOP_CENTER,
                   })
                }
            })
            .catch();
        this.getData();
        this.modalclose();
    }

     bonussubmission = () => {
        if(this.state.bonususer=='' || this.state.bonus_amount=='')
        {
            alert("Enter blockind time");
            return false;
        }
        axios
            .post(url+"api/addbonus", {_id: this.state.bonususer,bonus_amount:this.state.bonus_amount})
            .then(res => {
                if (res.status === 200) {
                   toast(res.data.message, {
                       position: toast.POSITION.TOP_CENTER,
                   })
                }
            })
            .catch();
        this.getData();
        this.modalclose1();
    }

chatblock(record) {
this.setState({modalshow:true,blockinguser:record._id})
};

chatblock(record) {
this.setState({modalshow1:true,bonususer:record._id})
};

onChange = (e) => {
this.setState({ [e.target.id]: e.target.value });
};

modalclose = () => {
this.setState({modalshow:false});
}

modalclose1 = () => {
this.setState({modalshow1:false});
}

 changestatus(record) {
        axios
            .post(url+"api/company-agency-changestatus", {id: record.id})
            .then(res => {
                console.log(res,'reschange');
                if (res.status === 200) {
                   toast(res.data.message, {
                       position: toast.POSITION.TOP_CENTER,
                   })
                }
            })
            .catch();
        this.getData();
    }

    

    pageChange(pageData) {
        console.log("OnPageChange", pageData);
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div className="d-flex" id="wrapper">
                    <Sidebar/>
                    <CompanyagencyAddModal/>
                    <CompanyagencyUpdateModal record={this.state.currentRecord}/>
                    <div id="page-content-wrapper">
                        <div className="container-fluid">
                            <button className="btn btn-outline-primary float-right mt-3 mr-2" data-toggle="modal" data-target="#add-user-modal"><FontAwesomeIcon icon={faPlus}/> add</button>
                            <h3 className="mt-2 text-secondary">Company / Agency Management</h3>
                            <ReactDatatable
                                responsive={this.state.responsive}
                                config={this.config}
                                records={this.state.records}
                                columns={this.columns}
                                onPageChange={this.pageChange.bind(this)}
                            />
                        </div>
                    </div>
                    <ToastContainer/>
                </div>
            <Modal show={this.state.modalshow} onHide={this.modalclose}  aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Block chat</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                    <div className="row">
                            <div className="col-md-4">
                                <div className="checkbox pt-2"><label>Blocking time (in hours)</label></div>
                                </div>
                            <div className="col-md-8">
                                    <div className="def-number-input number-input safari_only">
                                    <input className="quantity" min="0" name="blocking_time" id="blocking_time" onChange={this.onChange} type="number" value={this.state.blocking_time}/>
                                    </div>
                            </div>
                    </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                        <Button variant="secondary btnDefaultNewBlue" onClick={this.modalclose}>
                            Cancel
                        </Button>
                        {(this.state.blockinguser=='' || this.state.blocking_time=='')?
                        <Button disabled="disabled" variant="primary btnDefaultNew" onClick={this.blockingsubmission}>
                            Confirm
                        </Button>
                        : <Button variant="primary btnDefaultNew" onClick={this.blockingsubmission}>
                            Confirm
                        </Button>}

                </Modal.Footer>
            </Modal>
             <Modal show={this.state.modalshow1} onHide={this.modalclose}  aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Bonus</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                    <div className="row">
                            <div className="col-md-4">
                                <div className="checkbox pt-2"><label>Bonus amount in BTC</label></div>
                                </div>
                            <div className="col-md-8">
                                    <div className="def-number-input number-input safari_only">
                                    <input className="quantity" min="0" name="bonus_amount" id="bonus_amount" onChange={this.onChange} type="number" value={this.state.bonus_amount}/>
                                    </div>
                            </div>
                    </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                        <Button variant="secondary btnDefaultNewBlue" onClick={this.modalclose}>
                            Cancel
                        </Button>
                        {(this.state.bonususer=='')?
                        <Button disabled="disabled" variant="primary btnDefaultNew" onClick={this.bonussubmission}>
                            Confirm
                        </Button>
                        : <Button variant="primary btnDefaultNew" onClick={this.bonussubmission}>
                            Confirm
                        </Button>}

                </Modal.Footer>
            </Modal>
            </div>

        );
    }

}

Company.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    records: state.records
});

export default connect(
    mapStateToProps
)(Company);
