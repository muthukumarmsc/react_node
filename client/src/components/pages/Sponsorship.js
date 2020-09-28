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
import UserAddModal from "../partials/UserAddModal";
import UserUpdateModal from "../partials/UserUpdateModal";
import { toast, ToastContainer} from "react-toastify";
import CsvDownloader from 'react-csv-downloader';
import keys from "../../actions/config";
import {Modal,Button} from 'react-bootstrap/';
const url = keys.baseUrl;
class Users extends Component {

    constructor(props) {
        super(props);


        this.columns = [
        {
                key: "userName1",
                text: "Name(who has sponsored)",
                className: "name1",
                align: "left",
                sortable: true,
                
            },  
            {
                key: "name2",
                text: "Name(who has been sponsored)",
                className: "name2",
                align: "left",
                sortable: true
            },
            
              {
                key: "created_date",
                text: "Date",
                className: "address",
                align: "left",
                sortable: true
            },
            {
                key: "commisionearned",
                text: "commisionearned",
                className: "commisionearned",
                align: "left",
                sortable: true
            }
        
        ];

        this.config = {
            page_size: 10,
            length_menu: [ 10, 20, 50 ],
            filename: "Sponsorship",
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
                email: '',
                address:'',
                businessPhoneNumber:'',
                status:'',
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
            .post(url+"api/Sponsorship-data")
            .then(res => {
                this.setState({ records: res.data})
               // console.log(res,'reszzzzhhhhhh');
            })
            .catch()
    }

    editRecord(record) {
        this.setState({ currentRecord: record});
       
    }

    deleteRecord(record) {
        axios
            .post(url+"api/user-delete", {_id: record._id})
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
            .post(url+"api/user-changestatus", {_id: record._id})
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
    id: 'name',
    displayName: 'Name(who has sponsored)'
    },
    {
    id: 'categoryname',
    displayName: 'Name(who has been sponsored)'
    },
    {
    id: 'price',
    displayName: 'Date'
    },
    {
    id: 'duration',
    displayName: 'commisionearned'
    },
     {
    id: 'features',
    displayName: 'Features'
    },
    {
    id: 'active',
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
                           {/*  <button className="btn btn-outline-primary float-right mt-3 mr-2" data-toggle="modal" data-target="#add-user-modal"><FontAwesomeIcon icon={faPlus}/> add</button>*/}
                            <h3 className="mt-2 text-secondary">Sponsorship Management</h3>
                             <br/>
                           <CsvDownloader  filename="Sponsorship" columns={this.state.columns} datas={this.state.records}
                           text="Csv" />
                          
                           <br/><br/>
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
