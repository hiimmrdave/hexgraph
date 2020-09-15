import{renderSvg as g}from"./renderer.js";import{configureLayout as m}from"./layout.js";import{makeGrid as y}from"./grid.js";import*as I from"./subset.js";import*as V from"./hex.js";const v="hg",E=["line","ring","hexagon","cone","rhombbus"],q="shapes",C=m(0,{x:5,y:5},{x:45,y:45},{x:90,y:90}),b=y({size:5}),z=V.makeNode({q:1,r:-1,s:0},"Cell"),B={q:-2,r:4,s:-2},S=[I.line({source:z,toward:B}),I.ring({source:z,size:3}),I.hexagon({source:z,size:3}),I.cone({source:z,toward:B,size:4}),I.rhombus({source:z,toward:B,size:3})];export const renderContext=document.getElementById("hg"),inputs=document.querySelector('form[id="params"]'),getFloatValue=e=>{const t=document.getElementById(e);return parseFloat(t.value)},getIntValue=e=>{const t=document.getElementById(e);return parseInt(t.value,10)},getRadioValue=e=>document.querySelector(`input[name="${e}"]:checked`).value,getStringValue=e=>document.getElementById(e).value,getForm=()=>{return["hg",m(getFloatValue("orientation")*Math.PI/12,{x:getIntValue("hsx"),y:getIntValue("hsy")},{x:getIntValue("orx"),y:getIntValue("ory")},{x:getIntValue("csx"),y:getIntValue("csy")}),y({shape:(e="shape",document.querySelector(`input[name="${e}"]:checked`).value),size:{a:getIntValue("gs1"),b:getIntValue("gs2")},populate:!0})];var t},rend=()=>{const e=["hg",m(getFloatValue("orientation")*Math.PI/12,{x:getIntValue("hsx"),y:getIntValue("hsy")},{x:getIntValue("orx"),y:getIntValue("ory")},{x:getIntValue("csx"),y:getIntValue("csy")}),y({shape:(t="shape",document.querySelector(`input[name="${t}"]:checked`).value),size:{a:getIntValue("gs1"),b:getIntValue("gs2")},populate:!0})];var t;let n;var a;for(document.getElementById("shapes").style.width=(a="csx",document.getElementById(a).value)+"px";n=renderContext.lastChild;)renderContext.removeChild(n);g(...e)};document.addEventListener("DOMContentLoaded",()=>{rend();const e=document.getElementById("shapes");E.forEach((t,n)=>{const a=document.createElement("div"),o=S[n];a.id=t,a.style.display="inline-block",e.appendChild(a),g(t,C,b);a.querySelector(`[data-hex-node-id="${z.id}"]`).classList.add("source"),o.forEach(e=>{const n=document.querySelector(`#${t} [data-hex-node-id="${e.id}"]`);n&&n.classList.add("hilit")})})}),inputs.addEventListener("input",rend);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbInJlbmRlclN2ZyIsImNvbmZpZ3VyZUxheW91dCIsIm1ha2VHcmlkIiwiU3Vic2V0IiwiSGV4IiwiZ3JpZFRhcmdldCIsInNoYXBlcyIsInNoYXBlc0hvbGRlciIsInNoYXBlTGF5b3V0Q29uZmlnIiwieCIsInkiLCJzaGFwZUdyaWQiLCJzaXplIiwic291cmNlIiwibWFrZU5vZGUiLCJxIiwiciIsInMiLCJ0b3dhcmQiLCJzdWJzZXRzIiwibGluZSIsInJpbmciLCJoZXhhZ29uIiwiY29uZSIsInJob21idXMiLCJyZW5kZXJDb250ZXh0IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImlucHV0cyIsInF1ZXJ5U2VsZWN0b3IiLCJnZXRGbG9hdFZhbHVlIiwiZWxlbWVudElkIiwiaW5wdXQiLCJwYXJzZUZsb2F0IiwidmFsdWUiLCJnZXRJbnRWYWx1ZSIsInBhcnNlSW50IiwiZ2V0UmFkaW9WYWx1ZSIsImVsZW1lbnROYW1lIiwiZ2V0U3RyaW5nVmFsdWUiLCJnZXRGb3JtIiwiTWF0aCIsIlBJIiwic2hhcGUiLCJhIiwiYiIsInBvcHVsYXRlIiwicmVuZCIsImNvbmZpZyIsImxhc3QiLCJzdHlsZSIsIndpZHRoIiwibGFzdENoaWxkIiwicmVtb3ZlQ2hpbGQiLCJhZGRFdmVudExpc3RlbmVyIiwiaG9sZGVyIiwiZm9yRWFjaCIsImluZGV4Iiwic2hhcGVDb250YWluZXIiLCJjcmVhdGVFbGVtZW50Iiwic3Vic2V0IiwiaWQiLCJkaXNwbGF5IiwiYXBwZW5kQ2hpbGQiLCJjbGFzc0xpc3QiLCJhZGQiLCJlIiwiY2VsbCJdLCJtYXBwaW5ncyI6Im9CQUtTQSxNQUFpQiwwQ0FDSEMsTUFBdUIsaUNBQ2pCQyxNQUFnQixzQkFDakNDLE1BQVksd0JBQ1pDLE1BQVMsV0FRckIsTUFBTUMsRUFBYSxLQUNqQkMsRUFBUyxDQUFDLE9BQVEsT0FBUSxVQUFXLE9BQVEsWUFDN0NDLEVBQWUsU0FDZkMsRUFBa0NQLEVB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