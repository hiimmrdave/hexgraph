import * as Renderer from "./renderer.js";
import * as Layout from "./layout.js";
import * as Grid from "./grid.js";
export const gridTarget = "hg", renderContext = document.getElementById(gridTarget), inputs = document.querySelector('form[id="params"]'), getIntValue = (elementId) => {
    const input = document.getElementById(elementId);
    return parseInt(input.value, 10);
}, getRadioValue = (elementName) => {
    const input = document.querySelector(`input[name="${elementName}"]:checked`);
    return input.value;
}, getForm = () => {
    return [
        gridTarget,
        Layout.config((getIntValue("orientation") * Math.PI) / 12, { x: getIntValue("hsx"), y: getIntValue("hsy") }, { x: getIntValue("orx"), y: getIntValue("ory") }, { x: getIntValue("csx"), y: getIntValue("csy") }),
        Grid.make({
            shape: getRadioValue("shape"),
            size: { x: getIntValue("gs1"), y: getIntValue("gs1") },
            populate: true,
        }),
    ];
}, rend = () => {
    const config = getForm();
    let last;
    while ((last = renderContext.lastChild)) {
        renderContext.removeChild(last);
    }
    Renderer.render(...config);
};
document.addEventListener("DOMContentLoaded", rend);
inputs.addEventListener("input", rend);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLFFBQVEsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxLQUFLLE1BQU0sTUFBTSxhQUFhLENBQUM7QUFDdEMsT0FBTyxLQUFLLElBQUksTUFBTSxXQUFXLENBQUM7QUFjbEMsTUFBTSxDQUFDLE1BQU0sVUFBVSxHQUFHLElBQUksRUFDNUIsYUFBYSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFnQixFQUNsRSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBb0IsRUFDdkUsV0FBVyxHQUFHLENBQUMsU0FBaUIsRUFBVSxFQUFFO0lBQzFDLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFxQixDQUFDO0lBQ3JFLE9BQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDbkMsQ0FBQyxFQUNELGFBQWEsR0FBRyxDQUFDLFdBQW1CLEVBQVUsRUFBRTtJQUM5QyxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUNsQyxlQUFlLFdBQVcsWUFBWSxDQUNuQixDQUFDO0lBQ3RCLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQztBQUNyQixDQUFDLEVBQ0QsT0FBTyxHQUFHLEdBQW9DLEVBQUU7SUFDOUMsT0FBTztRQUNMLFVBQVU7UUFDVixNQUFNLENBQUMsTUFBTSxDQUNYLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQzNDLEVBQUUsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEVBQUUsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQ2hELEVBQUUsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEVBQUUsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQ2hELEVBQUUsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEVBQUUsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQ2pEO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNSLEtBQUssRUFBRSxhQUFhLENBQUMsT0FBTyxDQUFjO1lBQzFDLElBQUksRUFBRSxFQUFFLENBQUMsRUFBRSxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN0RCxRQUFRLEVBQUUsSUFBSTtTQUNmLENBQUM7S0FDSCxDQUFDO0FBQ0osQ0FBQyxFQUNELElBQUksR0FBRyxHQUFTLEVBQUU7SUFDaEIsTUFBTSxNQUFNLEdBQUcsT0FBTyxFQUFFLENBQUM7SUFDekIsSUFBSSxJQUFJLENBQUM7SUFDVCxPQUFPLENBQUMsSUFBSSxHQUFHLGFBQWEsQ0FBQyxTQUFTLENBQUMsRUFBRTtRQUN2QyxhQUFhLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ2pDO0lBQ0QsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDO0FBQzdCLENBQUMsQ0FBQztBQUVKLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNwRCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDIn0=