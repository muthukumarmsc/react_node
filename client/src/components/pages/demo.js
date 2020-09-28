import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';
import { CSVLink, CSVDownload } from 'react-csv';
import CSVReader from "react-csv-reader";
class App extends Component {
  constructor() {
    super();

    this.state = {
      name: 'React',
      // csvData: [
      //   ['firstname', 'lastname', 'email'],
      //   ['Ahmed', 'Tomi', 'ah@smthing.co.com'],
      //   ['Raed', 'Labes', 'rl@smthing.co.com'],
      //   ['Yezzi', 'Min l3b', 'ymin@cocococo.com']
      // ],
      converting: [],
      csvData: [{
        "data": [{
          "Id": 1612,
          "Name": "harsha",
          "Type": "group",
          "StoreNumber": null,
          "StoreUid": null,
          "Brand": null,
          "DeviceId": null,
          "DeviceUID": null,
          "parentGroup": true,
          "Children": []
        }, {
          "Id": 1612,
          "Name": "harsha",
          "Type": "group",
          "StoreNumber": null,
          "StoreUid": null,
          "Brand": null,
          "DeviceId": null,
          "DeviceUID": null,
          "parentGroup": true,
          "Children": [{
            "Id": 1579,
            "Name": "testTheGroup123",
            "Type": "group",
            "StoreNumber": null,
            "StoreUid": null,
            "Brand": null,
            "DeviceId": null,
            "DeviceUID": null,
            "Children": [{
              "Id": 1583,
              "Name": "testEmpty",
              "Type": "group",
              "StoreNumber": null,
              "StoreUid": null,
              "Brand": null,
              "DeviceId": null,
              "DeviceUID": null,
              "Children": [{
                "Id": 1592,
                "Name": "empty group2",
                "Type": "group",
                "StoreNumber": null,
                "StoreUid": null,
                "Brand": null,
                "DeviceId": null,
                "DeviceUID": null,
                "Children": []
              }, {
                "Id": 1592,
                "Name": "empty group2",
                "Type": "group",
                "StoreNumber": null,
                "StoreUid": null,
                "Brand": null,
                "DeviceId": null,
                "DeviceUID": null,
                "Children": []
              },
              {
                "Id": 1587,
                "Name": "testEmpty1",
                "Type": "group",
                "StoreNumber": null,
                "StoreUid": null,
                "Brand": null,
                "DeviceId": null,
                "DeviceUID": null,
                "Children": [{
                  "Id": 96946,
                  "Name": null,
                  "Type": "store",
                  "StoreNumber": "00000181",
                  "StoreUid": "BFA5C1B350E242B28344150DA5310552",
                  "Brand": "Wendy's",
                  "DeviceId": 119924,
                  "DeviceUID": "AA5D518B-2CC2-4D25-B67A-FD9D84CBD3E3",
                  "Children": []
                }]
              }]
            }]
          }]
        }]
      }
      ],
      updatedJSONObject: null

    };

    //this.convertedJsonObject = this.convertedJsonObject.bind(this)
    this.parentGroupJSON();
    this.convertedJsonObject((this.state.csvData[0]).data);

  }
  /*  convertedJsonObject() {
      var converting = [];
      //console.log('this.state.csvData', (this.state.csvData[0]).data);
      var data = (this.state.csvData[0]).data;
      var newObject = {};
      for (var i = 0; i < data.length; ++i) {
        //console.log('data[i]', data[i]);
        newObject = this.getNewObject(data[i]);
        if (data[i].Children.length > 0) {
          var innerData = data[i].Children;
          for (var j = 0; j < innerData.length; ++j) {
            newObject = this.getNewObject(innerData[j]);
            newObject.parentGroup = innerData[j].Type;
            converting.push(newObject);
          }
        }
        converting.push(newObject);
      }
      //console.log('converting', converting);
      this.state.updatedJSONObject = converting;
      this.setState(this.state);
      //return JSON.stringify(converting);
    }*/
  parentGroupJSON() {
    var data = this.state.csvData[0].data;
    for (var i = 0; i < data.length; i++) {
      data[i].parentGroup = true;
    }
    //this.setState(this.state);
    console.log(this.state.csvData[0].data);

  }
  // convertedJsonObject(data = null, group = null, parent = null) {
  //   var newObject = {};
  //   console.log(data);
  //   if ((data.length === undefined && group != null && parent != null) || (data.length === undefined && group != null && parent == null)) {
  //     newObject = this.getNewObject(data);
  //     if (group) {
  //       newObject.groupName = group;
  //       if (parent) {
  //         newObject.parentGroup = parent;
  //       }
  //     }
  //     console.log('*******************', newObject);
  //     this.state.converting.push(newObject);
  //     this.state.updatedJSONObject = this.state.converting;
  //   }

  //   for (var i = 0; i < data.length; i++) {
  //     newObject = this.getNewObject(data[i]);
  //     if (group) {
  //       newObject.groupName = group;
  //       if (parent) {
  //         newObject.parentGroup = parent;
  //       }
  //     }


  //     if (!data[i].hasOwnProperty("parentGroup") && parent) {
  //       console.log('*******************', newObject);
  //       this.state.converting.push(newObject);
  //     } 
  //     if(data[i].Children.length == 0) {
  //       this.convertedJsonObject(data[i], data[i].Name, group);
  //     } else {
  //       console.log('data[i].Children, data[i].Name, group',data[i].Children, data[i].Name, group);
  //       this.convertedJsonObject(data[i].Children, data[i].Name, group);
  //     }
  //   }
  //   this.state.updatedJSONObject = this.state.converting;

  //   this.setState(this.state);
  // }

    convertedJsonObject(data = null, group = null, parent = null) {
    var newObject = {};
    ////console.log(data);
    if ((data.length === undefined && group != null && parent != null) || (data.length === undefined && group != null && parent == null)) {
      newObject = this.getNewObject(data);
      if (group) {
        newObject.groupName = group;
        if (parent) {
          newObject.parentGroup = parent;
        }
      }
      console.log('*******************', newObject);
      this.state.converting.push(newObject);
      this.state.updatedJSONObject = this.state.converting;
    }

    for (var i = 0; i < data.length; i++) {
      newObject = this.getNewObject(data[i]);
      if (group) {
        newObject.groupName = group;
        if (parent) {
          newObject.parentGroup = parent;
        }
      }


      if (!data[i].hasOwnProperty("parentGroup") && parent) {
        console.log('*******************', newObject);
        this.state.converting.push(newObject);
      } 
      if(data[i].Children.length == 0) {
        this.convertedJsonObject(data[i], data[i].Name, group);
      } else {
        //console.log('data[i].Children, data[i].Name, group',data[i].Children, data[i].Name, group);
        this.convertedJsonObject(data[i].Children, data[i].Name, group);
      }
    }
    this.state.updatedJSONObject = this.state.converting;

    this.setState(this.state);
  }


  


  getNewObject(object) {
    var newJsonObject = {
      "account": "",
      "parentGroup": "",
      "groupName": "",
      "storeName": "",
      "StoreNumber": ""
    };
    newJsonObject["account"] = (object)["account"];
    newJsonObject["parentGroup"] = (object)["parentGroup"];
    newJsonObject["groupName"] = (object)["Name"];
    newJsonObject["storeName"] = (object)["StoreUid"];
    newJsonObject["StoreNumber"] = (object)["StoreNumber"];
    return newJsonObject;
  }

  render() {
    return (
      <div>
        <Hello name={this.state.name} />
        <p>
          Start editing to see some magic happen :)
        </p>

        <CSVLink
          data={this.state.updatedJSONObject}
          className="btn btn-primary  add-group-btn"
        >
          export
        </CSVLink>


      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
