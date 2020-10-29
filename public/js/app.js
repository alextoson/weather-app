console.log("Client side javascript is loaded");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-one");
const messageTwo = document.querySelector("#message-two");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const location = search.value;
  const url = `/weather?address=${location}`;

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  fetch(url).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        return (messageOne.textContent = data.error);
      }
      messageOne.textContent = data.location;
      messageTwo.textContent = data.forecast;
    });
  });
});
