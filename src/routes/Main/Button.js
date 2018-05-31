import React from "react";
import Block from "dxc-flex";

export default class Button extends React.Component {
  render() {
    return (
      <Block
        horizontal="center"
        vertical="center"
        style={{
          userSelect: "none",
          cursor: "pointer",
          marginRight: 15,
          background: "#1B9AF7",
          height: 30,
          padding: "0 30px",
          color: "#fff",
          borderRadius: 4
        }}
        {...this.props}
      />
    );
  }
}
