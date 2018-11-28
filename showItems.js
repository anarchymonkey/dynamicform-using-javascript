var showItems = document.getElementById('showitems');
var li;
var ul;
var lid = 1;
var reqIndex;
var ind;
var display;
var orders = [];
var add;
var minus;
var data = JSON.parse(localStorage.productArr);
ul = document.createElement('ul');
ul.setAttribute('id','ul');
for(var i = 0 ; i < data.length ; i++)
{
  var create = createCounter();
  var aCart = addToCart();
  li = document.createElement('li');
  li.setAttribute('id',data[i].id);
  li.innerHTML += '<br>';
  li.appendChild(document.createTextNode(data[i].name + "  " + data[i].price+" "));
  li.innerHTML += '<br>';
  li.appendChild(create)
  li.appendChild(aCart);
  ul.appendChild(li);
  showItems.appendChild(ul);
}

function createCounter()
{ var span = document.createElement('span');
   add = document.createElement('button');
  add.setAttribute('id','add');
  add.setAttribute('class','btn')
  add.innerHTML = 'add';
  display = document.createElement('input');
  display.setAttribute('type','text');
  display.setAttribute('value','0');
  display.setAttribute('class','form-control');
  display.setAttribute('name','counter');
  display.setAttribute('id','counter');
   minus = document.createElement('button');
  minus.setAttribute('id','minus');
  minus.setAttribute('class','btn');
  minus.innerHTML = 'minus';

  add.addEventListener('click',function(event)
  {

    var targetParent = event.target.parentNode.parentNode;
    var index = targetParent.id

    for(var i = 0 ; i < data.length ; i++)
    {
      if(data[i].id == index)
      {
        reqIndex = i;
      }
    }
    if(parseInt(display.value) == data[reqIndex].quantity)
    {

    }
    else {
      display.value++;
    }
  });


  minus.addEventListener('click',function(event){
    var targetParent = event.target.parentNode.parentNode;
    var index = targetParent.id;

    console.log("The index is ",index);

    for(var i = 0 ; i < data.length ; i++)
    {
      if(data[i].id == index)
      {
        ind = i;
      }
    }
    if(parseInt(display.value) <= 0)
    {

      }
    else {
      display.value--;
    }
    console.log(data[ind].quantity);
  });

  span.appendChild(add);
  span.appendChild(display);
  span.appendChild(minus);

  return span;

}


function addToCart()
{
  var addCart = document.createElement('button');
  addCart.setAttribute('id','cart');
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
      var createObject = {name : data[getIndex].name , price : data[getIndex].price}
      orders.push(createObject);
      //data[getIndex].quantity =
      console.log("quantity left is " + (data[getIndex].quantity - display.value));
  });

  return addCart;
}
