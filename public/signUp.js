 function registerUser(){
    console.log("registerUser() executed")
     $.ajax({
        url: "http://localhost:6050/signUp",
        type: "POST",
        data: {
          name: $("#name").val(),
          email: $("#email").val(),
          password: $("#password").val()
        },
        success: console.log("user info sumbitted.", $("#name").val(), $("#email").val(), $("#password").val()),
      });
}

function setup(){
    $("#registerUser").click(registerUser)
}
$(document).ready(setup);