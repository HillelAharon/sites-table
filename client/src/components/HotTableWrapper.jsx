import { graphql } from "react-apollo";
import React, { Component } from "react";
import gql from "graphql-tag";
import { HotTable } from "@handsontable/react";
//import Handsontable from "handsontable";

class HotTableWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sitesIdToLoad: []
    };
    this.hotId = "sitesHot";
    this.hotTableComponent = React.createRef();
    this.hotSettings = this.getTableSettings([]);
  }

  componentDidMount() {
    console.log(this.props.client);
    //this.props.client.query(TEST_QUERY).then(resp => console.log(resp.data));
    //this.props.client.query(TEST_QUERY).then(resp => console.log(resp.data));
  }

  render() {
    return (
      <div>
        <HotTable
          ref={this.hotTableComponent}
          id={this.hotId}
          settings={this.hotSettings}
        />
        <button onClick={this.consoleSitesIdToLoad.bind(this)}>
          send to papa
        </button>
      </div>
    );
  }

  consoleSitesIdToLoad() {
    this.props.handleLoadSiteIdClick(
      this.hotTableComponent.current.hotInstance.getData()
    );
  }

  swapHotData() {
    this.hotTableComponent.current.hotInstance.loadData([["new", "data"]]);
  }

  getTableSettings(tableData) {
    return {
      data: tableData,
      dataSchema: {
        _id: null,
        name: null,
        address: null,
        type: null,
        serialNumber: null,
        phone: null,
        qrCode: null
      },
      startRow: 2,
      startCols: 7,
      colHeaders: [
        "ID",
        "Name",
        "Address",
        "Type",
        "SerialNumber",
        "Phone",
        "qrCode"
      ],
      columns: [
        { data: "_id" },
        { data: "name" },
        { data: "address" },
        { data: "type" },
        { data: "serialNumber" },
        { data: "phone" },
        { data: "qrCode" }
      ],
      stretchH: "all",
      width: "100%",
      columnSorting: true,
      outsideClickDeselects: false,
      selectionMode: "multiple",
      minSpareRows: 1,
      hiddenColumns: true,
      showColumns: true,
      undo: true,
      // hiddenColumns: {
      //   indicators: true
      // },
      afterChange: changes => {
        this.addToOnChangeArr(changes);
      }
    };
  }

  addToOnChangeArr(changes) {
    // if (changes) {
    //   let manualDeleteTryErr = false;
    //   changes.forEach(([row, prop, oldVal, newVal]) => {
    //     const onChangeSiteId = prop === "id" ? oldVal : hot.getData()[row][0];
    //     if (prop !== "_id" && !(oldVal !== "" && newVal === "")) {
    //       if (newVal !== "" && onChangeSiteId) {
    //         const i = onChangeAttrArr.findIndex(
    //           obj => obj.id === onChangeSiteId
    //         );
    //         if (i !== -1) {
    //           onChangeAttrArr[i].attr[prop] = newVal;
    //         } else {
    //           let attrOnChange = {};
    //           attrOnChange[prop] = newVal;
    //           onChangeAttrArr.push({ id: onChangeSiteId, attr: attrOnChange });
    //         }
    //       }
    //     } else if (prop === "_id" && newVal === "") {
    //       hot.setDataAtCell(row, 0, oldVal);
    //     }
    //     if (oldVal !== "" && newVal === "" && !safeDelete) {
    //       manualDeleteTryErr = true;
    //     }
    //   });
    //   if (manualDeleteTryErr)
    //     this.state.consoleMsg("attributes deleted manually will not be updated", "err");
    // }
  }
}

const GET_SITES_BY_SITE_ID = gql`
  query sites($sitesIds: [String!]!) {
    sitesBySiteId(_id: $sitesIds) {
      _id
      name
      address
      type
      serialNumber
      phone
      qrCode
    }
  }
`;

const UPDATE_SITES = gql`
  mutation updateSiteCheck($sId: [String!]!, $sAttr: [SiteAttr!]!) {
    updateSites(_id: $sId, attributes: $sAttr) {
      _id
      name
      address
      type
      serialNumber
      phone
      qrCode
    }
  }
`;

const withData = graphql(GET_SITES_BY_SITE_ID, {
  options: props => {
    return {
      variables: {
        sitesIds: props.newSitesIdsToLoad
      }
    };
  }
});

const TEST_QUERY = gql`
  query {
    sitesByCityId(cityId: "ewg7uSzQRkkbofNiN") {
      _id
      name
      address
    }
  }
`;
// const withData = graphql(gql`
//   query {
//     sitesByCityId(cityId: "ewg7uSzQRkkbofNiN") {
//       _id
//       name
//       address
//     }
//   }
// `);

export default HotTableWrapper;

// mutation changePerson($pId: ID!, $pName: String, $pAge: Int){
//   updatePerson(id: $pId,name:$pName age: $pAge) {
//     name
//     age
//   }
// }
// {
//   "pId": "cju05f1sm00v501856hdpd2my",
//   "pName": "asmi"
// }

// const UPDATE_SITE = gql`
//   mutation updateSite(
//     $sId: String!
//     $sName: String
//     $sAddress: String
//     $sType: String
//     $sSerialNumber: String
//     $sPhone: String
//     $sQrCode: String
//   ) {
//     updateSite(
//       _id: $sId
//       name: $sName
//       address: $sAddress
//       type: $sType
//       serialNumber: $sSerialNumber
//       phone: $sPhone
//       qrCode: $sQrCode
//     ) {
//       _id
//       name
//       address
//       type
//       serialNumber
//       phone
//       qrCode
//     }
//   }
// `;
