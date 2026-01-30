
let count=1;
addRow();

function addRow(){
 const r=document.createElement("tr");
 r.innerHTML=`<td>${count}</td>
 <td><input></td>
 <td><input type=number></td>
 <td><input type=number step=0.01></td>
 <td><button onclick="this.closest('tr').remove()">X</button></td>`;
 tbl.appendChild(r);
 count++;
}

function generate(){

 const items=[];

 document.querySelectorAll("#tbl tr").forEach((r,i)=>{
  if(i===0)return;
  const t=r.querySelectorAll("input");
  if(!t.length)return;

  items.push({
   name:t[0].value,
   qty:Number(t[1].value),
   rate:Number(t[2].value)
  });
 });

 const d={
  poNo:"PO-"+new Date().getFullYear()+"-"+Math.floor(Math.random()*900+100),
  date:new Date().toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"2-digit"}),
  supplier:supplier.value,
  terms:terms.value,
  taxType:taxType.value,
  items:items
 };

 localStorage.setItem("poData",JSON.stringify(d));
 window.open("po.html");
}
