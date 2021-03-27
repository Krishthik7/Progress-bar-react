import App, { getEndpointData } from "./App";
import { shallow } from "enzyme";
import ProgressBar from "./ProgressBar";  

describe("Progress Bar", () => {
    it("renders empty div if values arent't passed", () => {
        const appWrapper = shallow(<ProgressBar />);
        expect(appWrapper.text()).not.toContain("Current value");
    });

    it("renders progress bar if value are passed", () => {
        const values = 40;
        const completed = 75;
        const label = 75;
        const appWrapper = shallow(<ProgressBar value={values} completed={completed} label={label} />);
        expect(appWrapper.text()).toContain(label);
        expect(appWrapper.text()).toContain(completed);
        expect(appWrapper.text()).toContain("Current value: " + values);
    });
});
