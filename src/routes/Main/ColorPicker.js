import React from "react";
import Block from "dxc-flex";
import { BlockPicker } from "react-color";

export default class ColorPicker extends React.Component {
  state = { displayColorPicker: true };
  handleClick = () => {
    this.setState({ displayColorPicker: false });
  };
  handleClose = () => {
    this.setState({ displayColorPicker: true });
  };
  render() {
    const { displayColorPicker } = this.state;
    const { color, onChange, labelWidth } = this.props;
    return (
      <div style={{ position: "relative" }}>
        <Block vertical="center">
          <div style={{ width: labelWidth }}>字体颜色:</div>
          <div
            onClick={this.handleClick}
            style={{ padding: 5, border: "1px solid #ddd", borderRadius: 2, marginLeft: 10 }}
          >
            <div style={{ width: 36, height: 14, background: color, borderRadius: 2 }} />
          </div>
        </Block>
        {!displayColorPicker
          ? [
              <div
                onClick={this.handleClose}
                key="2"
                style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
              />,
              <div key="1" style={{ position: "absolute", top: 32, left: 10 }}>
                <BlockPicker onChange={onChange} color={color} />
              </div>
            ]
          : null}
      </div>
    );
  }
}
