import*as e from"./hex.js";export function make({shape:e="Hexagon",size:n={x:3,y:1},populate:r=!0}={}){let a=new Map;return r&&(a=t({grid:a,shape:e,size:n})),a}function t({grid:e,shape:t,size:n,emptyFirst:i=!1}){const f={Hexagon:r,Triangle:a,Star:o,Parallelogram:l,Rectangle:s};return i&&e.clear(),f[t](n,e)}function n(t,n,r,a=-n-r){const o=new Map(t),l=e.makeNode({q:n,r:r,s:a},"Cell");return o.set(l.id,l),e.vertices(l).forEach(e=>{l.links.add(e),e.links.add(l),o.set(e.id,e)}),e.edges(l).forEach(e=>{l.links.add(e),e.links.add(l),o.set(e.id,e)}),o}function r(e,t){let r=new Map(t);for(let t=-e.x;t<=e.x;t++)for(let a=-e.x;a<=e.x;a++)Math.abs(t)+Math.abs(a)+Math.abs(-t-a)<2*e.x&&(r=n(r,t,a));return r}function a(e,t){let r=new Map(t);for(let t=0;t<e.x;t++)for(let a=0;a<e.x-t;a++)r=n(r,t,a);return r}function o(e,t){let r=new Map(t);for(let t=-e.x;t<=e.x;t++)for(let a=-e.x;a<=e.x;a++){const e=-t-a;r=n(r,t,a),r=n(r,e,a),r=n(r,t,e,a)}return r}function l(e,t){let r=new Map(t);for(let t=0;t<e.x;t++)for(let a=0;a<e.y;a++)r=n(r,t,a);return r}function s(e,t){let r=new Map(t);for(let t=0;t<=e.x;t++){const a=Math.floor(t/2);for(let o=-a;o<e.y-a;o++)r=n(r,t,o)}return r}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9ncmlkLnRzIl0sIm5hbWVzIjpbIkhleCIsIm1ha2UiLCJzaGFwZSIsInNpemUiLCJ4IiwieSIsInBvcHVsYXRlIiwiZ3JpZCIsIk1hcCIsInBvcHVsYXRlR3JpZCIsImVtcHR5Rmlyc3QiLCJncmlkUG9wdWxhdG9yIiwiSGV4YWdvbiIsInBvcHVsYXRlSGV4YWdvbkdyaWQiLCJUcmlhbmdsZSIsInBvcHVsYXRlVHJpYW5nbGVHcmlkIiwiU3RhciIsInBvcHVsYXRlU3RhckdyaWQiLCJQYXJhbGxlbG9ncmFtIiwicG9wdWxhdGVQYXJhbGxlbG9ncmFtR3JpZCIsIlJlY3RhbmdsZSIsInBvcHVsYXRlUmVjdGFuZ2xlR3JpZCIsImNsZWFyIiwiZ3JpZFB1c2giLCJxIiwiciIsInMiLCJjZWxsc2V0IiwiY2VsbCIsIm1ha2VOb2RlIiwic2V0IiwiaWQiLCJ2ZXJ0aWNlcyIsImZvckVhY2giLCJ2ZXJ0ZXgiLCJsaW5rcyIsImFkZCIsImVkZ2VzIiwiZWRnZSIsImlhIiwiaWIiLCJNYXRoIiwiYWJzIiwiaWMiLCJvZmYiLCJmbG9vciJdLCJtYXBwaW5ncyI6IlVBQ1lBLE1BQVMsa0JBVWYsU0FBVUMsTUFBS0MsTUFDbkJBLEVBQVEsVUFBU0MsS0FDakJBLEVBQU8sQ0FBRUMsRUFBRyxFQUFHQyxFQUFHLEdBQWVDLFNBQ2pDQSxHQUFXLEdBS1QsSUFDRixJQUFJQyxFQUFnQixJQUFJQyxJQUl4QixPQUhJRixJQUNGQyxFQUFPRSxFQUFhLENBQUVGLEtBQUFBLEVBQU1MLE1BQUFBLEVBQU9DLEtBQUFBLEtBRTlCSSxFQUdULFNBQVNFLEdBQWFGLEtBQ3BCQSxFQUFJTCxNQUNKQSxFQUFLQyxLQUNMQSxFQUFJTyxXQUNKQSxHQUFhLElBT2IsTUFBTUMsRUFFRixDQUNGQyxRQUFTQyxFQUNUQyxTQUFVQyxFQUNWQyxLQUFNQyxFQUNOQyxjQUFlQyxFQUNmQyxVQUFXQyxHQUdiLE9BRElYLEdBQVlILEVBQUtlLFFBQ2RYLEVBQWNULEdBQU9DLEVBQU1JLEdB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