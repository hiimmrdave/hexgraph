import{cubeLerp as r}from"./math.js";import{makeNode as t,DIAGONALS as o,add as n}from"./hex.js";export function round({q:r,r:o,s:n}){const a={q:Math.round(r),r:Math.round(o),s:Math.round(n)},s=Math.abs(r-a.q),e=Math.abs(o-a.r),u=Math.abs(n-a.s);return s>e&&s>u?a.q=-1*a.r-a.s:e>u?a.r=-1*a.q-a.s:a.s=-1*a.q-a.r,t(a,"Cell")}export function lerp(o,n,a){return round(t(r(o,n,a),"Cell"))}export function diagonals(r){return o.map(o=>t(n(r,o),"Cell"))}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jZWxsLnRzIl0sIm5hbWVzIjpbImN1YmVMZXJwIiwibWFrZU5vZGUiLCJESUFHT05BTFMiLCJhZGQiLCJyb3VuZCIsInEiLCJyIiwicyIsImFwcHJveCIsIk1hdGgiLCJvZmZzZXQiLCJhYnMiLCJsZXJwIiwiYSIsImIiLCJ0IiwiZGlhZ29uYWxzIiwiY2VsbCIsIm1hcCIsImUiXSwibWFwcGluZ3MiOiJtQkFBU0EsTUFBZ0IsK0JBQ05DLGVBQVVDLFNBQVdDLE1BQVcsa0JBUzdDLFNBQVVDLE9BQU1DLEVBQUVBLEVBQUNDLEVBQUVBLEVBQUNDLEVBQUVBLElBQzVCLE1BQU1DLEVBQVMsQ0FDWEgsRUFBR0ksS0FBS0wsTUFBTUMsR0FDZEMsRUFBR0csS0FBS0wsTUFBTUUsR0FDZEMsRUFBR0UsS0FBS0wsTUFBTUcsSUFFaEJHLEVBQ0tELEtBQUtFLElBQUlOLEVBQUlHLEVBQU9ILEdBRHpCSyxFQUVLRCxLQUFLRSxJQUFJTCxFQUFJRSxFQUFPRixHQUZ6QkksRUFHS0QsS0FBS0UsSUFBSUosRUFBSUMsRUFBT0QsR0FTM0IsT0FQSUcsRUFBV0EsR0FBWUEsRUFBV0EsRUFDcENGLEVBQU9ILEdBQUssRUFBSUcsRUFBT0YsRUFBSUUsRUFBT0QsRUFDekJHLEVBQVdBLEVBQ3BCRixFQUFPRixHQUFLLEVBQUlFLEVBQU9ILEVBQUlHLEVBQU9ELEVBRWxDQyxFQUFPRCxHQUFLLEVBQUlDLEVBQU9ILEVBQUlHLEVBQU9GLEVBRTdCTCxFQUFTTyxFQUFRLGVBR3BCLFNBQVVJLEtBQUtDLEVBQWFDLEVBQWFDLEdBQzdDLE9BQU9YLE1BQU1ILEVBQVNELEVBQVNhLEVBQUdDLEVBQUdDLEdBQUksZ0JBT3JDLFNBQVVDLFVBQVVDLEdBQ3hCLE9BQU9mLEVBQVVnQixJQUFJQyxHQUFLbEIsRUFBU0UsRUFBSWMsRUFBTUUsR0FBSSJ9