import*as d from"./renderer.js";import{config as g}from"./layout.js";import{make as m}from"./grid.js";export const gridTarget="hg",renderContext=document.getElementById("hg"),inputs=document.querySelector('form[id="params"]'),getIntValue=e=>{const t=document.getElementById(e);return parseInt(t.value,10)},getRadioValue=e=>document.querySelector(`input[name="${e}"]:checked`).value,getForm=()=>{return["hg",g(getIntValue("orientation")*Math.PI/12,{x:getIntValue("hsx"),y:getIntValue("hsy")},{x:getIntValue("orx"),y:getIntValue("ory")},{x:getIntValue("csx"),y:getIntValue("csy")}),m({shape:(e="shape",document.querySelector(`input[name="${e}"]:checked`).value),size:{x:getIntValue("gs1"),y:getIntValue("gs1")},populate:!0})];var e},rend=()=>{const e=getForm();let t;for(;t=renderContext.lastChild;)renderContext.removeChild(t);d.render(...e)};document.addEventListener("DOMContentLoaded",rend),inputs.addEventListener("input",rend);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJSZW5kZXJlciIsImNvbmZpZyIsIm1ha2UiLCJncmlkVGFyZ2V0IiwicmVuZGVyQ29udGV4dCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJpbnB1dHMiLCJxdWVyeVNlbGVjdG9yIiwiZ2V0SW50VmFsdWUiLCJlbGVtZW50SWQiLCJpbnB1dCIsInBhcnNlSW50IiwidmFsdWUiLCJnZXRSYWRpb1ZhbHVlIiwiZWxlbWVudE5hbWUiLCJnZXRGb3JtIiwiTWF0aCIsIlBJIiwieCIsInkiLCJzaGFwZSIsInNpemUiLCJwb3B1bGF0ZSIsInJlbmQiLCJsYXN0IiwibGFzdENoaWxkIiwicmVtb3ZlQ2hpbGQiLCJyZW5kZXIiLCJhZGRFdmVudExpc3RlbmVyIl0sIm1hcHBpbmdzIjoiVUFBWUEsTUFBYyxpQ0FDSEMsTUFBYyw2QkFDUkMsTUFBWSxtQkFhbEMsTUFBTUMsV0FBYSxLQUN4QkMsY0FBZ0JDLFNBQVNDLGVBREQsTUFFeEJDLE9BQVNGLFNBQVNHLGNBQWMscUJBQ2hDQyxZQUFlQyxJQUNiLE1BQU1DLEVBQVFOLFNBQVNDLGVBQWVJLEdBQ3RDLE9BQU9FLFNBQVNELEVBQU1FLE1BQU8sS0FFL0JDLGNBQWlCQyxHQUNEVixTQUFTRyxjQUNyQixlQUFlTyxlQUVKRixNQUVmRyxRQUFVLEtBQ1IsTUFBTyxDQWRlLEtBZ0JwQmYsRUFDR1EsWUFBWSxlQUFpQlEsS0FBS0MsR0FBTSxHQUN6QyxDQUFFQyxFQUFHVixZQUFZLE9BQVFXLEVBQUdYLFlBQVksUUFDeEMsQ0FBRVUsRUFBR1YsWUFBWSxPQUFRVyxFQUFHWCxZQUFZLFFBQ3hDLENBQUVVLEVBQUdWLFlBQVksT0FBUVcsRUFBR1gsWUFBWSxTQUUxQ1AsRUFBSyxDQUNIbUIsT0FoQldOLEVBZ0JVLFFBZlhWLFNBQVNHLGNBQ3JCLGVBQWVPLGVBRUpGLE9BYVRTLEtBQU0sQ0FBRUgsRUFBR1YsWUFBWSxPQUFRVyxFQUFHWCxZQUFZLFFBQzlDYyxVQUFVLEtBbEJBLElBQUNSLEdBc0JqQlMsS0FBTyxLQUNMLE1BQU12QixFQUFTZSxVQUNmLElBQUlTLEVBQ0osS0FBUUEsRUFBT3JCLGNBQWNzQixXQUMzQnRCLGNBQWN1QixZQUFZRixHQUU1QnpCLEVBQVM0QixVQUFVM0IsSUFHdkJJLFNBQVN3QixpQkFBaUIsbUJBQW9CTCxNQUM5Q2pCLE9BQU9zQixpQkFBaUIsUUFBU0wifQ==