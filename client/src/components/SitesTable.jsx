import React from "react";
// import ReactDOM from "react-dom";
import HotTableWrapper from "./HotTableWrapper";
import "../styles/App.css";

export default class SitesTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastUpdatedData: [],
      onChangeAttrArr: [],
      sitesIdsToLoad: ["27PxiNPjJtLw6W2DJ", "27LGp6H8EfZBdp8yw"],
      hotRef: null
    };
  }

  render() {
    return (
      <div>
        <HotTableWrapper
          client={this.props.client}
          newSitesIdsToLoad={this.state.sitesIdsToLoad}
          lastUpdatedData={this.state.lastUpdatedData}
          handleLoadSiteIdClick={this.loadNewSitesIds}
        />
      </div>
    );
  }

  loadNewSitesIds = sitesIds => {
    this.setState({ sitesIdsToLoad: sitesIds });
  };

  updateDataBeforeLoading = tabeleData => {
    this.setState({ lastUpdatedData: tabeleData });
  };
}
