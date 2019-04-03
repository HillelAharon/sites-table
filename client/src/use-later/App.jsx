// import Handsontable from "handsontable";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import React, { Component } from "react";
import SitesTable from "./SitesTable";

import swal from "sweetalert";
import "../styles/App.css";

const testQuery = gql`
  query {
    sitesByCityId(cityId: "ewg7uSzQRkkbofNiN") {
      _id
      name
      address
    }
  }
`;
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // return (
    //   <div>
    //     <Query query={testQuery}>
    //       {({ loading, error, data }) => {
    //         console.log("loading= " + loading);
    //         console.log(data);
    //         if (loading) return "Loading...";
    //         if (error) return `Error! ${error.message}`;

    //         return (
    //           <select name="site">
    //             {data.sitesByCityId.map(site => (
    //               <option key={site._id} value={site.name}>
    //                 {site.name}
    //               </option>
    //             ))}
    //           </select>
    //         );
    //       }}
    //     </Query>
    //   </div>
    // );
    return <SitesTable />;
  }

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
