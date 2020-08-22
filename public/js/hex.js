import{thousandthRound as N}from"./math.js";export const DIRECTIONS=[{q:1,r:-1,s:0},{q:0,r:-1,s:1},{q:-1,r:0,s:1},{q:-1,r:1,s:0},{q:0,r:1,s:-1},{q:1,r:0,s:-1}];export const DIAGONALS=[{q:2,r:-1,s:-1},{q:1,r:-2,s:1},{q:-1,r:-1,s:2},{q:-2,r:1,s:1},{q:-1,r:2,s:-1},{q:1,r:1,s:-2}];export function makeNode({q:e,r:r,s:t},s){if(e+r+t>.001)throw new TypeError("q+r+s must sum to zero");const n={q:e,r:r,s:t,id:`${N(e)},${N(r)},${N(t)}`,links:new WeakSet,kind:s};switch(s){case"Cell":case"Edge":case"Vertex":default:return n}}export function cells(e){switch(e.kind){case"Cell":return DIRECTIONS.map(r=>makeNode(add(e,r),"Cell"));case"Edge":return DIRECTIONS.map(r=>makeNode(add(e,multiply(r,.5)),"Cell")).filter(e=>Number.isInteger(e.q)&&Number.isInteger(e.r)&&Number.isInteger(e.s));case"Vertex":return DIAGONALS.map(r=>makeNode(add(e,multiply(r,1/3)),"Cell")).filter(e=>Number.isInteger(e.q)&&Number.isInteger(e.r)&&Number.isInteger(e.s));default:return e}}export function edges(e){switch(e.kind){case"Cell":return DIRECTIONS.map(r=>makeNode(add(multiply(r,.5),e),"Edge"));case"Edge":return DIRECTIONS.map(r=>makeNode(add(e,multiply(r,.5)),"Edge")).filter(e=>!(Number.isInteger(e.q)&&Number.isInteger(e.r)&&Number.isInteger(e.s)));case"Vertex":return DIAGONALS.map(r=>makeNode(add(e,multiply(r,1/6)),"Edge")).filter(e=>Number.isInteger(2*e.q)&&Number.isInteger(2*e.r)&&Number.isInteger(2*e.s));default:return e}}export function vertices(e){switch(e.kind){case"Cell":return DIAGONALS.map(r=>makeNode(add(e,multiply(r,1/3)),"Vertex"));case"Edge":return DIAGONALS.map(r=>makeNode(add(e,multiply(r,1/6)),"Vertex")).filter(e=>Number.isInteger(3*e.q)&&Number.isInteger(3*e.r)&&Number.isInteger(3*e.s));case"Vertex":return DIAGONALS.map(r=>makeNode(add(e,multiply(r,1/3)),"Vertex")).filter(e=>!(Number.isInteger(e.q)&&Number.isInteger(e.r)&&Number.isInteger(e.s)));default:return e}}export function areEqual(e,r){return e.q===r.q&&e.r===r.r&&e.s===r.s&&e.nodetype===r.nodetype}export function add(e,r){return{q:e.q+r.q,r:e.r+r.r,s:e.s+r.s}}export function subtract(e,r){return{q:e.q-r.q,r:e.r-r.r,s:e.s-r.s}}export function multiply(e,r){return{q:e.q*r,r:e.r*r,s:e.s*r}}export function length({q:e,r:r,s:t}){return Math.max(Math.abs(e),Math.abs(r),Math.abs(t))}export function distance(e,r){return length(subtract(e,r))}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9oZXgudHMiXSwibmFtZXMiOlsidGhvdXNhbmR0aFJvdW5kIiwiRElSRUNUSU9OUyIsInEiLCJyIiwicyIsIkRJQUdPTkFMUyIsIm1ha2VOb2RlIiwia2luZCIsIlR5cGVFcnJvciIsInJlc3VsdCIsImlkIiwibGlua3MiLCJXZWFrU2V0IiwiY2VsbHMiLCJub2RlIiwibWFwIiwiZSIsImFkZCIsIm11bHRpcGx5IiwiZmlsdGVyIiwiTnVtYmVyIiwiaXNJbnRlZ2VyIiwiZWRnZXMiLCJ2ZXJ0aWNlcyIsImFyZUVxdWFsIiwiYSIsImIiLCJub2RldHlwZSIsInN1YnRyYWN0IiwiY2VsbCIsImsiLCJsZW5ndGgiLCJNYXRoIiwibWF4IiwiYWJzIiwiZGlzdGFuY2UiXSwibWFwcGluZ3MiOiIwQkFrQlNBLE1BQXVCLG1CQUV6QixNQUFNQyxXQUEwQixDQUNyQyxDQUFFQyxFQUFHLEVBQUdDLEdBQUksRUFBR0MsRUFBRyxHQUNsQixDQUFFRixFQUFHLEVBQUdDLEdBQUksRUFBR0MsRUFBRyxHQUNsQixDQUFFRixHQUFJLEVBQUdDLEVBQUcsRUFBR0MsRUFBRyxHQUNsQixDQUFFRixHQUFJLEVBQUdDLEVBQUcsRUFBR0MsRUFBRyxHQUNsQixDQUFFRixFQUFHLEVBQUdDLEVBQUcsRUFBR0MsR0FBSSxHQUNsQixDQUFFRixFQUFHLEVBQUdDLEVBQUcsRUFBR0MsR0FBSSxXQUViLE1BQU1DLFVBQXlCLENBQ3BDLENBQUVILEVBQUcsRUFBR0MsR0FBSSxFQUFHQyxHQUFJLEdBQ25CLENBQUVGLEVBQUcsRUFBR0MsR0FBSSxFQUFHQyxFQUFHLEdBQ2xCLENBQUVGLEdBQUksRUFBR0MsR0FBSSxFQUFHQyxFQUFHLEdBQ25CLENBQUVGLEdBQUksRUFBR0MsRUFBRyxFQUFHQyxFQUFHLEdBQ2xCLENBQUVGLEdBQUksRUFBR0MsRUFBRyxFQUFHQyxHQUFJLEdBQ25CLENBQUVGLEVBQUcsRUFBR0MsRUFBRyxFQUFHQyxHQUFJLFdBVWQsU0FBVUUsVUFBU0osRUFB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