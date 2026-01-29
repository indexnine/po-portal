if(!sessionStorage.getItem("loggedIn")&&!location.pathname.includes("login")){
location.href="login.html";
}

function generatePONumber(){
const y=new Date().getFullYear();
let c=Number(localStorage.getItem("poCount")||0)+1;
localStorage.setItem("poCount",c);
return `PO-${y}-${String(c).padStart(3,"0")}`;
}

function today(){
const d=new Date();
return `${String(d.getDate()).padStart(2,"0")}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getFullYear()).slice(-2)}`;
}

function amountInWords(num){
const a=["","One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"];
const b=["","","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"];
function two(n){return n<20?a[n]:b[Math.floor(n/10)]+" "+a[n%10];}
let str="";
if(num>=100000){str+=two(Math.floor(num/100000))+" Lakh ";num%=100000;}
if(num>=1000){str+=two(Math.floor(num/1000))+" Thousand ";num%=1000;}
if(num>=100){str+=a[Math.floor(num/100)]+" Hundred ";num%=100;}
if(num>0)str+=two(num);
return "Rupees "+str.trim()+" Only";
}

function addRow(){
const tbody=document.getElementById("itemsBody");
const idx=tbody.children.length+1;
tbody.innerHTML+=`
<tr>
<td>${idx}</td>
<td><input class="item-name"></td>
<td><input type="number" class="item-qty"></td>
<td><input type="number" class="item-rate"></td>
</tr>`;
}

function recalc(){
let sub=0;
document.querySelectorAll("#itemsBody tr").forEach(r=>{
const q=Number(r.querySelector(".item-qty").value||0);
const r2=Number(r.querySelector(".item-rate").value||0);
sub+=q*r2;
});
const tax=sub*0.18;
liveSub.innerText=sub.toFixed(2);
liveTax.innerText=tax.toFixed(2);
liveTotal.innerText=(sub+tax).toFixed(2);
liveWords.innerText=amountInWords(Math.floor(sub+tax));
}

document.addEventListener("input",recalc);

document.addEventListener("DOMContentLoaded",()=>{
if(poNo){
poNo.value=generatePONumber();
poDate.value=today();
addRow();
}
});

poForm.addEventListener("submit",e=>{
e.preventDefault();
const data={
poNo:poNo.value,
poDate:poDate.value,
supplier:supplier.value,
terms:terms.value,
totalWords:liveWords.innerText,
items:[]
};
document.querySelectorAll("#itemsBody tr").forEach(r=>{
data.items.push({
name:r.querySelector(".item-name").value,
qty:r.querySelector(".item-qty").value,
rate:r.querySelector(".item-rate").value
});
});
localStorage.setItem("poData",JSON.stringify(data));
location.href="po.html";
});
