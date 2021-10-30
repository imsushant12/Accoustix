const check = function () {
    if (
      document.getElementById("password").value ==
      document.getElementById("confirm-password").value
    ) {
      document.getElementById("message").style.color = "green";
      document.getElementById("message").innerHTML = " ";
    } else {
      document.getElementById("message").style.color = "red";
      document.getElementById("message").innerHTML =
        "Password and confirm password should be same!";
    }
  };