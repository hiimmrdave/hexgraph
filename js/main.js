import{buildCanvas as d,renderCanvasFrame as g,renderSvg as h}from"./renderer.js";import{configureLayout as v,rotateTransform as y,shearTransform as I,scaleTransform as C}from"./layout.js";import{makeGrid as V}from"./grid.js";import*as E from"./subset.js";import*as F from"./hex.js";const S="svghg",B="canvhg",q=["line","ring","hexagon","cone","rhombbus"],k="shapes",z=v({x:45,y:45},{x:90,y:90},[C(5,5)]),j=V({size:5}),L=F.makeNode({q:1,r:-1,s:0},"Cell"),$={q:-2,r:4,s:-2},M=[E.line({source:L,toward:$}),E.ring({source:L,size:3}),E.hexagon({source:L,size:3}),E.cone({source:L,toward:$,size:4}),E.rhombus({source:L,toward:$,size:3})];export const renderContext=document.getElementById("svghg"),inputs=document.querySelector('form[id="params"]'),getFloatValue=e=>{const t=document.getElementById(e);return parseFloat(t.value)},getIntValue=e=>{const t=document.getElementById(e);return parseInt(t.value,10)},getRadioValue=e=>document.querySelector(`input[name="${e}"]:checked`).value,getStringValue=e=>document.getElementById(e).value,getForm=()=>{return["svghg",v({x:getIntValue("orx"),y:getIntValue("ory")},{x:getIntValue("csx"),y:getIntValue("csy")},[y(getFloatValue("orientation")*Math.PI/12),I(getFloatValue("shx"),getFloatValue("shy")),C(getIntValue("hsx"),getIntValue("hsy"))]),V({shape:(e="shape",document.querySelector(`input[name="${e}"]:checked`).value),size:{a:getIntValue("gs1"),b:getIntValue("gs2")},populate:!0})];var e},rendSvg=()=>{const e=getForm();let t;var n;for(document.getElementById("shapes").style.width=(n="csx",document.getElementById(n).value)+"px";t=renderContext.lastChild;)renderContext.removeChild(t);h(...e)},makeCanv=()=>{const[,e,t]=getForm(),n=d("canvhg",e),o=n.getContext("2d");return document.getElementById("canvhg").appendChild(n),g(o,e,t),o},rendCanv=e=>{g(e,getForm()[1],getForm()[2])};let D;document.addEventListener("DOMContentLoaded",()=>{rendSvg(),D=makeCanv(),rendCanv(D);const e=document.getElementById("shapes");q.forEach((t,n)=>{const o=document.createElement("div"),r=M[n];o.id=t,o.style.display="inline-block",e.appendChild(o),h(t,z,j);o.querySelector(`[data-hex-node-id="${L.id}"]`).classList.add("source"),r.forEach(e=>{const n=document.querySelector(`#${t} [data-hex-node-id="${e.id}"]`);n&&n.classList.add("hilit")})})}),inputs.addEventListener("input",()=>{rendSvg(),rendCanv(D)});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbImJ1aWxkQ2FudmFzIiwicmVuZGVyQ2FudmFzRnJhbWUiLCJyZW5kZXJTdmciLCJjb25maWd1cmVMYXlvdXQiLCJyb3RhdGVUcmFuc2Zvcm0iLCJzaGVhclRyYW5zZm9ybSIsInNjYWxlVHJhbnNmb3JtIiwibWFrZUdyaWQiLCJTdWJzZXQiLCJIZXgiLCJzdmdHcmlkVGFyZ2V0IiwiY2FudmFzR3JpZFRhcmdldCIsInNoYXBlcyIsInNoYXBlc0hvbGRlciIsInNoYXBlTGF5b3V0Q29uZmlnIiwieCIsInkiLCJzaGFwZUdyaWQiLCJzaXplIiwic291cmNlIiwibWFrZU5vZGUiLCJxIiwiciIsInMiLCJ0b3dhcmQiLCJzdWJzZXRzIiwibGluZSIsInJpbmciLCJoZXhhZ29uIiwiY29uZSIsInJob21idXMiLCJyZW5kZXJDb250ZXh0IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImlucHV0cyIsInF1ZXJ5U2VsZWN0b3IiLCJnZXRGbG9hdFZhbHVlIiwiZWxlbWVudElkIiwiaW5wdXQiLCJwYXJzZUZsb2F0IiwidmFsdWUiLCJnZXRJbnRWYWx1ZSIsInBhcnNlSW50IiwiZ2V0UmFkaW9WYWx1ZSIsImVsZW1lbnROYW1lIiwiZ2V0U3RyaW5nVmFsdWUiLCJnZXRGb3JtIiwiTWF0aCIsIlBJIiwic2hhcGUiLCJhIiwiYiIsInBvcHVsYXRlIiwicmVuZFN2ZyIsImNvbmZpZyIsImxhc3QiLCJzdHlsZSIsIndpZHRoIiwibGFzdENoaWxkIiwicmVtb3ZlQ2hpbGQiLCJtYWtlQ2FudiIsImxheW91dCIsImdyaWQiLCJjYW52YXMiLCJjdHgiLCJnZXRDb250ZXh0IiwiYXBwZW5kQ2hpbGQiLCJyZW5kQ2FudiIsImFkZEV2ZW50TGlzdGVuZXIiLCJob2xkZXIiLCJmb3JFYWNoIiwiaW5kZXgiLCJzaGFwZUNvbnRhaW5lciIsImNyZWF0ZUVsZW1lbnQiLCJzdWJzZXQiLCJpZCIsImRpc3BsYXkiLCJjbGFzc0xpc3Qi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