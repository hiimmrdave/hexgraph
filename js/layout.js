import{PI_OVER_SIX as b,SQRT_THREE as M,thousandthRound as u}from"./math.js";import{vertices as e}from"./hex.js";export function orientation(t=0){return{f:[Math.cos(t-b)*M,Math.sin(t)*M,-Math.sin(t-b)*M,Math.cos(t)*M],b:[Math.cos(t)*(2/3),Math.sin(t-b)*(2/3),-Math.sin(t)*(2/3),Math.cos(t-b)*(2/3)]}}export function configureLayout(t,o,n,i){return{orientation:orientation(t),radius:o,origin:n,size:i}}export function cubeToPoint(t,{orientation:o,radius:n,origin:i}){const r=(o.f[0]*t.q+o.f[1]*t.r)*n.x+i.x,e=(o.f[2]*t.q+o.f[3]*t.r)*n.y+i.y;return{x:u(r),y:u(e)}}export function pointToCube(t,{orientation:o,radius:n,origin:i}){const r=(t.x-i.x)/n.x,e=(t.y-i.y)/n.y,a=o.b[0]*r+o.b[1]*e,u=o.b[2]*r+o.b[3]*e;return{q:a,r:u,s:-a-u}}export function cellPoints({cell:t,layout:o}){return e(t).map(t=>cubeToPoint(t,o))}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9sYXlvdXQudHMiXSwibmFtZXMiOlsiUElfT1ZFUl9TSVgiLCJTUVJUX1RIUkVFIiwidGhvdXNhbmR0aFJvdW5kIiwidmVydGljZXMiLCJvcmllbnRhdGlvbiIsInRoZXRhIiwiZiIsIk1hdGgiLCJjb3MiLCJzaW4iLCJiIiwiY29uZmlndXJlTGF5b3V0IiwicmFkaXVzIiwib3JpZ2luIiwic2l6ZSIsImN1YmVUb1BvaW50IiwiYyIsIm8iLCJ4IiwicSIsInIiLCJ5IiwicG9pbnRUb0N1YmUiLCJwIiwicHQiLCJzIiwiY2VsbFBvaW50cyIsImNlbGwiLCJsYXlvdXQiLCJtYXAiLCJ2ZXJ0ZXgiXSwibWFwcGluZ3MiOiJzQkFHU0EsZ0JBQWFDLHFCQUFZQyxNQUF1QiwrQkFDM0JDLE1BQWdCLGtCQWdDeEMsU0FBVUMsWUFBWUMsRUFBUSxHQUNsQyxNQUFPLENBQ0xDLEVBQUcsQ0FDREMsS0FBS0MsSUFBSUgsRUFBUUwsR0FBZUMsRUFDaENNLEtBQUtFLElBQUlKLEdBQVNKLEdBQ2pCTSxLQUFLRSxJQUFJSixFQUFRTCxHQUFlQyxFQUNqQ00sS0FBS0MsSUFBSUgsR0FBU0osR0FFcEJTLEVBQUcsQ0FDREgsS0FBS0MsSUFBSUgsSUFBVSxFQUFJLEdBQ3ZCRSxLQUFLRSxJQUFJSixFQUFRTCxJQUFnQixFQUFJLElBQ3BDTyxLQUFLRSxJQUFJSixJQUFVLEVBQUksR0FDeEJFLEtBQUtDLElBQUlILEVBQVFMLElBQWdCLEVBQUksWUFLckMsU0FBVVcsZ0JBQ2ROLEVBQ0FPLEVBQ0FDLEVBQ0FDLEdBRUEsTUFBTyxDQUFFVixZQUFhQSxZQUFZQyxHQUFRTyxPQUFBQSxFQUFRQyxPQUFBQSxFQUFRQyxLQUFBQSxVQUd0RCxTQUFVQyxZQUNkQyxHQUNFWixZQUFhYSxFQUFDTCxPQUFFQSxFQUFNQyxPQUFFQSxJQUUxQixNQUFNSyxHQUFLRCxFQUFFWCxFQUFFLEdBQUtVLEVBQUVHLEVBQUlGLEVBQUVYLEVBQUUsR0FBS1UsRUFBRUksR0FBS1IsRUFBT00sRUFBSUwsRUFBT0ssRUFDMURHLEdBQUtKLEVBQUVYLEVBQUUsR0FBS1UsRUFBRUcsRUFBSUYsRUFBRVgsRUFBRSxHQUFLVSxFQUFFSSxHQUFLUixFQUFPUyxFQUFJUixFQUFPUSxFQUN4RCxNQUFPLENBQUVILEVBQUdoQixFQUFnQmdCLEdBQUlHLEVBQUduQixFQUFnQm1CLFdBRy9DLFNBQVVDLFlBQ2RDLEdBQ0VuQixZQUFhYSxFQUFDTCxPQUFFQSxFQUFNQyxPQUFFQSxJQUUxQixNQUFNVyxHQUNFRCxFQUFFTCxFQUFJTCxFQUFPSyxHQUFLTixFQUFPTSxFQUQzQk0sR0FFRUQsRUFBRUYsRUFBSVIsRUFBT1EsR0FBS1QsRUFBT1MsRUFFL0JGLEVBQUlGLEVBQUVQLEVBQUUsR0FBS2MsRUFBT1AsRUFBRVAsRUFBRSxHQUFLYyxFQUM3QkosRUFBSUgsRUFBRVAsRUFBRSxHQUFLYyxFQUFPUCxFQUFFUCxFQUFFLEdBQUtjLEVBRS9CLE1BQU8sQ0FBRUwsRUFBQUEsRUFBR0MsRUFBQUEsRUFBR0ssR0FEUk4sRUFBSUMsVUFJUCxTQUFVTSxZQUFXQyxLQUN6QkEsRUFBSUMsT0FDSkEsSUFLQSxPQUFPekIsRUFBU3dCLEdBQU1FLElBQUtDLEdBQVdmLFlBQVllLEVBQVFGIn0=