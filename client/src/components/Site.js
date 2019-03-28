import React, { Component } from 'react'

class Site extends Component {
  render() {
    return (
      <div>
        <div>
          {this.props.site.name} ({this.props.site.address})
        </div>
      </div>
    )
  }
}

export default Site