const axios = require("axios");


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function countdown(seconds) {
  for (let i = seconds; i >= 0; i--) {
    console.log(i); // In ra số giây còn lại
    await sleep(1000); // Tạm dừng 1 giây
  }
  console.log("Countdown complete!");
}

function getDateTimeLocal() {
  var d = new Date().toLocaleString();
  return `\x1b[36m ` + d + ` \x1b[0m`;
}

function handleError(key, response) {
  console.log("ERROR-----------------------------------");
  console.log(`${key} :`, JSON.stringify(response));
  telegram.send(key, JSON.stringify(response));
}


const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function handleError(err, data) {
  console.log(err, data);
}

const telegram = {
  botToken: "7304983434:AAHPzgajSjE6grr0NpqaDVOWNmHmoBfqF6w",
  send: async function (message, chatId = "-4101088309") {
    const telegramApiUrl = `https://api.telegram.org/bot${this.botToken}/sendMessage`;
    const response = await axios.post(telegramApiUrl, {
      chat_id: chatId,
      text: message,
    });
  },
};

module.exports = { getRandomInt, countdown, sleep, getDateTimeLocal, handleError, telegram };
