const { sendToAxonize } = require("./axonize");

const onTemperatureChange = async res => {
  try {
    await sendToAxonize({
      name: "Temperature",
      type: 7,
      value: res.toFixed(1)
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

setInterval(() => {
  onTemperatureChange(getRandomArbitrary(1, 100));
}, 5000);
