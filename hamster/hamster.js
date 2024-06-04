const axios = require("axios");
const { getDateTimeLocal, getRandomInt } = require("../common");

const { accounts } = require("./config");

async function callApi(account, availableTaps) {
  const randomNum = getRandomInt(10, 15);
  let data = JSON.stringify({
    count: randomNum,
    availableTaps: availableTaps,
    timestamp: new Date().getTime(),
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://api.hamsterkombat.io/clicker/tap",
    headers: {
      "Accept-Language": "vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5",
      Connection: "keep-alive",
      Origin: "https://hamsterkombat.io",
      Referer: "https://hamsterkombat.io/",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-site",
      "User-Agent":
        "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1",
      accept: "application/json",
      authorization: `Bearer ${account?.token}`,
      "content-type": "application/json",
    },
    data: data,
  };

  var result = await axios
    .request(config)
    .then((response) => {
      return { statusCode: response?.status, ...response.data };
    })
    .catch(async (error) => {
      return { statusCode: error?.response?.status };
    });

  return result;
}

async function run(account, availableTaps = 999) {
  const response = await callApi(account, availableTaps);
  if (response?.statusCode === 201 || response?.statusCode === 200) {
    const _availableTaps = response?.clickerUser?.availableTaps;
    const balanceCoins = response?.clickerUser?.balanceCoins;
    console.log(`[${account.index}] availableTaps: \x1b[43m %d \x1b[0m - balanceCoins: \x1b[33m %d \x1b[0m`, _availableTaps, balanceCoins);
    if (_availableTaps < 10) {
      console.log("DONE AT \x1b[34m%s\x1b[0m", new Date().toLocaleString());
      setTimeout(() => {
        run(account);
      }, 15 * 1000 * 60);
    } else {
      await run(account, _availableTaps);
    }
  } else {
    console.error("Job fail", response);
  }
}

// main
async function main() {
  for (let index = 0; index < accounts.length; index++) {
    let account = accounts[index];
    run(account);
  }
}

main();
