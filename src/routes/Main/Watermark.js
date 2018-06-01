import Canvas2Image from "../../utils/Canvas2Image";
function canvasTextAutoLine(ctx, width, str, initX, initY, lineHeight = 20) {
  // ctx.fillText(str, 0, lineHeight);
  // return;
  var lineWidth = 0;
  var canvasWidth = width;
  var lastSubStrIndex = 0;
  for (let i = 0; i < str.length; i++) {
    lineWidth += ctx.measureText(str[i]).width;

    if (lineWidth > canvasWidth - initX) {
      //减去initX,防止边界出现的问题
      ctx.fillText(str.substring(lastSubStrIndex, i), initX, initY);
      initY += lineHeight;
      lineWidth = 0;
      lastSubStrIndex = i;
    }
    if (i === str.length - 1) {
      ctx.fillText(str.substring(lastSubStrIndex, i + 1), initX, initY);
    }
  }
}

function Watermark(canvas, opt = {}) {
  let img;
  let step = 0;
  let cw = document.createElement("canvas");
  // document.getElementById("test").appendChild(cw);
  let img_width, img_height;
  let userOptions = opt;
  const getOptions = () => {
    const defaultOptions = {
      text: "仅用于办理XXXX，他用无效。",
      fontSize: 23,
      fillStyle: "rgba(100, 100, 100, 0.4)",
      watermarkWidth: 280,
      watermarkHeight: 180
    };
    const options = { ...defaultOptions, ...userOptions };
    if (options.fontSize < 10) {
      options.fontSize = 10;
    } else {
      options.fontSize = parseInt(options.fontSize, 10);
    }
    if (options.watermarkWidth < 100) {
      options.watermarkWidth = 100;
    }
    if (options.watermarkHeight < 100) {
      options.watermarkHeight = 100;
    }
    return options;
  };
  const createWatermarkCanvas = () => {
    const { text, fontSize, fillStyle, watermarkWidth, watermarkHeight } = getOptions();
    const rotate = 20;
    const wctx = cw.getContext("2d");
    //清除小画布
    // wctx.clearRect(0, 0, cw.width, cw.height);
    const { sqrt, pow, sin, tan } = Math;
    cw.width = sqrt(pow(watermarkWidth, 2) + pow(watermarkHeight, 2));
    cw.height = watermarkHeight;

    wctx.font = `${fontSize}px 黑体`;

    //文字倾斜角度
    wctx.rotate(-rotate * Math.PI / 180);
    wctx.fillStyle = fillStyle;
    const Y = parseInt(sin(rotate * Math.PI / 180) * watermarkWidth, 10);
    const X = -parseInt(Y / tan((90 - rotate) * Math.PI / 180), 10);
    canvasTextAutoLine(wctx, watermarkWidth, text, X + 10, Y + fontSize + 20, fontSize * 1.4);
  };

  const _draw = () => {
    drawImage();
    addWatermark();
  };
  const drawImage = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    switch (step) {
      default:
      case 0:
        canvas.width = img_width;
        canvas.height = img_height;
        ctx.drawImage(img, 0, 0, img_width, img_height);
        break;
      case 1:
        canvas.width = img_height;
        canvas.height = img_width;
        ctx.save();
        ctx.rotate(90 * Math.PI / 180);
        ctx.drawImage(img, 0, -img_height, img_width, img_height);
        ctx.restore();
        break;
      case 2:
        canvas.width = img_width;
        canvas.height = img_height;
        ctx.save();
        ctx.rotate(180 * Math.PI / 180);
        ctx.drawImage(img, -img_width, -img_height, img_width, img_height);
        ctx.restore();
        break;
      case 3:
        canvas.width = img_height;
        canvas.height = img_width;
        ctx.save();
        ctx.rotate(270 * Math.PI / 180);
        ctx.drawImage(img, -img_width, 0, img_width, img_height);
        ctx.restore();
        break;
    }
  };
  const addWatermark = () => {
    //平铺--重复小块的canvas
    var pat = ctx.createPattern(cw, "repeat");
    ctx.fillStyle = pat;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };
  this.draw = dataURL => {
    step = 0;
    img = new Image();
    img.onload = () => {
      img_width = img.width;
      const max = 2000;
      if (img_width > max) {
        img_width = max;
        img_height = max * img.height / img.width;
      } else {
        img_height = img.height;
      }
      _draw();
    };
    img.src = dataURL;
  };
  this.rotate = () => {
    if (!img) {
      return;
    }
    step >= 3 ? (step = 0) : step++;
    _draw();
  };
  this.save = () => {
    if (!img) {
      return;
    }
    Canvas2Image.saveAsJPEG(canvas);
  };
  this.setOptions = (obj = {}) => {
    userOptions = obj;
    createWatermarkCanvas();
    if (!img) {
      return;
    }
    _draw();
  };
  const watermarkCanvas = document.createElement("canvas");
  watermarkCanvas.width = "160px";
  watermarkCanvas.height = "100px";
  const ctx = canvas.getContext("2d");
  createWatermarkCanvas();
}

export default Watermark;
