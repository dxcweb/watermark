import React from "react";
import Block from "dxc-flex";
import Git from "./Git.png";

export default class GitHup extends React.Component {
  render() {
    return (
      <Block
        el="a"
        target="_blank"
        href="https://github.com/dxcweb/watermark"
        vertical="center"
        style={{
          marginLeft: 10,
          cursor: "pointer",
          border: "1px solid #d5d5d5",
          backgroundImage: "linear-gradient(180deg,#fcfcfc 0,#eee)",
          padding: "3px 10px 3px 8px",
          borderRadius: 4,
          fontSize: 16,
          color: "#333",
          textDecoration: "initial"
        }}
      >
        <img src={Git} alt="githup" style={{ display: "block", width: 18, height: 18 }} />
        <div style={{ fontWeight: 700, marginLeft: 5 }}>Star</div>
      </Block>
    );
  }
}
