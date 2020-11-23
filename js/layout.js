import{SQRT_THREE as o,thousandthRound as n}from"./math.js";import{vertices as t}from"./hex.js";const r=[[1.5,0],[o/2,o]],e=[[1,0],[0,1]];export function rotateTransform(o){return[[Math.cos(o)+0,0-Math.sin(o)],[Math.sin(o)+0,Math.cos(o)+0]]}export function shearTransform(o,n){return[[1,-o],[-n,1]]}export function scaleTransform(o,n){return[[o,0],[0,n]]}function u([[o,n],[t,r]]){return[[r/(o*r-n*t),n/(n*t-o*r)],[t/(n*t-o*r),o/(o*r-n*t)]]}function i([[o,n],[t,r]],[[e,u],[i,c]]){return[[o*e+n*i,o*u+n*c],[t*e+r*i,t*u+r*c]]}function c(o){return o.reduce(((o,n)=>i(n,o)),e)}export function configureLayout(o,n,t=[]){const e=c([r,...t]);return{origin:o,size:n,cubeToPoint:e,pointToCube:u(e)}}export function cubeToPoint(o,{origin:t,cubeToPoint:r}){return{x:n(r[0][0]*o.q+r[0][1]*o.r)+t.x,y:n(r[1][0]*o.q+r[1][1]*o.r)+t.y}}export function pointToCube(o,{origin:n,pointToCube:t}){const r=o.x-n.x,e=o.y-n.y,u=t[0][0]*r+t[0][1]*e,i=t[1][0]*r+t[1][1]*e;return{q:u,r:i,s:-u-i}}export function cellPoints({cell:o,layout:n}){return t(o).map((o=>cubeToPoint(o,n)))}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9sYXlvdXQudHMiXSwibmFtZXMiOlsiU1FSVF9USFJFRSIsInRob3VzYW5kdGhSb3VuZCIsInZlcnRpY2VzIiwiUVJYWSIsIklERU5USVRZMiIsInJvdGF0ZVRyYW5zZm9ybSIsInRoZXRhIiwiTWF0aCIsImNvcyIsInNpbiIsInNoZWFyVHJhbnNmb3JtIiwic2hlYXJYIiwic2hlYXJZIiwic2NhbGVUcmFuc2Zvcm0iLCJzY2FsZVgiLCJzY2FsZVkiLCJpbnZlcnRNYXRyaXgyeDIiLCJhIiwiYiIsImMiLCJkIiwiY29tcG9zZU1hdHJpY2VzMngyIiwiZSIsImYiLCJnIiwiaCIsImNvbXBvc2VNYXRyaXhBcnJheSIsIm1hdHJpY2VzIiwicmVkdWNlIiwiYWNjIiwiY3VyIiwiY29uZmlndXJlTGF5b3V0Iiwib3JpZ2luIiwic2l6ZSIsInRyYW5zZm9ybXMiLCJjdWJlVG9Qb2ludCIsInBvaW50VG9DdWJlIiwiTSIsIngiLCJxIiwiciIsInkiLCJwIiwicHQiLCJzIiwiY2VsbFBvaW50cyIsImNlbGwiLCJsYXlvdXQiLCJtYXAiLCJ2ZXJ0ZXgiXSwibWFwcGluZ3MiOiJxQkFHU0EscUJBQVlDLE1BQXVCLCtCQUNkQyxNQUFnQixXQXdCOUMsTUFBTUMsRUFBa0IsQ0FDcEIsQ0FBQyxJQUFPLEdBQ1IsQ0FBQ0gsRUFBYSxFQUFHQSxJQUVuQkksRUFBdUIsQ0FDckIsQ0FBQyxFQUFHLEdBQ0osQ0FBQyxFQUFHLFdBR0YsU0FBVUMsZ0JBQWdCQyxHQUM5QixNQUFPLENBQ0wsQ0FBQ0MsS0FBS0MsSUFBSUYsR0FBUyxFQUFzQixFQUFsQkMsS0FBS0UsSUFBSUgsSUFDaEMsQ0FBQ0MsS0FBS0UsSUFBSUgsR0FBUyxFQUFHQyxLQUFLQyxJQUFJRixHQUFTLFdBSXRDLFNBQVVJLGVBQWVDLEVBQWdCQyxHQUM3QyxNQUFPLENBQ0wsQ0FBQyxHQUFJRCxHQUNMLEVBQUVDLEVBQVEsV0FJUixTQUFVQyxlQUFlQyxFQUFnQkMsR0FDN0MsTUFBTyxDQUNMLENBQUNELEVBQVEsR0FDVCxDQUFDLEVBQUdDLElBSVIsU0FBU0MsSUFBa0JDLEVBQUdDLElBQUtDLEVBQUdDLEtBQ3BDLE1BQU8sQ0FDTCxDQUFDQSxHQUFLSCxFQUFJRyxFQUFJRixFQUFJQyxHQUFJRCxHQUFLQSxFQUFJQyxFQUFJRixFQUFJRyxJQUN2QyxDQUFDRCxHQUFLRCxFQUFJQyxFQUFJRixFQUFJRyxHQUFJSCxHQUFLQSxFQUFJRyxFQUFJRixFQUFJQyxLQUkzQyxTQUFTRSxJQUNMSixFQUFHQyxJQUFLQyxFQUFHQyxNQUNYRSxFQUFHQyxJQUFLQyxFQUFHQyxLQUViLE1BQU8sQ0FDTCxDQUFDUixFQUFJSyxFQUFJSixFQUFJTSxFQUFHUCxFQUFJTSxFQUFJTCxFQUFJTyxHQUM1QixDQUFDTixFQUFJRyxFQUFJRixFQUFJSSxFQUFHTCxFQUFJSSxFQUFJSCxFQUFJSyxJQUloQyxTQUFTQyxFQUFtQkMsR0FDMUIsT0FBT0EsRUFBU0MsUUFBTyxDQUFDQyxFQUFLQyxJQUFRVCxFQUFtQlMsRUFBS0QsSUFBTXpCLFVBRy9ELFNBQVUyQixnQkFDZEMsRUFDQUMsRUFDQUMsRUFBMEIsSUFFMUIsTUFBTUMsRUFBY1QsRUFBbUIsQ0FBQ3ZCLEtBQVMrQixJQUVqRCxNQUFPLENBQ0xGLE9BQUFBLEVBQ0FDLEtBQUFBLEVBQ0FFLFlBQUFBLEVBQ0FDLFlBTGNwQixFQUFnQm1CLFdBUzVCLFNBQVVBLFlBQ2RoQixHQUNBYSxPQUFFQSxFQUFRRyxZQUFhRSxJQUl2QixNQUFPLENBQUVDLEVBRkNyQyxFQUFnQm9DLEVBQUUsR0FBRyxHQUFLbEIsRUFBRW9CLEVBQUlGLEVBQUUsR0FBRyxHQUFLbEIsRUFBRXFCLEdBQUtSLEVBQU9NLEVBRXRERyxFQUROeEMsRUFBZ0JvQyxFQUFFLEdBQUcsR0FBS2xCLEVBQUVvQixFQUFJRixFQUFFLEdBQUcsR0FBS2xCLEVBQUVxQixHQUFLUixFQUFPUyxVQUkxRCxTQUFVTCxZQUNkTSxHQUNBVixPQUFFQSxFQUFRSSxZQUFhQyxJQUV2QixNQUFNTSxFQUFVRCxFQUFFSixFQUFJTixFQUFPTSxFQUF2QkssRUFBNkJELEVBQUVELEVBQUlULEVBQU9TLEVBQzlDRixFQUFJRixFQUFFLEdBQUcsR0FBS00sRUFBT04sRUFBRSxHQUFHLEdBQUtNLEVBQy9CSCxFQUFJSCxFQUFFLEdBQUcsR0FBS00sRUFBT04sRUFBRSxHQUFHLEdBQUtNLEVBRWpDLE1BQU8sQ0FBRUosRUFBQUEsRUFBR0MsRUFBQUEsRUFBR0ksR0FEUkwsRUFBSUMsVUFJUCxTQUFVSyxZQUFXQyxLQUN6QkEsRUFBSUMsT0FDSkEsSUFLQSxPQUFPN0MsRUFBUzRDLEdBQU1FLEtBQUtDLEdBQVdkLFlBQVljLEVBQVFGIn0=