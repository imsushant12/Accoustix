document.addEventListener("DOMContentLoaded", () => {
  // creating connection object with our domain and port-number
  var socket = io.connect("http://" + document.domain + ":" + location.port);

  // creating an event bucket and sending message to server(app.py):
  socket.on("connect", () => {
    socket.send("I am connected!");
  });

  socket.on("message", (data) => {
    // console.log(`Message recieved! ${data}`)

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

  document.querySelector("#send-message").onclick = () => {
    socket.send({
      msg: document.querySelector("#user-message").value,
      username: username,
    });
  };
});
