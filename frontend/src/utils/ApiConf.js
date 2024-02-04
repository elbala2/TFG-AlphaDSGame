const ApiCallBack = async (type, url, params) => {
  try {
    return fetch(
      window.BACK_URL + url,
      {
        mode: 'cors',
        method: type,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': window.location.origin,
        },
        body: params ? JSON.stringify(params) : undefined,
      },
    ).then((response) => {
      if (response.ok) {
        return response.json();
      }

      return response.text().then((err) => {
        alert(err);
        throw new Error(err);
      })
    })
  } catch (error) {
    alert(error);
  }
}

export async function createGame(config = undefined) {
  return ApiCallBack('POST', '/game/new', { ...config });
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
    player1Id: player1.id,
    cards1: player1.cards.filter(f => f.selected),
    player2Id: player2.id,
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
  return ApiCallBack('GET', `/game/${id}/bot/action`)
}