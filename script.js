function genPO(){
const y=new Date().getFullYear();
let c=Number(localStorage.getItem("poCount")||0)+1;
localStorage.setItem("poCount",c);
return `PO-${y}-${String(c).padStart(3,"0")}`;
}

function formatDate(){
const d=new Date();
const m=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
return `${String(d.getDate()).padStart(2,"0")}/${m[d.getMonth()]}/${String(d.getFullYear()).slice(-2)}`;
}

function comma(x){
return x.toLocaleString("en-IN");
}

function words(num){
const a=["","One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"];
const b=["","","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"];
function two(n){return n<20?a[n]:b[Math.floor(n/10)]+" "+a[n%10];}
let s="";
if(num>=100000){s+=two(Math.floor(num/100000))+" Lakh ";num%=100000;}
if(num>=1000){s+=two(Math.floor(num/1000))+" Thousand ";num%=1000;}
if(num>=100){s+=a[Math.floor(num/100)]+" Hundred ";num%=100;}
if(num>0)s+=two(num);
return "Rupees "+s.trim()+" Only";
}

function addRow(){
const t=document.getElementById("itemsBody");
const i=t.children.length+1;
t.innerHTML+=`
<tr>
<td>${i}</td>
<td><input class="nm"></td>
<td><input type="number" class="qt"></td>
<td><input type="number" step="0.01" class="rt"></td>
</tr>`;
}

function calc(){
let sub=0;
document.querySelectorAll("#itemsBody tr").forEach(r=>{
const q=Number(r.querySelector(".qt").value||0);
const rt=Number(r.querySelector(".rt").value||0);
sub+=q*rt;
});

let tax=0;
const type=document.getElementById("taxType").value;

if(type==="cgst") tax=sub*0.18;
if(type==="igst") tax=sub*0.18;

let total=Math.round(sub+tax);
sub=Math.round(sub);
tax=Math.round(tax);

liveSub.innerText=comma(sub);
liveTax.innerText=comma(tax);
liveTotal.innerText=comma(total);
liveWords.innerText=words(total);
}

document.addEventListener("input",calc);

document.addEventListener("DOMContentLoaded",()=>{
poNo.value=genPO();
poDate.value=formatDate();
addRow();
});

poForm.addEventListener("submit",e=>{
e.preventDefault();

const data={
poNo:poNo.value,
poDate:poDate.value,
supplier:supplier.value,
terms:terms.value,
taxType:taxType.value,
sub:liveSub.innerText,
tax:liveTax.innerText,
total:liveTotal.innerText,
words:liveWords.innerText,
items:[]
};

document.querySelectorAll("#itemsBody tr").forEach(r=>{
data.items.push({
n:r.querySelector(".nm").value,
q:r.querySelector(".qt").value,
r:r.querySelector(".rt").value
});
});

localStorage.setItem("poData",JSON.stringify(data));
location.href="po.html";
});
