import{SQRT_THREE as T,thousandthRound as I}from"./math.js";import{vertices as e}from"./hex.js";const P=[[1.5,0],[T/2,T]],G=[[1,0],[0,1]];export function rotateTransform(o){return[[Math.cos(o)+0,0-Math.sin(o)],[Math.sin(o)+0,Math.cos(o)+0]]}export function shearTransform(o,n){return[[1,-o],[-n,1]]}export function scaleTransform(o,n){return[[o,0],[0,n]]}function H([[o,n],[t,r]]){return[[r/(o*r-n*t),n/(n*t-o*r)],[t/(n*t-o*r),o/(o*r-n*t)]]}function J([[o,n],[t,r]],[[e,u],[i,c]]){return[[o*e+n*i,o*u+n*c],[t*e+r*i,t*u+r*c]]}function K(o){return o.reduce(((o,n)=>J(n,o)),G)}export function configureLayout(o,n,t=[]){const r=K([P,...t]);return{origin:o,size:n,cubeToPoint:r,pointToCube:H(r)}}export function cubeToPoint(o,{origin:n,cubeToPoint:t}){return{x:I(t[0][0]*o.q+t[0][1]*o.r+n.x),y:I(t[1][0]*o.q+t[1][1]*o.r+n.y)}}export function pointToCube(o,{origin:n,pointToCube:t}){const r=o.x-n.x,e=o.y-n.y,u=t[0][0]*r+t[0][1]*e,i=t[1][0]*r+t[1][1]*e;return{q:u,r:i,s:-u-i}}export function cellPoints({cell:o,layout:n}){return e(o).map((o=>cubeToPoint(o,n)))}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJTUVJUX1RIUkVFIiwidGhvdXNhbmR0aFJvdW5kIiwidmVydGljZXMiLCJRUlhZIiwiSURFTlRJVFkyIiwicm90YXRlVHJhbnNmb3JtIiwidGhldGEiLCJNYXRoIiwiY29zIiwic2luIiwic2hlYXJUcmFuc2Zvcm0iLCJzaGVhclgiLCJzaGVhclkiLCJzY2FsZVRyYW5zZm9ybSIsInNjYWxlWCIsInNjYWxlWSIsImludmVydE1hdHJpeDJ4MiIsImEiLCJiIiwiYyIsImQiLCJjb21wb3NlTWF0cmljZXMyeDIiLCJlIiwiZiIsImciLCJoIiwiY29tcG9zZU1hdHJpeEFycmF5IiwibWF0cmljZXMiLCJyZWR1Y2UiLCJhY2MiLCJjdXIiLCJjb25maWd1cmVMYXlvdXQiLCJvcmlnaW4iLCJzaXplIiwidHJhbnNmb3JtcyIsImN1YmVUb1BvaW50IiwicG9pbnRUb0N1YmUiLCJNIiwieCIsInEiLCJyIiwieSIsInAiLCJwdCIsInMiLCJjZWxsUG9pbnRzIiwiY2VsbCIsImxheW91dCIsIm1hcCIsInZlcnRleCJdLCJzb3VyY2VzIjpbIi4uL3NyYy9sYXlvdXQudHMiXSwibWFwcGluZ3MiOiJxQkFNU0EscUJBQVlDLE1BQXVCLCtCQUNkQyxNQUFnQixXQXdCOUMsTUFBTUMsRUFBa0IsQ0FDcEIsQ0FBQyxJQUFPLEdBQ1IsQ0FBQ0gsRUFBYSxFQUFHQSxJQUVuQkksRUFBdUIsQ0FDckIsQ0FBQyxFQUFHLEdBQ0osQ0FBQyxFQUFHLFdBV0YsU0FBVUMsZ0JBQWdCQyxHQUM5QixNQUFPLENBQ0wsQ0FBQ0MsS0FBS0MsSUFBSUYsR0FBUyxFQUFzQixFQUFsQkMsS0FBS0UsSUFBSUgsSUFDaEMsQ0FBQ0MsS0FBS0UsSUFBSUgsR0FBUyxFQUFHQyxLQUFLQyxJQUFJRixHQUFTLEdBRTVDLFFBRU0sU0FBVUksZUFBZUMsRUFBZ0JDLEdBQzdDLE1BQU8sQ0FDTCxDQUFDLEdBQUlELEdBQ0wsRUFBRUMsRUFBUSxHQUVkLFFBRU0sU0FBVUMsZUFBZUMsRUFBZ0JDLEdBQzdDLE1BQU8sQ0FDTCxDQUFDRCxFQUFRLEdBQ1QsQ0FBQyxFQUFHQyxHQUVSLENBRUEsU0FBU0MsSUFBa0JDLEVBQUdDLElBQUtDLEVBQUdDLEtBQ3BDLE1BQU8sQ0FDTCxDQUFDQSxHQUFLSCxFQUFJRyxFQUFJRixFQUFJQyxHQUFJRCxHQUFLQSxFQUFJQyxFQUFJRixFQUFJRyxJQUN2QyxDQUFDRCxHQUFLRCxFQUFJQyxFQUFJRixFQUFJRyxHQUFJSCxHQUFLQSxFQUFJRyxFQUFJRixFQUFJQyxJQUUzQyxDQUVBLFNBQVNFLElBQXFCSixFQUFHQyxJQUFLQyxFQUFHQyxNQUFrQkUsRUFBR0MsSUFBS0MsRUFBR0MsS0FDcEUsTUFBTyxDQUNMLENBQUNSLEVBQUlLLEVBQUlKLEVBQUlNLEVBQUdQLEVBQUlNLEVBQUlMLEVBQUlPLEdBQzVCLENBQUNOLEVBQUlHLEVBQUlGLEVBQUlJLEVBQUdMLEVBQUlJLEVBQUlILEVBQUlLLEdBRWhDLENBRUEsU0FBU0MsRUFBbUJDLEdBQzFCLE9BQU9BLEVBQVNDLFFBQU8sQ0FBQ0MsRUFBS0MsSUFBUVQsRUFBbUJTLEVBQUtELElBQU16QixFQUNyRSxRQUVNLFNBQVUyQixnQkFDZEMsRUFDQUMsRUFDQUMsRUFBMEIsSUFFMUIsTUFBTUMsRUFBY1QsRUFBbUIsQ0FBQ3ZCLEtBQVMrQixJQUVqRCxNQUFPLENBQ0xGLFNBQ0FDLE9BQ0FFLGNBQ0FDLFlBTGNwQixFQUFnQm1CLEdBT2xDLFFBRU0sU0FBVUEsWUFBWWhCLEdBQWNhLE9BQUVBLEVBQVFHLFlBQWFFLElBRy9ELE1BQU8sQ0FBRUMsRUFGQ3JDLEVBQWdCb0MsRUFBRSxHQUFHLEdBQUtsQixFQUFFb0IsRUFBSUYsRUFBRSxHQUFHLEdBQUtsQixFQUFFcUIsRUFBSVIsRUFBT00sR0FFckRHLEVBRE54QyxFQUFnQm9DLEVBQUUsR0FBRyxHQUFLbEIsRUFBRW9CLEVBQUlGLEVBQUUsR0FBRyxHQUFLbEIsRUFBRXFCLEVBQUlSLEVBQU9TLEdBRS9ELFFBRU0sU0FBVUwsWUFBWU0sR0FBYVYsT0FBRUEsRUFBUUksWUFBYUMsSUFDOUQsTUFBTU0sRUFBVUQsRUFBRUosRUFBSU4sRUFBT00sRUFBdkJLLEVBQTZCRCxFQUFFRCxFQUFJVCxFQUFPUyxFQUM5Q0YsRUFBSUYsRUFBRSxHQUFHLEdBQUtNLEVBQU9OLEVBQUUsR0FBRyxHQUFLTSxFQUMvQkgsRUFBSUgsRUFBRSxHQUFHLEdBQUtNLEVBQU9OLEVBQUUsR0FBRyxHQUFLTSxFQUVqQyxNQUFPLENBQUVKLElBQUdDLElBQUdJLEdBRFJMLEVBQUlDLEVBRWIsUUFFTSxTQUFVSyxZQUFXQyxLQUFFQSxFQUFJQyxPQUFFQSxJQUNqQyxPQUFPN0MsRUFBUzRDLEdBQU1FLEtBQUtDLEdBQVdkLFlBQVljLEVBQVFGLElBQzVEIn0=