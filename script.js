function login() {

  const u = document.getElementById("username").value;
  const p = document.getElementById("password").value;

  if(u === "admin" && p === "1234"){
    window.location.href = "home.html";
  } else {
    alert("Invalid Login");
  }
}

function generatePO(){

  const data = {
    vendor: vendor.value,
    po: poNumber.value,
    date: poDate.value,
    item: item.value,
    qty: qty.value,
    rate: rate.value,
    total: total.value
  };

  localStorage.setItem("poData", JSON.stringify(data));
  window.location.href = "print.html";
}

window.onload = function(){

  const data = JSON.parse(localStorage.getItem("poData"));

  if(data){
    pVendor.innerText = data.vendor;
    pPo.innerText = data.po;
    pDate.innerText = data.date;
    pItem.innerText = data.item;
    pQty.innerText = data.qty;
    pRate.innerText = data.rate;
    pTotal.innerText = data.total;
  }
}
