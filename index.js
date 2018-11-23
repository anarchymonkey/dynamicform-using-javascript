/* INDUCING VARIABLES */
var button = document.getElementById('btn1')
var displayform = document.getElementById('section2');
var i = 1;
var idx = 0;
/* embedding form through javascript */
var dispEmail = createEmail();
var dispBox = createBox();
displayform.innerHTML =
'<label for="productname">Product Name</label><br>'
+'<input type="text" class="form-control" name="productname" id="productname" value=""><br>'
+'<label for="productprice">Product price</label><br>'
+'<input type="text" name="productprice" class="form-control" id="productprice" value=""><br>';
displayform.appendChild(dispEmail);
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
var productArr = [];
var message = document.getElementById('error');
var desc = document.getElementById('desc');
var submit = document.getElementById('submit');
var delId = -1; // so the id could startFrom 0;
var editId = -1; // so the id could start from 0;
var l_id = 1;
var update;
var labelEmail = document.getElementById('labelEmail');
var labelBox = document.getElementById('labelBox');
var li;

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
/* Creating Email setAttribute */

function createEmail()
{
  var div = document.createElement('div');
  div.setAttribute('class','form-group');
  var label = document.createElement('label');
  label.setAttribute("for",'productEmail');
  label.setAttribute('id','labelEmail');
  label.innerHTML = "Product Email<br>";
  var input = document.createElement('input');
  input.setAttribute('type','email');
  input.setAttribute('name','email');
  input.setAttribute('id','productEmail');
  input.setAttribute('value','');
  input.setAttribute('class','form-control');
  div.appendChild(label);
  div.appendChild(input);
  return div;
}
/* Email Attribute Created */

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
 textarea.setAttribute('class','form-control');
 textarea.setAttribute('rows','10');
 textarea.setAttribute('cols','10');
 textarea.setAttribute('value','');
 div.appendChild(textarea);
 return div;
}
/* ******************************************************* */

/* validation of email */
function validateEmail()
{
  var email = productEmail.value;
  var validatingConditions = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regular expressions for email
  if (validatingConditions.test(email))
  {
    return true;
  }
  else if(email.indexOf('@') === -1 || email.indexOf('.com') === -1)
  {
    return false;
  }
  else if(email.lastIndexOf('@') > email.lastIndexOf('.com'))
  {
    console.log(email.lastIndexOf('@'));
    console.log(email.lastIndexOf('.com'));
    return false;
  }
  else {
    return false;
  }
}


function add()
{
  try
  {
    if(isNaN(productname.value) && !isNaN(productprice.value) && validateEmail() == true)
    {
      /* INSERTING ELEMENTS IN KEY VALUE PAIR */

      productArr.push(createObject(productname.value,productprice.value,productEmail.value,productBox.value));

      /* ******************************************************** */

      /* ************************************************************ */
        var deleting = createDelete();
        var editing = createEdit();
          var li = document.createElement("li");
          li.setAttribute('id',l_id);
          li.setAttribute('class','w3-animate-left container');
          li.appendChild(document.createTextNode(productArr[idx].name+"'s Price is Rs."+productArr[idx].price+" whose email is "+productArr[idx].email+" Has  Descrption :-  "+productArr[idx].desc+"..."));
          li.innerHTML += '<br>';
          li.appendChild(editing);
          li.appendChild(deleting);
          ul.appendChild(li);
          idx++;
          l_id++;
          console.log('the id that is set for the next element is ',+i);
          console.log(productArr);
          /* BASIC STYLING */
          displayform.style.display = "none";
          button.style.display = 'block';
          /* ********************* */


    }
    else if(isNaN(productprice.value) || !isNaN(productname.value) || validateEmail() == false)
    {
      throw "Productprice should be a number and Product name should be a string and Email should have @ and after that .com";
    }
  }
  catch(err)
  {
    message.style.display = "block";
    message.innerHTML = "<span class='w3-animate-top'>ERROR PLEASE REVIEW<br>"+err+"</span>";
    setTimeout(function(){
      message.style.display = "none";
    }
    ,5000);
  }
};

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
    var index = getIndex(parseInt(targetParent.id));
    console.log(index);
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
    var index = getIndex(parseInt(targetParent.id));
    editForm(index);
  });
  return edit;
}
/* ************************************************************** */

function createObject(prodName,prodPrice,prodEmail,prodDesc)
{
  var productArray = {name:prodName,price:prodPrice,email:prodEmail,desc:prodDesc,id:i};
  i++;
  return productArray;
}
validateEmail(); // calling because the below calling wont recognise validateEmail if not defined here , hoisting much xD
createDelete();
createEdit();

function getIndex(id)
{
    for (var i = 0; i < productArr.length; i++)
    {
        if (productArr[i].id == id)
            console.log("the index to remove is given in return value "+ productArr[i].id);
            return i;
    }
}

function removeArray(index)
{
    console.log("the index to remove is given in return value "+ productArr[index].id);
    productArr.splice(index,1);
    console.log(productArr);
}
function editForm(index)
{
    submit.textContent = 'update';
    submit.setAttribute('id','update');
    button.style.display = 'none';
    displayform.style.display = 'block';
    productEmail.style.display = 'none';
    productBox.style.display = 'none';
    labelEmail.style.display = 'none';
    labelBox.style.display = 'none';
    update = document.getElementById('update');
    update.setAttribute('onclick','editArray('+index+')');
}

function editArray(index)
{
  console.log(productArr[index].name);
  console.log(productArr[index].price);
  console.log("the index to edit is "+index);
  productArr[index].name = productname.value;
  productArr[index].price = productprice.value;
  li = document.getElementById('li');
  //console.log(li.parentElement.childNode);
}
/* CLEAR THE FORM AND BRING HOME THE BUTTON */
clear.addEventListener("click",function(){
  button.style.display = "block";
  displayform.style.display = "none";
  message.style.display = "none";
  update.textContent = 'submit';
  submit.setAttribute('onclick','add()');
  labelEmail.style.display = 'block';
  productEmail.style.display = 'block';
  labelBox.style.display = 'block';
  productBox.style.display = 'block';

});
/*  *************************************************** */
