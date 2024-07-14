import Alert from "./Alert";

class WarningAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = "rgb(150, 150, 0)";
    this.bgColor = "rgb(255, 255, 175)";
  }
}

export default WarningAlert;
