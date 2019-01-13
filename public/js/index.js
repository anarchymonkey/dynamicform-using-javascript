/* INDUCING VARIABLES */
var button = document.getElementById('btn1')
var displayform = document.getElementById('section2');
var i = 1;
var idx = 0;
/* embedding form through javascript */
var dispQuantity = createQuantity();
var dispBox = createBox();
var gst1 = createGst();
displayform.innerHTML =
'<label for="productname">Product Name</label><br>'
+'<input type="text" class="form-control" name="productname" id="productname" value="" required><br>'
+'<label for="productprice">Product price</label><br>'
+'<input type="text" name="productprice" class="form-control" id="productprice" value=""required><br>';
displayform.appendChild(dispQuantity);
displayform.appendChild(gst1);
displayform.appendChild(dispBox);
displayform.innerHTML +=
'<button onclick="add()" class="btn btn-danger btn-block" name="submit" id="submit">submit</button><br>'
+'<button type="clear" name="clear" class="btn btn-primary btn-block" id="clear">clear</button>';

/* ********************************************************************** */
var ul = document.getElementById('ul');
var productname = document.getElementById('productname');
var productprice = document.getElementById('productprice');
var productEmail = document.getElementById('productEmail');
var productBox = document.getElementById('productBox');
var productquantity = document.getElementById('productquantity');
var productGst = document.getElementById('gst');
var productArr = [];
var message = document.getElementById('error');
var desc = document.getElementById('desc');
var submit = document.getElementById('submit');
var delId = -1; // so the id could startFrom 0;
var editId = -1; // so the id could start from 0;
var l_id = 1;
var update;
var labelquantity = document.getElementById('labelquantity');
var labelBox = document.getElementById('labelBox');
var li;
var data;
var search = createSearch();
var searchArea = document.getElementById('searchArea');
searchArea.appendChild(search);
/* EVENT LISTENER TIME */
button.addEventListener("click",function(){

if(displayform.style.display === "none")
{
  displayform.style.display = "block";
  button.style.display = "none";
}
else {
  displayform.style.display = "none";
  button.style.display = "block";
  }
});

/* ******************************************************* */

data = loadData();

function load()
{
  if(data.length != 0)
  {
  while(idx < data.length)
  {
    productArr.push(data[idx]);
    var deleting = createDelete();
    var editing = createEdit();
    var li = document.createElement("li");
    li.setAttribute('id',data[idx].id);
    li.setAttribute('class','w3-animate-left container');
    li.appendChild(document.createTextNode(data[idx].name+"'s Price is Rs."+data[idx].price+" whose quantity is "+data[idx].quantity+" Has  Descrption :-  "+data[idx].desc+"..."));
    li.innerHTML += '<br>';
    li.appendChild(editing);
    li.appendChild(deleting);
    ul.appendChild(li);
    l_id = data[idx].id+1;
    idx++;
  }
}
else {
    alert("DATA LOADED");
}
}

function add()
{
  try
  {
    if(isNaN(productname.value) && !isNaN(productprice.value) && productprice.value != '')
    {
      /* INSERTING ELEMENTS IN KEY VALUE PAIR */

      productArr.push(createObject(productname.value,productprice.value,productquantity.value,productBox.value,productGst.value));
      storeData();
      data.push(productArr[idx]);
      localStorage.setItem('productArr',JSON.stringify(data));
      createList();
      displayform.style.display = "none";
      button.style.display = 'block';
    }
    else if(isNaN(productprice.value) || !isNaN(productname.value))
    {
      throw "Productprice should be a number and Product name should be a string and Email should have @ and after that .com";
    }
  }
  catch(err)
  {
    message.style.display = "block";
    message.innerHTML = "<span class='w3-animate-top'>ERROR PLEASE REVIEW<br>"+err+"</span>";
    setTimeout(function(){ message.style.display = "none";},1000);
  }
};

function createList()
{
    if(data.length != 0)
    {
      var deleting = createDelete();
      var editing = createEdit();
      var li = document.createElement("li");
      li.setAttribute('id',l_id);
      li.setAttribute('class','w3-animate-left container');
      li.appendChild(document.createTextNode(data[idx].name+"'s Price is Rs."+data[idx].price+" whose quantity is "+data[idx].quantity+" Has  Descrption :-  "+data[idx].desc+"..."));
      li.innerHTML += '<br>';
      li.appendChild(editing);
      li.appendChild(deleting);
      ul.appendChild(li);
      idx++;
      l_id++;
    }
  }
function storeData()
{
  localStorage.productArr = JSON.stringify(productArr);
}

function loadData()
{
  if(!localStorage.productArr)
  {
    localStorage.productArr = JSON.stringify([]);
  }

  return JSON.parse(localStorage.productArr);
}
/* STORE IT INTO LOCAL STORAGE */

//var parsedData = loadData();



//console.log(parsedData);
function getIndex(id)
{
  for (var i = 0; i < productArr.length; i++)
  {
    if (productArr[i].id == id)
    {
        return i;
    }
  }
}

function removeArray(index)
{
  productArr.splice(index,1);
  console.log("The index to delete is "+ index);
  data.splice(index,1);
  localStorage.setItem('productArr',JSON.stringify(data));

}
function createObject(prodName,prodPrice,prodquant,prodDesc,gst)
{
  var productArray = {name:prodName,price:prodPrice,quantity:prodquant,desc:prodDesc,gst:gst,id:l_id};
  return productArray;
}
/* Creating Quantity setAttribute */

function createQuantity()
{
  var div = document.createElement('div');
  div.setAttribute('class','form-group');
  var label = document.createElement('label');
  label.setAttribute("for",'productquantity');
  label.setAttribute('id','labelquantity');
  label.innerHTML = "Product Quantity<br>";
  var input = document.createElement('input');
  input.setAttribute('type','text');
  input.setAttribute('name','quantity');
  input.setAttribute('id','productquantity');
  input.setAttribute('value','');
  input.setAttribute('class','form-control');
  div.appendChild(label);
  div.appendChild(input);
  return div;
}
/*  Attribute Created */
function createGst(){
  var div = document.createElement('div');
  div.setAttribute('class','form-group');
  var label = document.createElement('label');
  label.setAttribute('id','labelgst');
  label.innerHTML += 'Gst';
  var gst = document.createElement('input');
  gst.setAttribute('type','text');
  gst.setAttribute('id','gst');
  gst.setAttribute('name','gst');
  gst.setAttribute('min-value','1.00');
  gst.setAttribute('step','1.00');
  gst.setAttribute('class','form-control');
  label.setAttribute("for",'gst');
  div.appendChild(label);
  div.appendChild(gst);
  return div;
}
/* create a textbox element */

function createBox()
{
  var div = document.createElement('div');
  div.setAttribute('class','form-group');
  var label = document.createElement('label');
  label.setAttribute('for','productBox');
  label.setAttribute('id','labelBox');
  label.innerHTML+='Product Descrption <br>';
  div.appendChild(label);
  var textarea = document.createElement('textarea');
  textarea.setAttribute('id','productBox');
  textarea.setAttribute('name','textArea');
  textarea.setAttribute('class','form-control');
  textarea.setAttribute('rows','10');
  textarea.setAttribute('cols','10');
  textarea.setAttribute('value','');
  div.appendChild(textarea);
  return div;
}
/* ******************************************************* */
/* CREATING DELETE BUTTON */
function createDelete()
{
  var deleteButton = document.createElement('button');
  deleteButton.setAttribute('class','btn btn-danger');
  deleteButton.setAttribute('name','delete');
  deleteButton.setAttribute('id','delete');
  deleteButton.setAttribute('style','margin:10px');
  deleteButton.innerHTML = 'DELETE';
  deleteButton.addEventListener('click',function(event){

    var targetParent = event.target.parentNode;
    console.log("targetParent's id clicked is " +targetParent.id);
    var index = getIndex(parseInt(targetParent.id));
    console.log("The index of the id is ",index);
    removeArray(index);
    console.log(targetParent.parentNode);
    targetParent.parentNode.removeChild(targetParent);
    idx--;
  });
  return deleteButton;
}

function createEdit()
{
  var edit = document.createElement('button');
  edit.setAttribute('class','btn btn-warning');
  edit.setAttribute('name','edit');
  edit.setAttribute('id','edit');
  edit.setAttribute('style','margin:10px');
  edit.innerHTML = 'EDIT';
  edit.addEventListener('click',function(event){

    var targetParent = event.target.parentNode;
    console.log("targetParent's id clicked is " +targetParent.id);
    var index = getIndex(parseInt(targetParent.id));
    console.log("The index that is clicked is " + index);
    editForm(index);
  });
  return edit;
}
/* ************************************************************** */


function editForm(index)
{
    productname.value = data[index].name;
    productprice.value = data[index].price;
    productGst.value = data[index].gst;
    productquantity.value = data[index].quantity;
    productBox.value = data[index].desc;
    submit.textContent = 'update';
    submit.setAttribute('id','update');
    button.style.display = 'none';
    displayform.style.display = 'block';
    productquantity.style.display = 'block';
    productprice.style.display = 'block';
    gst.style.display = 'block';
    update = document.getElementById('update');

    console.log("THE INDEX IN EDIT FORM IS",index);
    update.setAttribute('onclick','editArray('+index+')');
}

function editArray(index)
{
  console.log("The index edited after clicking is "+ index);

  data[index].name = productname.value;
  data[index].price = productprice.value;
  data[index].quantity = productquantity.value;
  data[index].gst = productGst.value;
  localStorage.setItem('productArr',JSON.stringify(data));
  productArr[index].name = productname.name;
  window.location.reload();


}
/* CLEAR THE FORM AND BRING HOME THE BUTTON */
clear.addEventListener("click",function(){
  button.style.display = "block";
  displayform.style.display = "none";
  message.style.display = "none";
  update.textContent = 'submit';
  submit.setAttribute('onclick','add()');
  labelquantity.style.display = 'block';
  productquantity.style.display = 'block';

});

function createSearch()
{
  var div = document.createElement('div');
  div.setAttribute('class','form-group');
  var label = document.createElement('label');
  label.setAttribute('for','search');
  label.innerHTML = 'Search';
  div.appendChild(label);
  var search = document.createElement('input');
  search.setAttribute('type','text');
  search.setAttribute('name','search');
  search.setAttribute('id','search');
  search.setAttribute('class','form-control');
  search.setAttribute('placeholder','search here :P');
  search.addEventListener('keypress',function(key){
    for (var i = 0 ; i < productArr.length ; i++)
  {
    if(productArr[i].name.includes(key['key']))
    {
      console.log(ul.children[i].textContent)
    }
  }
  });
  div.appendChild(search);
  return div;
}

createDelete();
createEdit();
/*  *************************************************** */
