(function(){
  let total ;
  let sum = 0;
  let arr = [];
function displayCart()
{
      let data = JSON.parse(localStorage.orders);
      data.forEach(obj=>{
        createCart(obj);
        arr.push({price : obj.price, quantity : obj.quantity , gst : obj.gst});
      });
}

function createCart(obj)
{
  let tbody = document.getElementById('tbdy');
  let tr = document.createElement('tr');
  let td1 = document.createElement('td');
  td1.innerHTML += (obj.name);
  let td2 = document.createElement('td');
  td2.innerHTML += (obj.quantity);
  let td3 = document.createElement('td');
  td3.innerHTML += 'Rs.'+(obj.price);
  let td4 = document.createElement('td');
  td4.innerHTML += obj.price + 'x' + obj.quantity+ 'x'+ obj.gst + '=' + parseInt(obj.price * obj.quantity * obj.gst);
  total = [];
  total.push(parseInt(obj.price * obj.quantity * obj.gst));
  let td5 = document.createElement('td');
  td5.innerHTML += "Rs."+parseInt(total);
  let td6 = document.createElement('td');
  let del = createDelete();
  td6.append(del);
  tr.append(td1);
  tr.append(td2);
  tr.append(td3);
  tr.append(td4);
  tr.append(td5);
  tr.append(td6);
  tbody.append(tr);
}
displayCart();

function calculateAndDisplaySum()
{
  var showTotal = document.getElementById('calc');
  var calculation = arr.map(object =>{

    return object.price * object.quantity*object.gst;
      });

  sum = calculation.reduce((a,b)=>{return a+b},0);
  showTotal.innerHTML += sum;
  console.log(sum);
}

calculateAndDisplaySum();

console.log(total);

function createDelete()
{
  var deleteButton = document.createElement('button');
  deleteButton.setAttribute('id','deleteorder');
  deleteButton.setAttribute('class','btn btn-danger btn-xs');
  deleteButton.innerHTML+= 'Delete';
  deleteButton.addEventListener("click",(event)=>{
    deleteOrder(event);
  });

  return deleteButton;

}
function deleteOrder(event){
  console.log(event.target.parentNode.parentNode.remove());
}

})();
