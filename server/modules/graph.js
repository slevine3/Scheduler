const QuickChart = require("quickchart-js");
const myChart = new QuickChart();
const axios = require("axios");
const Mailer = require("./Mailer");
const ProductionLogger = require("../ProductionLogger");

const graph = async (item) => {
  const units = "metric";
  const lat = "32.0853";
  const lon = "34.7818";

  try {
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/forecast?units=${units}&lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}
      `
    );

    const time = response.data.list.map((item) => item.dt_txt);
    const temp = response.data.list.map((item) => item.main.temp);

    myChart
      .setConfig({
        type: "line",
        data: {
          labels: time,
          datasets: [
            {
              label: `Tel Aviv Temperature Forecast (Celsius)`,
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
    ProductionLogger.error(error);
  }
};

module.exports = graph;
