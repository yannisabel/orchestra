interface IconResponse {
  ok: boolean
  status: number
  data: string
}

const cachedIconRequests = new Map<
  string,
  IconResponse | Promise<IconResponse>
>()

const requestIcon = (url: string): Promise<IconResponse> => {
  const cachedIconRequest = cachedIconRequests.get(url)
  if (cachedIconRequest) return Promise.resolve(cachedIconRequest)

  const iconPromise = fetch(url, { mode: 'cors' }).then(async (response) => {
    const iconResponse: IconResponse = {
      ok: response.ok,
      status: response.status,
      data: await response.text(),
    }
    if (response.ok) {
      const div = document.createElement('div')
      div.innerHTML = iconResponse.data
      const child = div.firstElementChild
      iconResponse.data =
        child?.tagName.toLowerCase() === 'svg' ? child.outerHTML : ''
    }

    cachedIconRequests.set(url, iconResponse)
    return iconResponse
  })
  cachedIconRequests.set(url, iconPromise)
  return iconPromise
}

export default requestIcon
