import{cellPoints as t,cubeToPoint as e}from"./layout.js";const n="http://www.w3.org/2000/svg";function r(e,n){return`M${t({cell:e,layout:n}).map((t=>`${t.x},${t.y}`)).join(" L")}z`}function i({size:t}){const e=document.createElementNS(n,"svg");return e.setAttribute("xmlns",n),e.setAttribute("viewBox",`0 0 ${t.x} ${t.y}`),e.setAttribute("width",t.x.toString(10)),e.setAttribute("height",t.y.toString(10)),Object.assign(e.style,{width:t.x.toString(10),height:t.y.toString(10),padding:"0",margin:"0"}),e}const s={Cell:"red",Vertex:"green",Edge:"blue"};function d(t,r){const i=e(t,r),s=document.createElementNS(n,"g");return s.appendChild(c(i,t)),s.appendChild(o(i,t)),s}function c({x:t,y:e},{q:r,r:i,s:d,id:c,kind:o}){const a=document.createElementNS(n,"circle");return a.classList.add(o),a.style.transformOrigin=`${t} ${e}`,a.style.fill=s[o],a.setAttribute("cx",`${t}`),a.setAttribute("cy",`${e}`),a.setAttribute("r","2"),Object.assign(a.dataset,{q:r,r:i,s:d,id:c}),a}function o({x:t,y:e},{q:r,r:i,s:d,kind:c}){const o=document.createElementNS(n,"text");return o.textContent=`${6*r}, ${6*i}, ${6*d}`,o.style.fill=s[c],o.setAttribute("x",`${t}`),o.setAttribute("y",`${e}`),o.setAttribute("text-anchor","middle"),o.setAttribute("font-size","0.75em"),o}function a(t,i){const s=document.createElementNS(n,"path"),d=e(t,i);return s.classList.add("cell"),s.style.transformOrigin=`${d.x}px ${d.y}px`,s.setAttribute("d",r(t,i)),s.dataset.hexNodeId=t.id,Object.assign(s.dataset,{q:t.q,r:t.r,s:t.s}),s}export function renderSvg(t,e,n){const r=document.getElementById(t)??document.createElement("div"),s=i(e);n.forEach((t=>{"Cell"===t.kind&&s.appendChild(a(t,e))})),n.forEach((t=>{s.appendChild(d(t,e))})),r.appendChild(s)}export function buildCanvas(t,e){const n=document.getElementById(t)??document.createElement("div"),r=document.createElement("canvas");return r.setAttribute("width",e.size.x.toString(10)),r.setAttribute("height",e.size.y.toString(10)),n.appendChild(r),r}export function renderCanvasFrame(t,e,n){t.clearRect(0,0,e.size.x,e.size.y),n.forEach((n=>{"Cell"===n.kind&&t.stroke(new Path2D(r(n,e)))}))}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZW5kZXJlci50cyJdLCJuYW1lcyI6WyJjZWxsUG9pbnRzIiwiY3ViZVRvUG9pbnQiLCJTVkdOUyIsImNlbGxQYXRoIiwiY2VsbCIsImxheW91dCIsIm1hcCIsImUiLCJ4IiwieSIsImpvaW4iLCJidWlsZFN2Z1Jvb3QiLCJzaXplIiwic3ZnUm9vdCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudE5TIiwic2V0QXR0cmlidXRlIiwidG9TdHJpbmciLCJPYmplY3QiLCJhc3NpZ24iLCJzdHlsZSIsIndpZHRoIiwiaGVpZ2h0IiwicGFkZGluZyIsIm1hcmdpbiIsIm5vZGVDb2xvcnMiLCJDZWxsIiwiVmVydGV4IiwiRWRnZSIsImJ1aWxkU3ZnTWFya2VyIiwicG9pbnQiLCJzcG90IiwiZ3JvdXAiLCJhcHBlbmRDaGlsZCIsImJ1aWxkU3ZnRG90IiwiYnVpbGRTdmdMYWJlbCIsInEiLCJyIiwicyIsImlkIiwia2luZCIsImRvdCIsImNsYXNzTGlzdCIsImFkZCIsInRyYW5zZm9ybU9yaWdpbiIsImZpbGwiLCJkYXRhc2V0IiwibGFiZWwiLCJ0ZXh0Q29udGVudCIsImJ1aWxkU3ZnQ2VsbCIsInBhdGgiLCJjIiwiaGV4Tm9kZUlkIiwicmVuZGVyU3ZnIiwidGFyZ2V0SWQiLCJncmlkIiwidGFyZ2V0RWxlbSIsImdldEVsZW1lbnRCeUlkIiwiY3JlYXRlRWxlbWVudCIsImZvckVhY2giLCJub2RlIiwiYnVpbGRDYW52YXMiLCJjYW52YXNSb290IiwicmVuZGVyQ2FudmFzRnJhbWUiLCJjdHgiLCJjbGVhclJlY3QiLCJzdHJva2UiLCJQYXRoMkQiXSwibWFwcGluZ3MiOiJxQkFBaUNBLGlCQUFZQyxNQUFtQixjQUloRSxNQUFNQyxFQUFRLDZCQU9kLFNBQVNDLEVBQVNDLEVBQWdCQyxHQUNoQyxNQUFPLElBQUlMLEVBQVcsQ0FBRUksS0FBQUEsRUFBTUMsT0FBQUEsSUFDM0JDLEtBQUtDLEdBQU0sR0FBR0EsRUFBRUMsS0FBS0QsRUFBRUUsTUFDdkJD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