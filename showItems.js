var showItems = document.getElementById('showitems');
var li;
var ul;
var lid = 1;
var reqIndex;
var ind;
var data = JSON.parse(localStorage.productArr);
ul = document.createElement('ul');
ul.setAttribute('id','ul');
for(var i = 0 ; i < data.length ; i++)
{
  var create = createCounter();
  li = document.createElement('li');
  li.setAttribute('id',data[i].id);
  li.innerHTML += '<br>';
  li.appendChild(document.createTextNode(data[i].name + "  " + data[i].price+" "));
  li.innerHTML += '<br>';
  li.appendChild(create);
  ul.appendChild(li);
  showItems.appendChild(ul);
}

function createCounter()
{ var span = document.createElement('span');
  var add = document.createElement('button');
  add.setAttribute('id','add');
  add.setAttribute('class','btn')
  add.innerHTML = 'add';
  var display = document.createElement('input');
  display.setAttribute('type','text');
  display.setAttribute('value','0');
  display.setAttribute('class','form-control');
  display.setAttribute('name','counter');
  display.setAttribute('id','counter');
  var minus = document.createElement('button');
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
    var index = targetParent.id

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
  });
  span.appendChild(add);
  span.appendChild(display);
  span.appendChild(minus);

  return span;

}


function addToCart()
{

}

/*
4
5
0 1
1 2
0 2
2 3
0 3
0
*/
