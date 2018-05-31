import React from "react";
import Block from "dxc-flex";
import wx from "./wx.jpeg";
import zfb from "./zfb.jpg";
import DonationItem from "./DonationItem";

export default class Donation extends React.Component {
  render() {
    return (
      <Block layout="vertical" horizontal="center" style={{ margin: "30px 0" }}>
        <Block horizontal="center" style={{ fontSize: 18, fontWeight: 700, marginBottom: 15 }}>
          捐助作者
        </Block>
        <Block>
          <DonationItem name="微信" qr={wx} />
          <DonationItem name="支付宝" qr={zfb} />
        </Block>
      </Block>
    );
  }
}
