import * as Renderer from "./renderer.js";
import { config } from "./layout.js";
import { make } from "./grid.js";
export const gridTarget = "hg", renderContext = document.getElementById(gridTarget), inputs = document.querySelector('form[id="params"]'), getIntValue = (elementId) => {
    const input = document.getElementById(elementId);
    return parseInt(input.value, 10);
}, getRadioValue = (elementName) => {
    const input = document.querySelector(`input[name="${elementName}"]:checked`);
    return input.value;
}, getForm = () => {
    return [
        gridTarget,
        config((getIntValue("orientation") * Math.PI) / 12, { x: getIntValue("hsx"), y: getIntValue("hsy") }, { x: getIntValue("orx"), y: getIntValue("ory") }, { x: getIntValue("csx"), y: getIntValue("csy") }),
        make({
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLFFBQVEsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFnQixNQUFNLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDbkQsT0FBTyxFQUFzQixJQUFJLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFhckQsTUFBTSxDQUFDLE1BQU0sVUFBVSxHQUFHLElBQUksRUFDNUIsYUFBYSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFnQixFQUNsRSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBb0IsRUFDdkUsV0FBVyxHQUFHLENBQUMsU0FBaUIsRUFBVSxFQUFFO0lBQzFDLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFxQixDQUFDO0lBQ3JFLE9BQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDbkMsQ0FBQyxFQUNELGFBQWEsR0FBRyxDQUFDLFdBQW1CLEVBQVUsRUFBRTtJQUM5QyxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUNsQyxlQUFlLFdBQVcsWUFBWSxDQUNuQixDQUFDO0lBQ3RCLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQztBQUNyQixDQUFDLEVBQ0QsT0FBTyxHQUFHLEdBQW9DLEVBQUU7SUFDOUMsT0FBTztRQUNMLFVBQVU7UUFDVixNQUFNLENBQ0osQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFDM0MsRUFBRSxDQUFDLEVBQUUsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsRUFBRSxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFDaEQsRUFBRSxDQUFDLEVBQUUsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsRUFBRSxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFDaEQsRUFBRSxDQUFDLEVBQUUsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsRUFBRSxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FDakQ7UUFDRCxJQUFJLENBQUM7WUFDSCxLQUFLLEVBQUUsYUFBYSxDQUFDLE9BQU8sQ0FBYztZQUMxQyxJQUFJLEVBQUUsRUFBRSxDQUFDLEVBQUUsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsRUFBRSxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDdEQsUUFBUSxFQUFFLElBQUk7U0FDZixDQUFDO0tBQ0gsQ0FBQztBQUNKLENBQUMsRUFDRCxJQUFJLEdBQUcsR0FBUyxFQUFFO0lBQ2hCLE1BQU0sTUFBTSxHQUFHLE9BQU8sRUFBRSxDQUFDO0lBQ3pCLElBQUksSUFBSSxDQUFDO0lBQ1QsT0FBTyxDQUFDLElBQUksR0FBRyxhQUFhLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFDdkMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNqQztJQUNELFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQztBQUM3QixDQUFDLENBQUM7QUFFSixRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDcEQsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyJ9