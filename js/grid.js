import{vertices as e,edges as n,makeNode as t}from"./hex.js";export function makeTwoSize(e){return"number"==typeof e?[e,e]:e}export function makeGrid({shape:e="Hexagon",size:n=[3,1],populate:t=!0}={}){return t?{Hexagon:r,Triangle:a,Star:i,Parallelogram:l,Rectangle:s}[e]({size:n}):new Map}function o(o=new Map,r,a,i=-r-a){const l=new Map(o),s=t({q:r,r:a,s:i},"Cell");return l.set(s.id,s),e(s).forEach((e=>{s.links.add(e),e.links.add(s),l.set(e.id,e)})),n(s).forEach((e=>{s.links.add(e),e.links.add(s),l.set(e.id,e)})),l}function r({size:e,grid:n}){const[t]=makeTwoSize(e);let r=n?new Map(n):new Map;for(let e=-t;e<=t;e++)for(let n=-t;n<=t;n++)Math.abs(e)+Math.abs(n)+Math.abs(-e-n)<2*t&&(r=o(r,e,n));return r}function a({size:e,grid:n}){const[t]=makeTwoSize(e);let r=n?new Map(n):new Map;for(let e=0;e<t;e++)for(let n=0;n<t-e;n++)r=o(r,e,n);return r}function i({size:e,grid:n}){const[t]=makeTwoSize(e);let r=n?new Map(n):new Map;for(let e=1-t;e<t;e++)for(let n=1-t;n<t;n++){const t=-e-n;r=o(r,e,n),r=o(r,t,n),r=o(r,e,t)}return r}function l({size:e,grid:n}){const[t,r]=makeTwoSize(e);let a=n?new Map(n):new Map;for(let e=0;e<t;e++)for(let n=0;n<r;n++)a=o(a,e,n);return a}function s({size:e,grid:n}){const[t,r]=makeTwoSize(e);let a=n?new Map(n):new Map;for(let e=0;e<t;e++){const n=Math.floor(e/2);for(let t=-n;t<r-n;t++)a=o(a,e,t)}return a}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9ncmlkLnRzIl0sIm5hbWVzIjpbInZlcnRpY2VzIiwiZWRnZXMiLCJtYWtlTm9kZSIsIm1ha2VUd29TaXplIiwic2l6ZSIsIm1ha2VHcmlkIiwic2hhcGUiLCJwb3B1bGF0ZSIsIkhleGFnb24iLCJwb3B1bGF0ZUhleGFnb25HcmlkIiwiVHJpYW5nbGUiLCJwb3B1bGF0ZVRyaWFuZ2xlR3JpZCIsIlN0YXIiLCJwb3B1bGF0ZVN0YXJHcmlkIiwiUGFyYWxsZWxvZ3JhbSIsInBvcHVsYXRlUGFyYWxsZWxvZ3JhbUdyaWQiLCJSZWN0YW5nbGUiLCJwb3B1bGF0ZVJlY3RhbmdsZUdyaWQiLCJNYXAiLCJncmlkUHVzaCIsImdyaWQiLCJxIiwiciIsInMiLCJjZWxsc2V0IiwiY2VsbCIsInNldCIsImlkIiwiZm9yRWFjaCIsInZlcnRleCIsImxpbmtzIiwiYWRkIiwiZWRnZSIsIngiLCJpYSIsImliIiwiTWF0aCIsImFicyIsImljIiwieSIsIm9mZiIsImZsb29yIl0sIm1hcHBpbmdzIjoibUJBRzRCQSxXQUFVQyxjQUFPQyxNQUFnQixrQkEwQnZELFNBQVVDLFlBQVlDLEdBQzFCLE1BQW9CLGlCQUFUQSxFQUNGLENBQUNBLEVBQU1BLEdBRVRBLFNBR0gsU0FBVUMsVUFBU0MsTUFDdkJBLEVBQVEsVUFBU0YsS0FDakJBLEVBQU8sQ0FBQyxFQUFHLEdBQUVHLFNBQ2JBLEdBQVcsR0FLVCxJQVFGLE9BQUlBLEVBUG9ELENBQ3REQyxRQUFTQyxFQUNUQyxTQUFVQyxFQUNWQyxLQUFNQyxFQUNOQyxjQUFlQyxFQUNmQyxVQUFXQyxHQUdVWCxHQUFPLENBQUVGLEtBQUFBLElBRXpCLElBQUljLElBVWIsU0FBU0MsRUFBU0MsRUFBZ0IsSUFBSUYsSUFBT0csRUFBV0MsRUFBV0MsR0FBYUYsRUFBSUMsR0FDbEYsTUFBTUUsRUFBVSxJQUFJTixJQUFJRSxHQUN0QkssRUFBT3ZCLEVBQVMsQ0FBRW1CLEVBQUFBLEVBQUdDLEVBQUFBLEVBQUdDLEVBQUFBLEdBQUss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