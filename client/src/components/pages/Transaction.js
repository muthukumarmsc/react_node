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
import CsvDownloader from 'react-csv-downloader';
import {Modal,Button} from 'react-bootstrap/';
const url = keys.baseUrl;
class Transaction extends Component {

    constructor(props) {
        super(props);


        this.columns = [
        {
                key: "sender",
                text: "Sender",
                className: "name",
                align: "left",
                sortable: true,
                
            },  
             {
                key: "receiver",
                text: "Receiver",
                className: "name",
                align: "left",
                sortable: true,
                
            },  
            
            {
                key: "amount",
                text: "Amount",
                className: "Mobile operator Name",
                align: "left",
                sortable: true
            },
             {
                key: "date",
                text: "Date",
                className: "address",
                align: "left",
                sortable: true
            }
        ];

        this.config = {
            page_size: 10,
            length_menu: [ 10, 20, 50 ],
            filename: "Transaction",
            no_data_text: 'No user found!',
             button: {
                print: true
            },
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
            .post(url+"api/transaction-data")
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
            .post(url+"api/transaction-delete", {_id: record._id})
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
 
 changestatus(record) {
        axios
            .post(url+"api/company-changestatus", {_id: record._id})
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

    changemoderator(record) {
        axios
            .post(url+"api/user-changemoderator", {_id: record._id})
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

    let {
        csvDownload
    }=this.state;
   this.state.columns = [
    {
    id: 'sender',
    displayName: 'Sender'
    },
    {
    id: 'receiver',
    displayName: 'Receiver'
    },
     {
    id: 'amount',
    displayName: 'Amount'
    },
    {
    id: 'created_date',
    displayName: 'Date'
    },
  ];

        return (
            <div>
                <Navbar/>
                <div className="d-flex" id="wrapper">
                    <Sidebar/>
                    <CompanyagencyAddModal/>
                    <CompanyagencyUpdateModal record={this.state.currentRecord}/>
                    <div id="page-content-wrapper">
                        <div className="container-fluid">
                            {/* <button className="btn btn-outline-primary float-right mt-3 mr-2" data-toggle="modal" data-target="#add-user-modal"><FontAwesomeIcon icon={faPlus}/> add</button>*/}
                            <h3 className="mt-2 text-secondary">Transaction Management</h3><br/>
                            <CsvDownloader  filename="Transaction" columns={this.state.columns} datas={this.state.records}
                           text="Csv" /><br/><br/>
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

Transaction.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    records: state.records
});

export default connect(
    mapStateToProps
)(Transaction);
