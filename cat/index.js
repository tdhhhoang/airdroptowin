const axios = require("axios");
const { accounts } = require("./config");
const { getDateTimeLocal, getRandomInt, telegram } = require("../common");

const managers = [
  {
    id: 3169,
    location: 2,
  },
  {
    id: 8707,
    location: 1,
  },
  {
    id: 9177,
    location: 0,
  },
  {
    id: 3706,
    location: 0,
  },
  {
    id: 9758,
    location: 0,
  },
  {
    id: 6073,
    location: 0,
  },
  {
    id: 5344,
    location: 0,
  },
  {
    id: 6619,
    location: 0,
  },
  {
    id: 3517,
    location: 0,
  },
  {
    id: 7616,
    location: 0,
  },
  {
    id: 6951,
    location: 0,
  },
  {
    id: 2253,
    location: 0,
  },
];

async function activeManagerSkill(account, manager) {
  const { id, location } = manager;
  let data = JSON.stringify({
    idManager: id,
    locationManager: location,
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://sv2.catgoldminer.ai/users/activeManagerSkill",
    headers: {
      accept: "*/*",
      "accept-language": "vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7,fr-FR;q=0.6,fr;q=0.5",
      authorization: account.authorization,
      "content-type": "application/json",
      dnt: "1",
      origin: "https://cat-gold-miner.web.app",
      priority: "u=1, i",
      referer: "https://cat-gold-miner.web.app/",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "user-agent":
        "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1",
    },
    data: data,
  };

  var result = await axios
    .request(config)
    .then((response) => {
      console.log("active success");
      return { statusCode: response?.status, ...response.data };
    })
    .catch((error) => {
      console.error("active failed ", error);
      telegram.send("Cat err " + JSON.stringify(error));
      return { ...error?.response?.data, statusCode: error?.response?.status };
    });

  return result;
}

async function run() {
  for (let index = 0; index < accounts.length; index++) {
    let account = accounts[index];
    for (let i = 0; i < managers.length; i++) {
      const manager = managers[i];
      await activeManagerSkill(account, manager);
    }
  }

  console.log("DONE AT ", getDateTimeLocal());
  setTimeout(() => {
    run();
  }, 10 * 60 * 1000);
}

run();
