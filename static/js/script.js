document.addEventListener('DOMContentLoaded', () => {
  
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
  
  // Searching the members present from the database.
  search_members = document.querySelector('#search-members')
  search_members.addEventListener('keyup', (e)=>{
    if(e.keyCode === 13){
      let data = search_members.value;
      var url = `http://127.0.0.1:5500/searchmembers/${data}`;
      
      fetch(url).then((response) => {
        return response.json();
      }).then((data) => {
        console.log(data);
        printUser(data);
      }).catch((error) => {
        console.log(error);
      })
    }
  })

  function printUser(data){
    let element = data[0];
    console.log(element);
    user_img = document.querySelector('#search_user_img').style.display = 'block';
    document.querySelector('#search_user_name').innerHTML = element['first_name'] + ' ' +  element['last_name'];
    localStorage.setItem('searched_username', element['username'])

  }

})



// Scroll chat window down
function scrollDownChatWindow() {
  const chatWindow = document.querySelector("#display-message-section");
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

