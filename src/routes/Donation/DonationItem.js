import React from "react";
import Block from "dxc-flex";

export default class Donation extends React.Component {
  render() {
    const { name, qr } = this.props;
    return (
      <div style={{ border: "1px solid #dfe2e5", width: 188, margin: "0 18px" }}>
        <Block
          vertical="center"
          horizontal="center"
          style={{ height: 38, borderBottom: "1px solid #dfe2e5" }}
        >
          {name}
        </Block>
        <img src={qr} style={{ width: "100%", display: "block" }} alt="" />
      </div>
    );
  }
}
