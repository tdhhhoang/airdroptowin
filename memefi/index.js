const _mineConfig = {
  nonce: "596b231bfafb6f2f974af4f491614ffa77763221f4ce048c05a4b63fee4f389a",
  boot: false,
  authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY2NjVkNmNjNzFiY2IzNDQwZDE2ZGVkNCIsInVzZXJuYW1lIjoibGFudHJhbjc1In0sInNlc3Npb25JZCI6IjY2NjVkNmQ1YzljYjBmMGVlODgwMTBlOCIsInN1YiI6IjY2NjVkNmNjNzFiY2IzNDQwZDE2ZGVkNCIsImlhdCI6MTcxNzk1MDE2NSwiZXhwIjoxNzE4NTU0OTY1fQ.ynR9E28wZWvYHaGY-AS1Wlrs6sSvR4GgqJ3SbysMi_Q",
};

function getTabCounts(boot = false) {
  const tabCounts = Math.floor(Math.random() * (120 - 50 + 1)) + 50;
  if (boot == true) {
    return 500000;
  } else {
    return tabCounts;
  }
}

async function run(mineConfig) {
  const { nonce, boot, authorization } = mineConfig;
  const tabCounts = getTabCounts(boot);
  
  let data = {
    query: `mutation MutationGameProcessTapsBatch($payload: TelegramGameTapsBatchInput!) {
      telegramGameProcessTapsBatch(payload: $payload) {
        ...FragmentBossFightConfig
        __typename
      }
    }
    
    fragment FragmentBossFightConfig on TelegramGameConfigOutput {
      _id
      coinsAmount
      currentEnergy
      maxEnergy
      weaponLevel
      energyLimitLevel
      energyRechargeLevel
      tapBotLevel
      currentBoss {
        _id
        level
        currentHealth
        maxHealth
        __typename
      }
      freeBoosts {
        _id
        currentTurboAmount
        maxTurboAmount
        turboLastActivatedAt
        turboAmountLastRechargeDate
        currentRefillEnergyAmount
        maxRefillEnergyAmount
        refillEnergyLastActivatedAt
        refillEnergyAmountLastRechargeDate
        __typename
      }
      bonusLeaderDamageEndAt
      bonusLeaderDamageStartAt
      bonusLeaderDamageMultiplier
      nonce
      __typename
    }`,
    variables: { payload: { nonce: nonce, tapsCount: tabCounts } }
  };

  let config = {
    method: "POST",
    headers: {
      "accept": "*/*",
      "accept-language": "vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7,fr-FR;q=0.6,fr;q=0.5",
      "authorization": authorization,
      "content-type": "application/json",
      "dnt": "1",
      "origin": "https://tg-app.memefi.club",
      "priority": "u=1, i",
      "referer": "https://tg-app.memefi.club/",
      "sec-ch-ua": '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
    },
    body: JSON.stringify(data)
  };

  try {
    const response = await fetch("https://api-gw-tg.memefi.club/graphql", config);
    const responseData = await response.json();

    const { nonce: newNonce, currentEnergy, coinsAmount } = responseData.data.telegramGameProcessTapsBatch;
    
    console.log("nonce:", newNonce);
    console.log("coinsAmount:", coinsAmount);
    console.log("currentEnergy:", currentEnergy);

    if (currentEnergy < 100 && boot == false) {
      console.log("DONE AT", new Date());
      setTimeout(() => {
        run({ ...mineConfig, nonce: newNonce });
      }, 1000 * 60 * 10); // 10 mins
    } else {
      run({ ...mineConfig, nonce: newNonce });
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

await run(_mineConfig);
