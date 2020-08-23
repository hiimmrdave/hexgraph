import{vertices as l,edges as i,makeNode as t}from"./hex.js";export function make({shape:e="Hexagon",size:t={x:3,y:1},populate:n=!0}={}){let r=new Map;return n&&(r=s({grid:r,shape:e,size:t})),r}function s({grid:e,shape:t,size:n,emptyFirst:r=!1}){const a={Hexagon:x,Triangle:c,Star:p,Parallelogram:d,Rectangle:M};return r&&e.clear(),a[t](n,e)}function f(e,n,r,a=-n-r){const o=new Map(e),s=t({q:n,r:r,s:a},"Cell");return o.set(s.id,s),l(s).forEach(e=>{s.links.add(e),e.links.add(s),o.set(e.id,e)}),i(s).forEach(e=>{s.links.add(e),e.links.add(s),o.set(e.id,e)}),o}function x(e,t){let n=new Map(t);for(let t=-e.x;t<=e.x;t++)for(let r=-e.x;r<=e.x;r++)Math.abs(t)+Math.abs(r)+Math.abs(-t-r)<2*e.x&&(n=f(n,t,r));return n}function c(e,t){let n=new Map(t);for(let t=0;t<e.x;t++)for(let r=0;r<e.x-t;r++)n=f(n,t,r);return n}function p(e,t){let n=new Map(t);for(let t=1-e.x;t<e.x;t++)for(let r=1-e.x;r<e.x;r++){const e=-t-r;n=f(n,t,r),n=f(n,e,r),n=f(n,t,e)}return n}function d(e,t){let n=new Map(t);for(let t=0;t<e.x;t++)for(let r=0;r<e.y;r++)n=f(n,t,r);return n}function M(e,t){let n=new Map(t);for(let t=0;t<=e.x;t++){const r=Math.floor(t/2);for(let a=-r;a<e.y-r;a++)n=f(n,t,a)}return n}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9ncmlkLnRzIl0sIm5hbWVzIjpbInZlcnRpY2VzIiwiZWRnZXMiLCJtYWtlTm9kZSIsIm1ha2UiLCJzaGFwZSIsInNpemUiLCJ4IiwieSIsInBvcHVsYXRlIiwiZ3JpZCIsIk1hcCIsInBvcHVsYXRlR3JpZCIsImVtcHR5Rmlyc3QiLCJncmlkUG9wdWxhdG9yIiwiSGV4YWdvbiIsInBvcHVsYXRlSGV4YWdvbkdyaWQiLCJUcmlhbmdsZSIsInBvcHVsYXRlVHJpYW5nbGVHcmlkIiwiU3RhciIsInBvcHVsYXRlU3RhckdyaWQiLCJQYXJhbGxlbG9ncmFtIiwicG9wdWxhdGVQYXJhbGxlbG9ncmFtR3JpZCIsIlJlY3RhbmdsZSIsInBvcHVsYXRlUmVjdGFuZ2xlR3JpZCIsImNsZWFyIiwiZ3JpZFB1c2giLCJxIiwiciIsInMiLCJjZWxsc2V0IiwiY2VsbCIsInNldCIsImlkIiwiZm9yRWFjaCIsInZlcnRleCIsImxpbmtzIiwiYWRkIiwiZWRnZSIsImlhIiwiaWIiLCJNYXRoIiwiYWJzIiwiaWMiLCJvZmYiLCJmbG9vciJdLCJtYXBwaW5ncyI6Im1CQUM0QkEsV0FBVUMsY0FBT0MsTUFBZ0Isa0JBc0J2RCxTQUFVQyxNQUFLQyxNQUNuQkEsRUFBUSxVQUFTQyxLQUNqQkEsRUFBTyxDQUFFQyxFQUFHLEVBQUdDLEVBQUcsR0FBZUMsU0FDakNBLEdBQVcsR0FLVCxJQUNGLElBQUlDLEVBQWdCLElBQUlDLElBSXhCLE9BSElGLElBQ0ZDLEVBQU9FLEVBQWEsQ0FBRUYsS0FBQUEsRUFBTUwsTUFBQUEsRUFBT0MsS0FBQUEsS0FFOUJJLEVBR1QsU0FBU0UsR0FBYUYsS0FDcEJBLEVBQUlMLE1BQ0pBLEVBQUtDLEtBQ0xBLEVBQUlPLFdBQ0pBLEdBQWEsSUFPYixNQUFNQyxFQUVGLENBQ0ZDLFFBQVNDLEVBQ1RDLFNBQVVDLEVBQ1ZDLEtBQU1DLEVBQ05DLGNBQWVDLEVBQ2ZDLFVBQVdDLEdBR2IsT0FESVgsR0FBWUgsRUFBS2UsUUFDZFgsRUFBY1QsR0FB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