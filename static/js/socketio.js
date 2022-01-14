document.addEventListener("DOMContentLoaded", () => {
  // creating connection object with our domain and port-number
  var socket = io.connect("http://127.0.0.1:5500");


  // creating an event bucket and sending message to server(app.py):
  socket.on("connect", () => {
    socket.send("I am connected!");
  });

  socket.on("message", (data) => {
    console.log(data);
    // Display current message
    if (data.msg) {
      // Display user's own message
      if (data.username == username) {
        const my_message = `
                        <div class="chat-message-right pb-4">
                          <div>
                              <img src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                  class="rounded-circle mr-1" alt="Chris Wood" width="40" height="40" />
                                <div id="time" class="text-muted small text-nowrap mt-2">
                                    ${data.time_stamp}
                                </div>
                          </div>
                          <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                              <div class="font-weight-bold mb-1">You</div>
                                <div class="my-message">
                                ${data.msg}
                                </div>
                          </div>
                        </div>`;

        const own_div = document.createElement("div");
        own_div.innerHTML = my_message;
        document.querySelector("#display-message-section").append(own_div);
      }

      // Display other users' messages
      else if (typeof data.username !== "undefined") {
        const others_message = `
                        <div class="chat-message-left pb-4">
                          <div>
                              <img src="https://bootdey.com/img/Content/avatar/avatar3.png"
                                  class="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40" />
                              <div id="time" class="text-muted small text-nowrap mt-2">
                                  ${data.time_stamp}
                              </div>
                          </div>
                          <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                              <div class="user-name" class="font-weight-bold mb-1">${data.username}</div>
                              <div class="others-message">
                              ${data.msg}
                              </div>
                          </div>
                        </div>`;
        const others_div = document.createElement("div");
        others_div.innerHTML = others_message;
        document.querySelector("#display-message-section").append(others_div);
      }
      // Display system message
      else {
        printSysMsg(data.msg);
      }
    }
    scrollDownChatWindow();
  });

  user_input_messsage = document.querySelector("#user_message");
  document.querySelector("#send_message").onclick = () => {
    send_message();
    user_input_messsage.value = "";
  }

  user_input_messsage.addEventListener('keyup', (e) => {
    if (e.keyCode === 13){
        send_message();
        user_input_messsage.value = '';
    }
  })

  const send_message = () => {
    socket.emit("incoming-msg", {
      msg: document.querySelector("#user_message").value,
      username: username,
      room: 1,
    });
  };




});

// Scroll chat window down
function scrollDownChatWindow() {
  const chatWindow = document.querySelector("#display-message-section");
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

/*
socket.on("message", (data) => {
  console.log(`Message recieved! ${data}`)

  const p = document.createElement("p");
  const br = document.createElement("br");
  const span_username = document.createElement("span");
  const span_timestamp = document.createElement("span");

  span_username.innerHTML = data.username;
  span_timestamp.innerHTML = data.timestamp;

  p.innerHTML =
    span_username.outerHTML +
    br.outerHTML +
    data.msg +
    br.outerHTML +
    span_timestamp.outerHTML;
  document.querySelector("#display-message-section").append(p);

});
*/
