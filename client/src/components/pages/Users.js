import React, {useState,Component, Fragment } from "react";
import Navbar from "../partials/Navbar";
import Sidebar from "../partials/Sidebar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList} from "@fortawesome/free-solid-svg-icons/faList";
import ReactDatatable from '@ashvin27/react-datatable';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import axios from "axios";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import UserAddModal from "../partials/UserAddModal";
import UserUpdateModal from "../partials/UserUpdateModal";
import { toast, ToastContainer} from "react-toastify";
import keys from "../../actions/config";
import CsvDownloader from 'react-csv-downloader';
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import {Modal,Button} from 'react-bootstrap/';
import Logo from "../../Logo-small.png"
import '../../css/dashboard.css';
import easysoft from "../../EasyLogo-FinalLogo.jpg";
const url = keys.baseUrl;
class Users extends Component {

    constructor(props) {
        super(props);
        
        this.state={
            columns:[],
            datas:[],
            csvDownload:[],
            userName:'',

        }
        this.columns = [
        {
                key: "first_name",
                text: "First Name",
                className: "name",
                align: "left",
                sortable: true,
            },
            {
                key: "last_name",
                text: "Last Name",
                className: "name",
                align: "left",
                sortable: true,
            },    
            {
                key: "email",
                text: "Email",
                className: "email",
                align: "left",
                sortable: true
            },
             {
                key: "user_phone_number",
                text: "Business Phone Number",
                className: "Contact No",
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
                key: "status",
                text: "Status",
                className: "status",
                align: "left",
                sortable: true,
                show: true, 
                cell: record => {
                    console.log(record,'recordssssss');
                    const checkin = record.status;
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
                    const checkin = record.status;
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
                                data-target="#update-template-modal"
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

        this.columnsFull = [
        {
                key: "first_name",
                text: "First Name",
                className: "name",
                align: "left",
                sortable: true,
            },  
            {
                key: "last_name",
                text: "Last Name",
                className: "name",
                align: "left",
                sortable: true,
            },
            {
                key: "email",
                text: "Email",
                className: "email",
                align: "left",
                sortable: true
            },
             {
                key: "user_phone_number",
                text: "Business Phone Number",
                className: "Contact No",
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
                key: "map",
                text: "Map Address",
                className: "map",
                align: "left",
                sortable: true
            },
            
            {
                key: "city",
                text: "City",
                className: "city",
                align: "left",
                sortable: true
            },
           
             {
                key: "balance",
                text: "Balance",
                className: "balance",
                align: "left",
                sortable: true
            },
            {
                key: "status",
                text: "Status",
                className: "status",
                align: "left",
                sortable: true,
                show: true, 
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
            }
        ];

        this.config = {
            page_size: 10,
            length_menu: [ 10, 20, 50 ],
            filename: "Users",
            no_data_text: 'No user found!',
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
        this.confignew = {
            page_size: 10,
            length_menu: [ 10, 20, 50 ],
            filename: "Users",
            no_data_text: 'No user found!',
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
            show_length_menu: false,
            show_filter: false,
            show_pagination: false,
            show_info: false,
            defaultSortAsc: false,
            
        };

        this.state = {
            currentRecord: {
                records: [],
                id: '',
                first_name: '',
                last_name: '',
                email: '',
                address:'',
                picture:'',
                user_phone_number:'',
                status:'',
                password: '',
                password2: '',
                lockVal: '',
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
            .post(url+"api/user-data")
            .then(res => {
                console.log(res,'userres12')
             var superMerchantarray =[]; 
                  res.data.map((item,i)=>{    
                  console.log(item,'useritem')   
                    const activeitem=item.active;
                    var status =[];
                    if (activeitem==1) {
                        var status='Active';
                    }else{
                        var status='Inactive';
                    }
                    const obj = {'first_name':item.first_name,'last_name':item.last_name,'email':item.email,'user_phone_number':item.user_phone_number,'address':item.address,'map':item.map,'city':item.city,'balance':item.balance,'status':status};
                    superMerchantarray.push(obj);
                })
               console.log(superMerchantarray,'superMerchantarray1231')
                this.setState({ records: res.data,csvDownload:superMerchantarray})
        })
            .catch()
    }

    editRecord(record) {
        console.log('record --- : ',record);
        this.setState({ currentRecord: record});
        console.log('currentRecord --- : ',this.state.currentRecord);
    }

    deleteRecord(record) {
        axios
            .post(url+"api/user-delete", {id: record.id})
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
exportPDFWithComponent = () => {
        this.pdfExportComponent.save();
    };
 
 changestatus(record) {
        axios
            .post(url+"api/user-changestatus", {id: record.id})
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

        let {csvDownload} = this.state;

    this.state.columns1 = [
    {
    id: 'first_name',
    displayName: 'First Name'
    },
     {
    id: 'last_name',
    displayName: 'Last Name'
    },
    {
    id: 'email',
    displayName: 'Email'
    },
     {
    id: 'user_phone_number',
    displayName: 'Business Phone Number'
    },
     {
    id: 'address',
    displayName: 'Address'
    },
    {
    id: 'map',
    displayName: 'Map Address'
    },
    {
    id: 'city',
    displayName: 'City'
    },
    {
    id: 'balance',
    displayName: 'Balance'
    },
    {
    id: 'status',
    displayName: 'Status'
    },
  ];
        return (
            <div>
                <Navbar/>
                <div className="d-flex" id="wrapper">
                    <Sidebar/>
                    <UserAddModal/>
                    <UserUpdateModal record={this.state.currentRecord}/>
                    <div id="page-content-wrapper">
                        <div className="container-fluid">
                            <button className="btn btn-outline-primary float-right mt-3 mr-2" data-toggle="modal" data-target="#add-user-modal"><FontAwesomeIcon icon={faPlus}/> add</button>
                            <h3 className="mt-2 text-secondary">Users Management</h3>
                             <br/>
                        <CsvDownloader  filename="Users" columns={this.state.columns1} datas={this.state.csvDownload}
                           text="Csv" /> &nbsp;
                    <button className="k-button" onClick={this.exportPDFWithComponent}>
                        Pdf 
                   </button>
                    <br/><br/>
                    <div className="pdf">
                    <PDFExport
                        ref={component => (this.pdfExportComponent = component)}
                        paperSize="auto"   margin={60} fileName={`User ${new Date().getFullYear()}`}
                        author="KendoReact Team">
                        
                        <ReactDatatable  records={this.state.records} columns={this.columnsFull}  config={this.confignew}
                             />
                    </PDFExport>
                    </div>
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

Users.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    records: state.records
});


export default connect(
    mapStateToProps
)(Users);
