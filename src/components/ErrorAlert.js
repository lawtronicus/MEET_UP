import Alert from "./Alert";

class ErrorAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = "rgb(200, 0, 0)"; // red
    this.bgColor = "rgb(255, 127, 127)"; // light red
  }
}

export default ErrorAlert;
