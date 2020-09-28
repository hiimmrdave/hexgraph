import{renderSvg as d}from"./renderer.js";import{configureLayout as g}from"./layout.js";import{makeGrid as m}from"./grid.js";import*as y from"./subset.js";import*as I from"./hex.js";const V="hg",v=["line","ring","hexagon","cone","rhombbus"],E="shapes",q=g(0,{x:5,y:5},{x:45,y:45},{x:90,y:90}),C=m({size:5}),b=I.makeNode({q:1,r:-1,s:0},"Cell"),z={q:-2,r:4,s:-2},B=[y.line({source:b,toward:z}),y.ring({source:b,size:3}),y.hexagon({source:b,size:3}),y.cone({source:b,toward:z,size:4}),y.rhombus({source:b,toward:z,size:3})];export const renderContext=document.getElementById("hg"),inputs=document.querySelector('form[id="params"]'),getFloatValue=e=>{const t=document.getElementById(e);return parseFloat(t.value)},getIntValue=e=>{const t=document.getElementById(e);return parseInt(t.value,10)},getRadioValue=e=>document.querySelector(`input[name="${e}"]:checked`).value,getStringValue=e=>document.getElementById(e).value,getForm=()=>{return["hg",g(getFloatValue("orientation")*(Math.PI/12),{x:getIntValue("hsx"),y:getIntValue("hsy")},{x:getIntValue("orx"),y:getIntValue("ory")},{x:getIntValue("csx"),y:getIntValue("csy")}),m({shape:(e="shape",document.querySelector(`input[name="${e}"]:checked`).value),size:{a:getIntValue("gs1"),b:getIntValue("gs2")},populate:!0})];var t},rend=()=>{const e=["hg",g(getFloatValue("orientation")*(Math.PI/12),{x:getIntValue("hsx"),y:getIntValue("hsy")},{x:getIntValue("orx"),y:getIntValue("ory")},{x:getIntValue("csx"),y:getIntValue("csy")}),m({shape:(t="shape",document.querySelector(`input[name="${t}"]:checked`).value),size:{a:getIntValue("gs1"),b:getIntValue("gs2")},populate:!0})];var t;let n;var a;for(document.getElementById("shapes").style.width=(a="csx",document.getElementById(a).value)+"px";n=renderContext.lastChild;)renderContext.removeChild(n);d(...e)};document.addEventListener("DOMContentLoaded",()=>{rend();const e=document.getElementById("shapes");v.forEach((t,n)=>{const a=document.createElement("div"),o=B[n];a.id=t,a.style.display="inline-block",e.appendChild(a),d(t,q,C);a.querySelector(`[data-hex-node-id="${b.id}"]`).classList.add("source"),o.forEach(e=>{const n=document.querySelector(`#${t} [data-hex-node-id="${e.id}"]`);n&&n.classList.add("hilit")})})}),inputs.addEventListener("input",rend);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbInJlbmRlclN2ZyIsImNvbmZpZ3VyZUxheW91dCIsIm1ha2VHcmlkIiwiU3Vic2V0IiwiSGV4IiwiZ3JpZFRhcmdldCIsInNoYXBlcyIsInNoYXBlc0hvbGRlciIsInNoYXBlTGF5b3V0Q29uZmlnIiwieCIsInkiLCJzaGFwZUdyaWQiLCJzaXplIiwic291cmNlIiwibWFrZU5vZGUiLCJxIiwiciIsInMiLCJ0b3dhcmQiLCJzdWJzZXRzIiwibGluZSIsInJpbmciLCJoZXhhZ29uIiwiY29uZSIsInJob21idXMiLCJyZW5kZXJDb250ZXh0IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImlucHV0cyIsInF1ZXJ5U2VsZWN0b3IiLCJnZXRGbG9hdFZhbHVlIiwiZWxlbWVudElkIiwiaW5wdXQiLCJwYXJzZUZsb2F0IiwidmFsdWUiLCJnZXRJbnRWYWx1ZSIsInBhcnNlSW50IiwiZ2V0UmFkaW9WYWx1ZSIsImVsZW1lbnROYW1lIiwiZ2V0U3RyaW5nVmFsdWUiLCJnZXRGb3JtIiwiTWF0aCIsIlBJIiwic2hhcGUiLCJhIiwiYiIsInBvcHVsYXRlIiwicmVuZCIsImNvbmZpZyIsImxhc3QiLCJzdHlsZSIsIndpZHRoIiwibGFzdENoaWxkIiwicmVtb3ZlQ2hpbGQiLCJhZGRFdmVudExpc3RlbmVyIiwiaG9sZGVyIiwiZm9yRWFjaCIsImluZGV4Iiwic2hhcGVDb250YWluZXIiLCJjcmVhdGVFbGVtZW50Iiwic3Vic2V0IiwiaWQiLCJkaXNwbGF5IiwiYXBwZW5kQ2hpbGQiLCJjbGFzc0xpc3QiLCJhZGQiLCJlIiwiY2VsbCJdLCJtYXBwaW5ncyI6Im9CQUtTQSxNQUFpQiwwQ0FDSEMsTUFBdUIsaUNBQ2pCQyxNQUFnQixzQkFDakNDLE1BQVksd0JBQ1pDLE1BQVMsV0FRckIsTUFBTUMsRUFBYSxLQUNqQkMsRUFBUyxDQUFDLE9BQVEsT0FBUSxVQUFXLE9BQVEsWUFDN0NDLEVBQWUsU0FDZkMsRUFBa0NQLEVB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