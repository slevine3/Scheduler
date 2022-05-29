const QuickChart = require("quickchart-js");
const myChart = new QuickChart();
const axios = require("axios");
const Mailer = require("./Mailer");

const graph = async () => {
  try {
    const response = await axios.get(
      `http://api.weatherapi.com/v1/history.json?key=${process.env.WEATHER_API_KEY}&q=tel_aviv&dt=2022-05-25`
    );

    const time = response.data.forecast.forecastday[0].hour.map(
      (item) => item.time
    );
    const temp = response.data.forecast.forecastday[0].hour.map(
      (item) => item.temp_c
    );
    myChart
      .setConfig({
        type: "line",
        data: {
          labels: time,
          datasets: [
            {
              label: "Temperature",
              data: temp,
            },
          ],
        },
      })
      .setWidth(800)
      .setHeight(400)
      .setBackgroundColor("transparent");

    const chartImageUrl = myChart.getUrl();

    const message = chartImageUrl;
    Mailer(message);
  } catch (error) {
    console.log(error);
  }
};
module.exports = graph;
