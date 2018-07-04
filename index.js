const _ = require("lodash");
const GrovePi = require("node-grovepi").GrovePi;
const Board = GrovePi.board;
const TemperatureAnalog = GrovePi.sensors.TemperatureAnalog;

const onTemperatureChange = res => {
  console.log("temp onChange value=" + res.toFixed(1));
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
