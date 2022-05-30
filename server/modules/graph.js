const QuickChart = require("quickchart-js");
const myChart = new QuickChart();
const axios = require("axios");
const Mailer = require("./Mailer");
const moment = require("moment");

const graph = async (item) => {
  const value = item.value;
  const date = moment(value).subtract(1, "days").format();
  const newDate = date.slice(0, 10);
  const titleDate = moment(date).format('LL');
  try {
    const response = await axios.get(
      `http://api.weatherapi.com/v1/history.json?key=${process.env.WEATHER_API_KEY}&q=tel_aviv&dt=${newDate}`
    );

    const time = response.data.forecast.forecastday[0].hour.map((item) =>
      item.time.substring(11)
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
              label: `Temperature in Tel Aviv on ${titleDate}`,
              data: temp,
              fill: false,
            },
          ],
        },
      })
      .setWidth(800)
      .setHeight(400)
      .setBackgroundColor("transparent");

    const chartImageUrl = myChart.getUrl();
    const message = chartImageUrl;

    Mailer(message, item);
  } catch (error) {
    console.log(error);
  }
};

module.exports = graph;
