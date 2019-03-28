import React from "react";
//import ReactDOM from 'react-dom';
import { HotTable } from "@handsontable/react";
import Handsontable from "handsontable";

export default class SitesTable extends React.Component {
  constructor(props) {
    super(props);
    this.id = "hot";
    this.hotSettings = {
      data: Handsontable.helper.createSpreadsheetData(4, 4),
      colHeaders: true
    };
    this.hotTableComponent = React.createRef();
  }

  swapHotData() {
    // The Handsontable instance is stored under the `hotInstance` property of the wrapper component.
    this.hotTableComponent.current.hotInstance.loadData([["new", "data"]]);
  }

  render() {
    return (
      <div>
        <HotTable
          ref={this.hotTableComponent}
          id={this.id}
          settings={this.hotSettings}
        />
        <br />
        <button onClick={this.swapHotData.bind(this)}>Load new data!</button>
      </div>
    );
  }
}
