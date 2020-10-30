import React, { Component } from 'react';

export default class InputReadOnly extends Component {
  render() {
    return (
      <>
        <label htmlFor={this.props.id}>{this.props.name}</label>
        <input
          type="text"
          id={this.props.id}
          disabled
          value={this.props.value}
        />
      </>
    );
  }
}
