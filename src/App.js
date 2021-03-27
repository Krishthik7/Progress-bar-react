import { Component } from "react";
import { Button } from "react-bootstrap";
import ProgressBar from "./ProgressBar";

export async function getEndpointData() {
  let result;
  await fetch("http://pb-api.herokuapp.com/bars").then((resolve) =>
    resolve.json().then((res1) => {
      result = JSON.parse(JSON.stringify(res1));
    })
  );
  return result;
}

class App extends Component {
  state = {
    displayArray: [],
    displayArrayButton: [],
    bar: 1,
    completed: [],
    values: [],
    label: [],
    limit: null,
    buttonText: [],
    dropDown: [],
    color: [
      "dodgerblue",
      "dodgerblue",
      "dodgerblue",
      "dodgerblue",
      "dodgerblue",
    ],
  };
  componentDidMount() {
    this.fetchData().then(async (res) => {
      let tempDisplay = [];
      let completed = [];
      let label = [];
      let displayArrayButton = [];

      let array = res.bars.map((element) => {
        let percent = ((element / res.limit) * 100).toFixed(0);
        tempDisplay.push("block");
        completed.push(percent);
        label.push(percent);
        return element;
      });

      res.buttons.map((element) => {
        displayArrayButton.push("block");
        return element;
      });

      let count = 5;
      while (count !== res.bars.length) {
        tempDisplay.push("none");
        completed.push(0);
        label.push(0);
        count--;
      }
      count = 6;
      while (count !== res.buttons.length) {
        displayArrayButton.push("none");
        count--;
      }
      this.setState({
        values: array,
        data: res,
        dropDown: Array(res.bars.length - 1 + 1)
          .fill()
          .map((_, idx) => "Progress Bar " + (1 + idx)),
        limit: res.limit,
        displayArray: tempDisplay,
        completed: completed,
        label: label,
        buttonText: res.buttons,
        displayArrayButton: displayArrayButton,
      });
      this.setState({
        buttonText: res.buttons,
        displayArrayButton: displayArrayButton,
      });
    });
  }
  fetchData() {
    return new Promise(async (resolve) => {
      await getEndpointData().then((res) => {
        resolve(res);
      });
    });
  }

  MakeItem = (X, key) => {
    return <option key={key}>{X}</option>;
  };

  change(button) {
    let index = this.state.bar - 1;
    let values = this.state.values;
    values[index] = values[index] + button < 0 ? 0 : values[index] + button;
    let limit = this.state.limit;
    let completed = this.state.completed;
    let label = this.state.label;
    let color = this.state.color;

    let percent = ((values[index] / limit) * 100).toFixed(0);
    if (percent < 100 && percent > 0) {
      label[index] = percent;
      completed[index] = percent;
      color[index] = "dodgerblue";
    } else if (values[index] > 100) {
      label[index] = percent;
      completed[index] = 100;
      color[index] = "red";
    } else {
      label[index] = 0;
      completed[index] = 0;
    }

    this.setState({ label: label, completed: completed, color: color });
  }

  render() {
    return (
      <div style={container} className="App">
        <h1>Progress Bars</h1>
        <h3>Limit: {this.state.limit}</h3>
        <ProgressBar
          value={this.state.values[0]}
          bgcolor={this.state.color[0]}
          label={this.state.label[0]}
          completed={this.state.completed[0]}
          visible={this.state.displayArray[0]}
        />
        <ProgressBar
          value={this.state.values[1]}
          bgcolor={this.state.color[1]}
          label={this.state.label[1]}
          completed={this.state.completed[1]}
          visible={this.state.displayArray[1]}
        />
        <ProgressBar
          value={this.state.values[2]}
          bgcolor={this.state.color[2]}
          label={this.state.label[2]}
          completed={this.state.completed[2]}
          visible={this.state.displayArray[2]}
        />
        <ProgressBar
          value={this.state.values[3]}
          bgcolor={this.state.color[3]}
          label={this.state.label[3]}
          completed={this.state.completed[3]}
          visible={this.state.displayArray[3]}
        />
        <ProgressBar
          value={this.state.values[4]}
          bgcolor={this.state.color[4]}
          label={this.state.label[4]}
          completed={this.state.completed[4]}
          visible={this.state.displayArray[4]}
        />

        <div style={containerStyles}>
          <select
            style={{ width: 200, margin: 30, height: 50 }}
            onChange={(value) => {
              this.setState({ bar: value.target.value.match(/[0-9]/) });
            }}
          >
            {this.state.dropDown.map(this.MakeItem)}
          </select>
        </div>
        <div style={containerStyles}>
          <Button
            style={{
              height: 50,
              width: 50,
              justifyItems: "center",
              margin: 10,
              display: this.state.displayArrayButton[0],
            }}
            onClick={() => this.change(this.state.buttonText[0])}
          >
            {this.state.buttonText[0]}
          </Button>
          <Button
            style={{
              height: 50,
              width: 50,
              justifyItems: "center",
              margin: 10,
              display: this.state.displayArrayButton[1],
            }}
            onClick={() => this.change(this.state.buttonText[1])}
          >
            {this.state.buttonText[1]}
          </Button>
          <Button
            style={{
              height: 50,
              width: 50,
              justifyItems: "center",
              margin: 10,
              display: this.state.displayArrayButton[2],
            }}
            onClick={() => this.change(this.state.buttonText[2])}
          >
            {this.state.buttonText[2]}
          </Button>
          <Button
            style={{
              height: 50,
              width: 50,
              justifyItems: "center",
              margin: 10,
              display: this.state.displayArrayButton[3],
            }}
            onClick={() => this.change(this.state.buttonText[3])}
          >
            {this.state.buttonText[3]}
          </Button>
          <Button
            style={{
              height: 50,
              width: 50,
              justifyItems: "center",
              margin: 10,
              display: this.state.displayArrayButton[4],
            }}
            onClick={() => this.change(this.state.buttonText[4])}
          >
            {this.state.buttonText[4]}
          </Button>
          <Button
            style={{
              height: 50,
              width: 50,
              justifyItems: "center",
              margin: 10,
              display: this.state.displayArrayButton[5],
            }}
            onClick={() => this.change(this.state.buttonText[5])}
          >
            {this.state.buttonText[5]}
          </Button>
        </div>
      </div>
    );
  }
}

const containerStyles = {
  height: 90,
  borderRadius: 50,
  margin: 20,
  flexDirection: "row",
  display: "flex",
  justifyItems: "center",
};
const container = {
  margin: 20,
  justifyItems: "center",
};

export default App;
