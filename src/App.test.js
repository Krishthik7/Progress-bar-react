import App, { getEndpointData } from "./App";
import { shallow } from "enzyme";
import ProgressBar from "./ProgressBar";
import { Button } from "react-bootstrap";


describe("App", () => {
  var appWrapper;
  beforeAll(() => {
    appWrapper = shallow(<App />);
  });

  it("renders the endpoint data", async () => {
    var result = await getEndpointData();
    //length of bars array is between 2 to 5
    expect(result.bars.length).toBeGreaterThanOrEqual(2);
    expect(result.bars.length).toBeLessThanOrEqual(5);


    //length of button array is between 4 to 6
    expect(result.buttons.length).toBeGreaterThanOrEqual(4);
    expect(result.buttons.length).toBeLessThanOrEqual(6);

    //limit should be greate than 1
    expect(result.limit).toBeGreaterThanOrEqual(1);
  });

  it("has state", () => {
    const appState = appWrapper.state();

    expect(appState).not.toBeNull();
  });

  it("has properties", () => {
    const appState = appWrapper.state();

    expect(appState.displayArray).toBeDefined();

    expect(appState.bar).toBeDefined();
    expect(appState.completed).toBeDefined();

    expect(appState.values).toBeDefined();
    expect(appState.limit).toBeDefined();

    expect(appState.dropDown).toBeDefined();

    expect(appState.color).toBeDefined();
  });

  it("renders the progress bars", () => {
    appWrapper.find(ProgressBar);
  });

  it("State data passed to progress bars", () => {
    const progressBar = appWrapper.find(ProgressBar);
    expect(progressBar.at(0).props().completed).toEqual(
      appWrapper.state().completed[0]
    );

    expect(progressBar.at(0).props().label).toEqual(
      appWrapper.state().label[0]
    );

    expect(progressBar.at(0).props().value).toEqual(
      appWrapper.state().values[0]
    );

    expect(progressBar.at(0).props().visible).toEqual(
      appWrapper.state().displayArray[0]
    );
    expect(progressBar.at(0).props().bgcolor).toEqual(
      appWrapper.state().color[0]
    );

    expect(progressBar.at(2).props().completed).toEqual(
      appWrapper.state().completed[2]
    );

    expect(progressBar.at(2).props().label).toEqual(
      appWrapper.state().label[2]
    );

    expect(progressBar.at(2).props().value).toEqual(
      appWrapper.state().values[2]
    );

    expect(progressBar.at(2).props().visible).toEqual(
      appWrapper.state().displayArray[2]
    );
    expect(progressBar.at(2).props().bgcolor).toEqual(
      appWrapper.state().color[2]
    );

    expect(progressBar.at(4).props().completed).toEqual(
      appWrapper.state().completed[4]
    );

    expect(progressBar.at(4).props().label).toEqual(
      appWrapper.state().label[4]
    );

    expect(progressBar.at(4).props().value).toEqual(
      appWrapper.state().values[4]
    );

    expect(progressBar.at(4).props().visible).toEqual(
      appWrapper.state().displayArray[4]
    );
    expect(progressBar.at(4).props().bgcolor).toEqual(
      appWrapper.state().color[4]
    );
  });

  it("Renders the buttons with correct data and checks funtionality", async () => {
    let appState = appWrapper.state();
    let buttons = appWrapper.find(Button);
    expect(buttons.exists()).toBeTruthy();

    let oldVal = appState.values[0];
    buttons.at(0).simulate("click");

    expect(appState.values[0]).toEqual(oldVal + parseInt(buttons.at(0).text()));
  });
});
