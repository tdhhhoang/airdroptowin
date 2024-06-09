const axios = require("axios");
const { getDateTimeLocal, getRandomInt } = require("../common");
const { accounts } = require("./config");

let data = JSON.stringify({
  cipher: "WALLET",
});

async function run(account) {
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://api.hamsterkombat.io/clicker/claim-daily-cipher",
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

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response));
    })
    .catch((error) => {
      console.error(error);
    });
}

// main
async function main() {
  for (let index = 0; index < accounts.length; index++) {
    let account = accounts[index];
    await run(account);
  }
}

main();
