
let c=1;

addRow();

function addRow(){
 let r=document.createElement("tr");
 r.innerHTML=`<td>${c}</td>
 <td><input></td>
 <td><input type=number></td>
 <td><input type=number step=0.01></td>
 <td><button onclick="this.parentNode.parentNode.remove()">X</button></td>`;
 tbl.appendChild(r);
 c++;
}

function gen(){

 let items=[];
 document.querySelectorAll("#tbl tr").forEach((r,i)=>{
  if(i==0)return;
  let t=r.querySelectorAll("input");
  if(!t.length)return;

  items.push({
   n:t[0].value,
   q:Number(t[1].value),
   r:Number(t[2].value)
  });
 });

 let d={
  poNo:"PO-"+new Date().getFullYear()+"-"+Math.floor(Math.random()*999),
  poDate:new Date().toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"2-digit"}),
  supplier:supplier.value,
  terms:terms.value,
  taxType:taxType.value,
  items:items,
  words:"",
 };

 localStorage.setItem("poData",JSON.stringify(d));
 window.open("po.html");
}
