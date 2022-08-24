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

export function StartGame() {
  return ApiCallBack('GET', '/startGame')
}