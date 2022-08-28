const BASE_URL = 'http://127.0.0.1:5000';

const ApiCallBack = async (type, url, params) => {
  return await (
    await fetch(
      BASE_URL + url,
      {
        method: type,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: params ? JSON.stringify(params) : undefined,
      },
    )
  ).json()
}

export async function StartGame(config = undefined) {
  const res = JSON.parse(JSON.stringify(await ApiCallBack('PUT', '/startGame', { ...config })));
  console.log(res)
  return res
}

export function MoveSlab(origin, destiny, cards) {
  return ApiCallBack('POST', '/moveSlab', { origin, destiny, cards });
}

export function NextTurn() {
  return ApiCallBack('GET', '/nextTurn');
}

export function TradeCards() {
  return ApiCallBack('POST', '/tradeCards');
}