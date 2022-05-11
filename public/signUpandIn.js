 function registerUser(){
    console.log("registerUser() executed")
     $.ajax({
        url: "http://localhost:6050/signuprequest",
        type: "POST",
        data: {
          name: $("#name").val(),
          email: $("#email").val(),
          password: $("#password").val()
        },
        success: console.log("user info sumbitted.", $("#name").val(), $("#email").val(), $("#password").val()),
      });
    location.href = "./login.html"
}

function loginUser() {
  console.log("loginUser() executed")
  $.ajax({
     url: "http://localhost:6050/requestlogin",
     type: "POST",
     data: {
       email: $("#email").val(),
       password: $("#password").val()
     },
     success: console.log("user info sumbitted.", $("#email").val(), $("#password").val()),
   });
}

function setup(){
    $("#registerUser").click(registerUser);
    $("#loginUser").click(loginUser)
}
$(document).ready(setup);