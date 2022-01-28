import { thousandthRound as e } from "./math.js";
export const getFloatValue = (t) => {
    const e = document.getElementById(t);
    if ("object" == typeof e) return parseFloat(e.value);
    throw "sorry, no";
  },
  getIntValue = (t) => {
    const e = document.getElementById(t);
    if ("object" == typeof e) return parseInt(e.value, 10);
    throw "sorry, no";
  },
  getRadioValue = (t) => {
    const e = document.querySelector(`input[name="${t}"]:checked`);
    if ("object" == typeof e) return e.value;
    throw "sorry, no";
  },
  getStringValue = (t) => {
    const e = document.getElementById(t);
    if ("object" == typeof e) return e.value;
    throw "sorry, no";
  },
  getCheckbox = (t) => {
    const e = document.getElementById(t);
    if ("object" == typeof e) return e.checked;
    throw "sorry, no";
  };
export const makeVulgar = (t) => {
  switch (Math.abs(e(t - Math.trunc(t)))) {
    case 0.333:
      return `${ut(t)}⅓`;
    case 0.666:
      return `${ut(t)}⅔`;
    case 0.5:
      return `${ut(t)}½`;
    default:
      return `${t}`;
  }
};
const ut = (t) => `${t < 0 ? "-" : ""}${Math.abs(Math.trunc(t))}`;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJ0aG91c2FuZHRoUm91bmQiLCJnZXRGbG9hdFZhbHVlIiwiZWxlbWVudElkIiwiaW5wdXQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwicGFyc2VGbG9hdCIsInZhbHVlIiwiZ2V0SW50VmFsdWUiLCJwYXJzZUludCIsImdldFJhZGlvVmFsdWUiLCJlbGVtZW50TmFtZSIsInF1ZXJ5U2VsZWN0b3IiLCJnZXRTdHJpbmdWYWx1ZSIsImdldENoZWNrYm94IiwiY2hlY2tlZCIsIm1ha2VWdWxnYXIiLCJuIiwiTWF0aCIsImFicyIsInRydW5jIiwidHJ1bmNUb1NpZ25lZFN0cmluZyJdLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlscy50cyJdLCJtYXBwaW5ncyI6IjBCQUFTQSxNQUF1QixtQkFHekIsTUFBTUMsY0FBaUJDLElBQzFCLE1BQU1DLEVBQVFDLFNBQVNDLGVBQWVILEdBQ3RDLEdBQXFCLGlCQUFWQyxFQUNULE9BQU9HLFdBQVlILEVBQTJCSSxPQUVoRCxLQUFNLGFBRVJDLFlBQWVOLElBQ2IsTUFBTUMsRUFBUUMsU0FBU0MsZUFBZUgsR0FDdEMsR0FBcUIsaUJBQVZDLEVBQ1QsT0FBT00sU0FBVU4sRUFBMkJJLE1BQU8sSUFFckQsS0FBTSxhQUVSRyxjQUFpQkMsSUFDZixNQUFNUixFQUFRQyxTQUFTUSxjQUFjLGVBQWVELGVBQ3BELEdBQXFCLGlCQUFWUixFQUNULE9BQVFBLEVBQTJCSSxNQUVyQyxLQUFNLGFBRVJNLGVBQWtCWCxJQUNoQixNQUFNQyxFQUFRQyxTQUFTQyxlQUFlSCxHQUN0QyxHQUFxQixpQkFBVkMsRUFDVCxPQUFRQSxFQUEyQkksTUFFckMsS0FBTSxhQUVSTyxZQUFlWixJQUNiLE1BQU1DLEVBQVFDLFNBQVNDLGVBQWVILEdBQ3RDLEdBQXFCLGlCQUFWQyxFQUNULE9BQVFBLEVBQTJCWSxRQUVyQyxLQUFNLG9CQVdILE1BQU1DLFdBQWNDLElBQ3pCLE9BQVFDLEtBQUtDLElBQUluQixFQUFnQmlCLEVBQUlDLEtBQUtFLE1BQU1ILE1BQzlDLElBQUssS0FDSCxNQUFPLEdBQUdJLEdBQW9CSixNQUNoQyxJQUFLLEtBQ0gsTUFBTyxHQUFHSSxHQUFvQkosTUFDaEMsSUFBSyxHQUNILE1BQU8sR0FBR0ksR0FBb0JKLE1BQ2hDLFFBQ0UsTUFBTyxHQUFHQSxNQWNoQixNQUFNSSxHQUF1QkosR0FDcEIsR0FBR0EsRUFBSSxFQUFJLElBQU0sS0FBS0MsS0FBS0MsSUFBSUQsS0FBS0UsTUFBTUgifQ==
