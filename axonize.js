const fetch = require("node-fetch");
const config = require("./config");

const sendToAxonize = async event => {
  await fetch("https://axoser.herokuapp.com/event", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ...config,
      ...event
    })
  });

  console.log(`Sent event ${event.name} to Axonize with value ${event.value}`);
};

module.exports = {
  sendToAxonize
};
