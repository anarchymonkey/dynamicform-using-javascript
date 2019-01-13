var cartPic = document.getElementById('cartPic');
var showItems = document.getElementById('showitems');
var a;
var ul;
var lid = 1;
var reqIndex;
var ind;
var display;
var orders = [];
var styleDiv = document.createElement('div');
styleDiv.setAttribute('class','row');
var data = JSON.parse(localStorage.productArr);
for(var i = 0 ; i < data.length ; i++)
{

  var styleCol = document.createElement('div');
  styleCol.setAttribute('class','col-md-4 col-md-offset-2');
  var add = createadd();
  var minus = createminus();
  var show = view(data[i].id);
  var aCart = addToCart();
  a = document.createElement('a');
  a.setAttribute('id',data[i].id);
  a.innerHTML += '<br>';
  a.appendChild(document.createTextNode("Name : " + data[i].name));
  a.innerHTML +='<br>';
  a.appendChild(document.createTextNode("Price : " + data[i].price+" "));
  a.innerHTML += '<br>';
  a.appendChild(add);
  a.appendChild(show);
  a.appendChild(minus);
  a.innerHTML += '<br>';
  a.appendChild(aCart);
  styleCol.appendChild(a);
  styleDiv.appendChild(styleCol);
  showItems.appendChild(styleDiv);
}


function createadd()
{
  var add = document.createElement('button');
  add.setAttribute('class','add-button');
  add.innerHTML += '+';
  return add;
}
function createminus()
{
  var minus = document.createElement('button');
  minus.setAttribute('class','minus-btn');
  minus.innerHTML += '-';
  return minus;
}
function view(id)
{
  display = document.createElement('input');
  display.setAttribute('type','text');
  display.setAttribute('value','0');
  display.setAttribute('class','form-control');
  display.setAttribute('name',id);
  display.setAttribute('id',id);
  display.addEventListener('keypress',function(textValue){
    if(textValue.which == 13)
    {
      display.value = this.value;
    }
  });
  return display;
}

$('.minus-btn').on("click",function(event){
  event.preventDefault();
  var $this = $(this);
  var $input = $this.closest('a').find('input');
  var value = parseInt($input.val());

  if(value > 0)
  {
    value = value - 1;
  }
  else {
    value = 0;
  }

  $input.val(value);

  $('.')
});

$('.add-button').on('click',function(event){
  event.stopPropagation();
  var $input = $(this).closest('a').find('input');
  var value = parseInt($input.val());
  var id = event.target.parentNode.id;
  var index = parseInt(getIndex(id));
  if(value < data[index].quantity)
  {
    value = value + 1;
  }
  else {
    value = 0;
  }

  $input.val(value);
  display.value = value;

});

function getIndex(id)
{
  for(var i = 0 ; i < data.length ; i++)
  {
    if(data[i].id == id)
    {
      return i;
    }
  }
}
function addToCart()
{
  var addCart = document.createElement('button');
  addCart.setAttribute('id','cart');
  addCart.setAttribute('class','btn btn-success');
  addCart.innerHTML += 'Add To Cart';
  addCart.addEventListener('click',function(event){

      var targetParent = event.target.parentNode;
      var index = targetParent.id;
      var getIndex;

      for(var i = 0 ; i < data.length ; i++)
      {
        if(data[i].id == index)
        {
            getIndex = i;
        }
      }
      console.log("the index that we got is "+ getIndex);
      console.log("The value is " + event.target.parentNode.childNodes[6].value);
      var fetchedValue = event.target.parentNode.childNodes[6].value;
      var createObject = {name : data[getIndex].name , price : data[getIndex].price, quantity : fetchedValue, gst : data[getIndex].gst , id : data[getIndex].id };
      orders.push(createObject);
      storeData();
      if(display.value > 0)
      {
        cartPic.textContent++;
      }
      console.log("quantity left is " + (data[getIndex].quantity - display.value));
  });

  return addCart;
}

function storeData(){

  localStorage.orders = JSON.stringify(orders);
}

function loadData()
{
  if(!localStorage.orders)
  {
    localStorage.orders = JSON.stringify([]);
  }
  return JSON.parse(localStorage.orders);
}
