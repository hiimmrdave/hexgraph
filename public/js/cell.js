import{cubeLerp as r}from"./math.js";import*as o from"./hex.js";export function round({q:r,r:t,s:a}){const e={q:Math.round(r),r:Math.round(t),s:Math.round(a)},n=Math.abs(r-e.q),s=Math.abs(t-e.r),d=Math.abs(a-e.s);return n>s&&n>d?e.q=-1*e.r-e.s:s>d?e.r=-1*e.q-e.s:e.s=-1*e.q-e.r,o.makeNode(e,"Cell")}export function lerp(t,a,e){return round(o.makeNode(r(t,a,e),"Cell"))}export function diagonals(r){return o.DIAGONALS.map(t=>o.makeNode(o.add(r,t),"Cell"))}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jZWxsLnRzIl0sIm5hbWVzIjpbImN1YmVMZXJwIiwiSGV4Iiwicm91bmQiLCJxIiwiciIsInMiLCJhcHByb3giLCJNYXRoIiwib2Zmc2V0IiwiYWJzIiwibWFrZU5vZGUiLCJsZXJwIiwiYSIsImIiLCJ0IiwiZGlhZ29uYWxzIiwiY2VsbCIsIkRJQUdPTkFMUyIsIm1hcCIsImUiLCJhZGQiXSwibWFwcGluZ3MiOiJtQkFDU0EsTUFBZ0Isc0JBQ2JDLE1BQVMsa0JBU2YsU0FBVUMsT0FBTUMsRUFBRUEsRUFBQ0MsRUFBRUEsRUFBQ0MsRUFBRUEsSUFDNUIsTUFBTUMsRUFBUyxDQUNYSCxFQUFHSSxLQUFLTCxNQUFNQyxHQUNkQyxFQUFHRyxLQUFLTCxNQUFNRSxHQUNkQyxFQUFHRSxLQUFLTCxNQUFNRyxJQUVoQkcsRUFDS0QsS0FBS0UsSUFBSU4sRUFBSUcsRUFBT0gsR0FEekJLLEVBRUtELEtBQUtFLElBQUlMLEVBQUlFLEVBQU9GLEdBRnpCSSxFQUdLRCxLQUFLRSxJQUFJSixFQUFJQyxFQUFPRCxHQVMzQixPQVBJRyxFQUFXQSxHQUFZQSxFQUFXQSxFQUNwQ0YsRUFBT0gsR0FBSyxFQUFJRyxFQUFPRixFQUFJRSxFQUFPRCxFQUN6QkcsRUFBV0EsRUFDcEJGLEVBQU9GLEdBQUssRUFBSUUsRUFBT0gsRUFBSUcsRUFBT0QsRUFFbENDLEVBQU9ELEdBQUssRUFBSUMsRUFBT0gsRUFBSUcsRUFBT0YsRUFFN0JILEVBQUlTLFNBQVNKLEVBQVEsZUFHeEIsU0FBVUssS0FBS0MsRUFBYUMsRUFBYUMsR0FDN0MsT0FBT1osTUFBTUQsRUFBSVMsU0FBU1YsRUFBU1ksRUFBR0MsRUFBR0MsR0FBSSxnQkFPekMsU0FBVUMsVUFBVUMsR0FDeEIsT0FBT2YsRUFBSWdCLFVBQVVDLElBQ25CQyxHQUFLbEIsRUFBSVMsU0FBU1QsRUFBSW1CLElBQUlKLEVBQU1HLEdBQUkifQ==