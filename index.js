const _ = require("lodash");
const GrovePi = require("node-grovepi").GrovePi;
const Board = GrovePi.board;
const TemperatureAnalog = GrovePi.sensors.TemperatureAnalog;
const { sendToAxonize } = require("./axonize");

const THROTTLE_TIME = 5000;

const onTemperatureChange = async res => {
  try {
    await sendToAxonize({
      name: "Temperature",
      type: 7,
      value: res.toFixed(1)
    });
  } catch (error) {
    console.error("Error on sending event to Axonize", error);
  }
};

function handleBoardError(err) {
  console.log("Something wrong just happened");
  console.error(err);
}

/**
 * Listen to metrics from the borad sensors.
 * @param {*} res
 */
function handleBoardInit(res) {
  if (res) {
    const tempSensor = new TemperatureAnalog(0);
    tempSensor.on("change", _.throttle(onTemperatureChange, THROTTLE_TIME));
    tempSensor.watch();
  }
}

// Initial the GrovePI board.
const board = new Board({
  debug: true,
  onError: handleBoardError,
  onInit: handleBoardInit
});

board.init();
