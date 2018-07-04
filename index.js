const _ = require("lodash");
const GrovePi = require("node-grovepi").GrovePi;
const Board = GrovePi.board;
const TemperatureAnalog = GrovePi.sensors.TemperatureAnalog;

const sendToAxonize = async event => {
  await fetch("https://axoser.herokuapp.com/event", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      device: "5b3c8ed719ec0c1cfc4107bf",
      environment: "dev",
      ...event
    })
  });

  console.log(`Sent event ${event.name} to Axonize with value ${event.value}`);
};
const onTemperatureChange = async res => {
  await sendToAxonize({
    name: "Temperature",
    type: 7,
    value: res.toFixed(1)
  });
};

const board = new Board({
  debug: true,
  onError: function(err) {
    console.log("Something wrong just happened");
    console.error(err);
  },
  onInit: function(res) {
    if (res) {
      const tempSensor = new TemperatureAnalog(0);

      tempSensor.on("change", _.throttle(onTemperatureChange, 5000));
      tempSensor.watch();
    }
  }
});

board.init();
