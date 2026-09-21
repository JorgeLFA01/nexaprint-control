(function(root){
'use strict';
const labels={new:'Orden nueva',production:'En producción',done:'Terminada y pagada',unpaid:'Terminada · pago pendiente',hold:'En espera',delivered:'Entregada y pagada',cancelled:'Cancelada'};
const cents=n=>Math.round(Number(n)*100);
function paid(order,data){return data.payments.filter(p=>p.orderId===order.id).reduce((s,p)=>s+cents(p.amount),0)/100;}
function status(order,data){if(order.stage==='finished'||order.stage==='delivered'){if(cents(paid(order,data))<cents(order.price))return 'unpaid';return order.stage==='delivered'?'delivered':'done';}return order.stage;}
function between(date,from,to){return (!from||date>=from)&&(!to||date<=to);}
function totals(data,from='',to=''){const payments=data.payments.filter(p=>between(p.date,from,to));const expenses=data.expenses.filter(e=>between(e.date,from,to));const income=payments.reduce((s,p)=>s+cents(p.amount),0)/100;const costs=expenses.reduce((s,e)=>s+cents(e.amount),0)/100;const pending=data.orders.filter(o=>o.stage!=='cancelled').reduce((s,o)=>s+Math.max(0,cents(o.price)-cents(paid(o,data))),0)/100;return {income,costs,net:cents(income-costs)/100,pending,payments,expenses};}
function datePlus(date,days){const d=new Date(date+'T12:00:00');d.setDate(d.getDate()+Number(days));return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');}
const api={labels,cents,paid,status,between,totals,datePlus};if(typeof module!=='undefined')module.exports=api;root.NexaCore=api;
})(typeof window==='undefined'?globalThis:window);
