const request = require("postman-request");

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=047e57bc7edd038469fce1d51a2fdff5&query=${encodeURIComponent(
    long
  )},${encodeURIComponent(lat)}`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      const currentWeather = body.current;
      callback(
        undefined,
        `${currentWeather.weather_descriptions[0]}. It is currently ${currentWeather.temperature} degrees out. It feels like ${currentWeather.feelslike} degrees out`
      );
    }
  });
};

module.exports = forecast;
