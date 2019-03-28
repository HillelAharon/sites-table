import React, { Component } from "react";
import SitesTable from "./SitesTable";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import "../styles/App.css";
import swal from "sweetalert";
//import Handsontable from "handsontable";

const site = { id: "111", name: "sss" };

const testQuery = gql`
  {
    sites(cityId: "ewg7uSzQRkkbofNiN") {
      _id
      name
      address
    }
  }
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastFetchedData: [],
      onChangeSites: [],
      sitesTable: null,
      consoleMsg: null,
      safeDelete: false
    };

    //this.initSitesTable = this.initSitesTable.bind(this);
    //this.addToOnChangeArr = this.addToOnChangeArr.bind(this);
  }

  render() {
    return (
      <div className="App">
        <SitesTable />
        {/* <Query query={testQuery}>
          {({ loading, error, data }) => {
            if (loading) return <div>Fetching</div>;
            if (error) return <div>Error</div>;

            const sitesToRender = data.sites;

            return (
              <div>
                {sitesToRender.map(site => (
                  <Site key={site._id} site={site} />
                ))}
              </div>
            );
          }}
        </Query> */}
      </div>
    );
  }

  // initSitesTable() {
  //   this.setState({
  //     hot: new Handsontable(document.querySelector("#root"), {
  //       data: [],
  //       dataSchema: {
  //         _id: null,
  //         name: null,
  //         address: null,
  //         type: null,
  //         serialNumber: null,
  //         phone: null,
  //         qrCode: null
  //       },
  //       startRow: 2,
  //       startCols: 7,
  //       colHeaders: [
  //         "ID",
  //         "Name",
  //         "Address",
  //         "Type",
  //         "SerialNumber",
  //         "Phone",
  //         "qrCode"
  //       ],
  //       columns: [
  //         { data: "_id" },
  //         { data: "name" },
  //         { data: "address" },
  //         { data: "type" },
  //         { data: "serialNumber" },
  //         { data: "phone" },
  //         { data: "qrCode" }
  //       ],
  //       stretchH: "all",
  //       width: "100%",
  //       columnSorting: true,
  //       outsideClickDeselects: false,
  //       selectionMode: "multiple",
  //       minSpareRows: 1,
  //       hiddenColumns: true,
  //       showColumns: true,
  //       undo: true,
  //       hiddenColumns: {
  //         indicators: true
  //       },
  //       afterChange: changes => {
  //         this.addToOnChangeArr(changes);
  //       }
  //     })
  //   });
  // }

  // addToOnChangeArr(changes) {
  //   // if (changes) {
  //   //   let manualDeleteTryErr = false;
  //   //   changes.forEach(([row, prop, oldVal, newVal]) => {
  //   //     const onChangeSiteId = prop === "id" ? oldVal : hot.getData()[row][0];
  //   //     if (prop !== "_id" && !(oldVal !== "" && newVal === "")) {
  //   //       if (newVal !== "" && onChangeSiteId) {
  //   //         const i = onChangeAttrArr.findIndex(
  //   //           obj => obj.id === onChangeSiteId
  //   //         );
  //   //         if (i !== -1) {
  //   //           onChangeAttrArr[i].attr[prop] = newVal;
  //   //         } else {
  //   //           let attrOnChange = {};
  //   //           attrOnChange[prop] = newVal;
  //   //           onChangeAttrArr.push({ id: onChangeSiteId, attr: attrOnChange });
  //   //         }
  //   //       }
  //   //     } else if (prop === "_id" && newVal === "") {
  //   //       hot.setDataAtCell(row, 0, oldVal);
  //   //     }
  //   //     if (oldVal !== "" && newVal === "" && !safeDelete) {
  //   //       manualDeleteTryErr = true;
  //   //     }
  //   //   });
  //   //   if (manualDeleteTryErr)
  //   //     this.state.consoleMsg("attributes deleted manually will not be updated", "err");
  //   // }
  // }

  //util functions
  getDifference(arr1, arr2) {
    let difference = new Set(arr1);
    for (let elem of arr2) difference.delete(elem);
    return this.copy(Array.from(difference));
  }

  getOnDeleteWarning(onDeleteArr) {
    let confirmStr = "you are about to delete:\n";
    for (let i = 0; i < onDeleteArr.length; i++)
      confirmStr = confirmStr.concat(
        `${onDeleteArr[i].id} -> ${Object.keys(onDeleteArr[i].attr).map(
          a => a + " "
        )}\n`
      );
    return confirmStr;
  }

  copy(o) {
    var output, v, key;
    output = Array.isArray(o) ? [] : {};
    for (key in o) {
      v = o[key];
      output[key] = typeof v === "object" ? this.copy(v) : v;
    }
    return output;
  }

  swalConfirm(txt) {
    return swal({
      title: "Are you sure?",
      text: txt,
      //icon: "warning",
      buttons: true,
      dangerMode: true
    });
  }

  validateIdInitBeforeLoad(table) {
    if (table.filter(site => site[0] !== null).length > 0) {
      return true;
    }
    this.state.consoleMsg("please insert id first", "help");
    return false;
  }

  isTableEmpty(table) {
    return (
      table.length === 1 && table[0].filter(attr => attr !== null).length === 0
    );
  }
}

// class App extends Component {

//   render() {
//     return (
//       <div className="App">
//         <Query query={testQuery}>
//         {({ loading, error, data }) => {
//           if (loading) return <div>Fetching</div>
//           if (error) return <div>Error</div>

//           const sitesToRender = data.sites

//           return (
//             <div>
//               {sitesToRender.map(site => <Site key={site._id} site={site} />)}
//             </div>
//           )
//         }}
//       </Query>
//       </div>
//     );
//   }
// }

export default App;
