import{thousandthRound as e}from"./math.js";export const DIRECTIONS=[{q:1,r:-1,s:0},{q:0,r:-1,s:1},{q:-1,r:0,s:1},{q:-1,r:1,s:0},{q:0,r:1,s:-1},{q:1,r:0,s:-1}];export const DIAGONALS=[{q:2,r:-1,s:-1},{q:1,r:-2,s:1},{q:-1,r:-1,s:2},{q:-2,r:1,s:1},{q:-1,r:2,s:-1},{q:1,r:1,s:-2}];export function makeNode({q:r,r:t,s:s},n){if(r+t+s>.001)throw new TypeError("q+r+s must sum to zero");const u={q:r,r:t,s:s,id:`${e(r)},${e(t)},${e(s)}`,links:new WeakSet,kind:n};switch(n){case"Cell":case"Edge":case"Vertex":default:return u}}export function cells(e){switch(e.kind){case"Cell":return DIRECTIONS.map(r=>makeNode(add(e,r),"Cell"));case"Edge":return DIRECTIONS.map(r=>makeNode(add(e,multiply(r,.5)),"Cell")).filter(e=>Number.isInteger(e.q)&&Number.isInteger(e.r)&&Number.isInteger(e.s));case"Vertex":return DIAGONALS.map(r=>makeNode(add(e,multiply(r,1/3)),"Cell")).filter(e=>Number.isInteger(e.q)&&Number.isInteger(e.r)&&Number.isInteger(e.s));default:return e}}export function edges(e){switch(e.kind){case"Cell":return DIRECTIONS.map(r=>makeNode(add(multiply(r,.5),e),"Edge"));case"Edge":return DIRECTIONS.map(r=>makeNode(add(e,multiply(r,.5)),"Edge")).filter(e=>!(Number.isInteger(e.q)&&Number.isInteger(e.r)&&Number.isInteger(e.s)));case"Vertex":return DIAGONALS.map(r=>makeNode(add(e,multiply(r,1/6)),"Edge")).filter(e=>Number.isInteger(2*e.q)&&Number.isInteger(2*e.r)&&Number.isInteger(2*e.s));default:return e}}export function vertices(e){switch(e.kind){case"Cell":return DIAGONALS.map(r=>makeNode(add(e,multiply(r,1/3)),"Vertex"));case"Edge":return DIAGONALS.map(r=>makeNode(add(e,multiply(r,1/6)),"Vertex")).filter(e=>Number.isInteger(3*e.q)&&Number.isInteger(3*e.r)&&Number.isInteger(3*e.s));case"Vertex":return DIAGONALS.map(r=>makeNode(add(e,multiply(r,1/3)),"Vertex")).filter(e=>!(Number.isInteger(e.q)&&Number.isInteger(e.r)&&Number.isInteger(e.s)));default:return e}}export function areEqual(e,r){return e.q===r.q&&e.r===r.r&&e.s===r.s}export function add(e,r){return{q:e.q+r.q,r:e.r+r.r,s:e.s+r.s}}export function subtract(e,r){return{q:e.q-r.q,r:e.r-r.r,s:e.s-r.s}}export function multiply(e,r){return{q:e.q*r,r:e.r*r,s:e.s*r}}export function length({q:e,r:r,s:t}){return Math.max(Math.abs(e),Math.abs(r),Math.abs(t))}export function distance(e,r){return length(subtract(e,r))}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9oZXgudHMiXSwibmFtZXMiOlsidGhvdXNhbmR0aFJvdW5kIiwiRElSRUNUSU9OUyIsInEiLCJyIiwicyIsIkRJQUdPTkFMUyIsIm1ha2VOb2RlIiwia2luZCIsIlR5cGVFcnJvciIsInJlc3VsdCIsImlkIiwibGlua3MiLCJXZWFrU2V0IiwiY2VsbHMiLCJub2RlIiwibWFwIiwiZSIsImFkZCIsIm11bHRpcGx5IiwiZmlsdGVyIiwiTnVtYmVyIiwiaXNJbnRlZ2VyIiwiZWRnZXMiLCJ2ZXJ0aWNlcyIsImFyZUVxdWFsIiwiYSIsImIiLCJzdWJ0cmFjdCIsImNlbGwiLCJrIiwibGVuZ3RoIiwiTWF0aCIsIm1heCIsImFicyIsImRpc3RhbmNlIl0sIm1hcHBpbmdzIjoiMEJBSVNBLE1BQXVCLG1CQStDekIsTUFBTUMsV0FBMEIsQ0FDckMsQ0FBRUMsRUFBRyxFQUFHQyxHQUFJLEVBQUdDLEVBQUcsR0FDbEIsQ0FBRUYsRUFBRyxFQUFHQyxHQUFJLEVBQUdDLEVBQUcsR0FDbEIsQ0FBRUYsR0FBSSxFQUFHQyxFQUFHLEVBQUdDLEVBQUcsR0FDbEIsQ0FBRUYsR0FBSSxFQUFHQyxFQUFHLEVBQUdDLEVBQUcsR0FDbEIsQ0FBRUYsRUFBRyxFQUFHQyxFQUFHLEVBQUdDLEdBQUksR0FDbEIsQ0FBRUYsRUFBRyxFQUFHQyxFQUFHLEVBQUdDLEdBQUksV0FLYixNQUFNQyxVQUF5QixDQUNwQyxDQUFFSCxFQUFHLEVBQUdDLEdBQUksRUFBR0MsR0FBSSxHQUNuQixDQUFFRixFQUFHLEVBQUdDLEdBQUksRUFBR0MsRUFBRyxHQUNsQixDQUFFRixHQUFJLEVBQUdDLEdBQUksRUFBR0MsRUFBRyxHQUNuQixDQUFFRixHQUFJLEVBQUdDLEVBQUcsRUFBR0MsRUFBRyxHQUNsQixDQUFFRixHQUFJLEVBQUdDLEVBQUcsRUFBR0MsR0FBSSxHQUNuQixDQUFFRixFQUFHLEVBQUdDLEVBQUcsRUFBR0MsR0FBSSxXQVVkLFNBQVVFLFVBQVNKLEVBQUVBLEVBQUNDLEVB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