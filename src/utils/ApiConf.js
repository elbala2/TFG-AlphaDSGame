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
  return ApiCallBack('PUT', '/startGame', { ...config });
}

export function MoveSlab(id, origin, destiny, rotation, cards) {
  return ApiCallBack('POST', `/moveSlab/${id}`, { origin, destiny, rotation, cards });
}

export function NextTurn(id) {
  return ApiCallBack('GET', `/nextTurn/${id}`);
}

export function TradeCards(id, player1, player2) {
  return ApiCallBack('POST', `/tradeCards/${id}`,
  {
    player1ID: player1.id,
    cards1: player1.cards.filter(f => f.selected),
    player2ID: player2.id,
    cards2: player2.cards.filter(f => f.selected), 
  });
}

export function Discard(id, card) {
  return ApiCallBack('GET', `/discard/${id}/${card.id}`);
}

export function fixRisk(index, slabID, cards) {
  return ApiCallBack('POST', `/fix/${index}`, { slabID, cards })
}