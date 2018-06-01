import React from "react";
import Block from "dxc-flex";
import styles from "./DonationItem.css";

export default class DonationItem extends React.Component {
  render() {
    const { name, qr } = this.props;
    return (
      <div
        className={styles.box}
      >
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
