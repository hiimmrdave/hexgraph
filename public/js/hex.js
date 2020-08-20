import{thousandthRound as u}from"./math.js";export const DIRECTIONS=[{q:1,r:-1,s:0},{q:0,r:-1,s:1},{q:-1,r:0,s:1},{q:-1,r:1,s:0},{q:0,r:1,s:-1},{q:1,r:0,s:-1}];export const DIAGONALS=[{q:2,r:-1,s:-1},{q:1,r:-2,s:1},{q:-1,r:-1,s:2},{q:-2,r:1,s:1},{q:-1,r:2,s:-1},{q:1,r:1,s:-2}];export function makeNode({q:e,r:r,s:t},s){if(e+r+t>.001)throw new TypeError("q+r+s must sum to zero");const n={q:e,r:r,s:t,id:`${u(e)},${u(r)},${u(t)}`,links:new WeakSet,kind:s};switch(s){case"Cell":case"Edge":case"Vertex":default:return n}}export function cells(e){switch(e.kind){case"Cell":return DIRECTIONS.map(r=>makeNode(add(e,r),"Cell"));case"Edge":return DIRECTIONS.map(r=>makeNode(add(e,multiply(r,.5)),"Cell")).filter(e=>Number.isInteger(e.q)&&Number.isInteger(e.r)&&Number.isInteger(e.s));case"Vertex":return DIAGONALS.map(r=>makeNode(add(e,multiply(r,1/3)),"Cell")).filter(e=>Number.isInteger(e.q)&&Number.isInteger(e.r)&&Number.isInteger(e.s));default:return e}}export function edges(e){switch(e.kind){case"Cell":return DIRECTIONS.map(r=>makeNode(add(multiply(r,.5),e),"Edge"));case"Edge":return DIRECTIONS.map(r=>makeNode(add(e,multiply(r,.5)),"Edge")).filter(e=>!(Number.isInteger(e.q)&&Number.isInteger(e.r)&&Number.isInteger(e.s)));case"Vertex":return DIAGONALS.map(r=>makeNode(add(e,multiply(r,1/6)),"Edge")).filter(e=>Number.isInteger(2*e.q)&&Number.isInteger(2*e.r)&&Number.isInteger(2*e.s));default:return e}}export function vertices(e){switch(e.kind){case"Cell":return DIAGONALS.map(r=>makeNode(add(e,multiply(r,1/3)),"Vertex"));case"Edge":return DIAGONALS.map(r=>makeNode(add(e,multiply(r,1/6)),"Vertex")).filter(e=>Number.isInteger(3*e.q)&&Number.isInteger(3*e.r)&&Number.isInteger(3*e.s));case"Vertex":return DIAGONALS.map(r=>makeNode(add(e,multiply(r,1/3)),"Vertex")).filter(e=>!(Number.isInteger(e.q)&&Number.isInteger(e.r)&&Number.isInteger(e.s)));default:return e}}export function areEqual(e,r){return e.q===r.q&&e.r===r.r&&e.s===r.s&&e.nodetype===r.nodetype}export function add(e,r){return{q:e.q+r.q,r:e.r+r.r,s:e.s+r.s}}export function subtract(e,r){return{q:e.q-r.q,r:e.r-r.r,s:e.s-r.s}}export function multiply(e,r){return{q:e.q*r,r:e.r*r,s:e.s*r}}export function length({q:e,r:r,s:t}){return Math.max(Math.abs(e),Math.abs(r),Math.abs(t))}export function distance(e,r){return length(subtract(e,r))}