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
  return ApiCallBack('POST', '/game', { ...config });
}

export async function GetGame(id) {
  return ApiCallBack('GET', `/game/${id}`);
}

export function MoveSlab(id, slabID, destiny, rotation, cards) {
  return ApiCallBack('PUT', `/game/${id}/slabs/${slabID}/move`, { destiny, rotation, cards });
}

export function NextTurn(id) {
  return ApiCallBack('GET', `/game/${id}/players/next`);
}

export function TradeCards(id, player1, player2) {
  return ApiCallBack('PUT', `/game/${id}/cards/trade`,
  {
    player1ID: player1.id,
    cards1: player1.cards.filter(f => f.selected),
    player2ID: player2.id,
    cards2: player2.cards.filter(f => f.selected), 
  });
}

export function Discard(id, card) {
  return ApiCallBack('PUT', `/game/${id}/cards/${card.id}/discard`);
}

export function fixRisk(id, riskID, cards) {
  return ApiCallBack('PUT', `/game/${id}/fix/${riskID}`, { cards })
}

export function getBotAction(id) {
  return ApiCallBack('GET', `/game/${id}/bot`)
}