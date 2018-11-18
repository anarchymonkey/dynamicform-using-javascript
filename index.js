/* INDUCING VARIABLES */
var button = document.getElementById('btn1')
var displayform = document.getElementById('section2');
/* embedding form through javascript */
var dispEmail = createEmail();
var dispBox = createBox();
displayform.innerHTML=
'<label for="productname">Product Name</label><br>'
+'<input type="text" class="form-control" name="productname" id="productname" value=""><br>'
+'<label for="productprice">Product price</label><br>'
+'<input type="text" name="productprice" class="form-control" id="productprice" value=""><br>';
displayform.appendChild(dispEmail);
displayform.appendChild(dispBox);
displayform.innerHTML +=
'<button onclick="add()" class="btn btn-danger btn-block">submit</button><br>'
+'<button type="clear" name="clear" class="btn btn-primary btn-block" id="clear">clear</button>';

/* ********************************************************************** */
var ul = document.getElementById('ul');
var productname = document.getElementById('productname');
var productprice = document.getElementById('productprice');
var productEmail = document.getElementById('productEmail');
var productBox = document.getElementById('productBox');
var productArray = {
  name : "",
  price : "",
  email : "",
  desc : ""
};
var prodName = [];
var prodPrice = [];
var prodEmail = [];
var prodDesc = [];
var message = document.getElementById('error');
var desc = document.getElementById('desc');
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

  if(email.indexOf('@') === -1 || email.indexOf('.com') === -1 && (email.lastIndexOf('@')>email.lastIndexOf('.com')))
  {
    return false;
  }
  else {
    return true;
  }


}

/* ************************************************************** */
function add()
{
  try
  {
    if(isNaN(productname.value) && !isNaN(productprice.value) && validateEmail() == true)
    {
      /* INSERTING ELEMENTS IN KEY VALUE PAIR */
      prodName.unshift(productname.value);
      prodPrice.unshift(productprice.value);
      prodEmail.unshift(productEmail.value);
      prodDesc.unshift(productBox.value);
      /* ******************************************************** */
      productArray = {name:prodName,price:prodPrice,email:prodEmail,desc:prodDesc};
      /* ************************************************************ */
        li = document.createElement("li");
        li.appendChild(document.createTextNode(productArray.name[0]+"'s Price is Rs."+productArray.price[0]+" whose email is "+productArray.email[0]+" Has  Descrption :-  "+productArray.desc[0].substr(0,25)+"..."));
        ul.appendChild(li);

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

validateEmail(); // calling because the below calling wont recognise validateEmail if not defined here , hoisting much xD
/* CLEAR THE FORM AND BRING HOME THE BUTTON */
clear.addEventListener("click",function(){
  button.style.display = "block";
  displayform.style.display = "none";
  message.style.display = "none";
});
/*  *************************************************** */
