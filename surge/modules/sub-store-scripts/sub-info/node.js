async function operator(proxies = [], targetPlatform, env) {
  const { parseFlowHeaders, getFlowHeaders, flowTransfer } = flowUtils
  const {
    expires,
    total,
    usage: { upload, download },
  } = parseFlowHeaders(await getFlowHeaders(env.source[proxies[0].subName].url))
  const date = expires ? new Date(expires * 1000).toLocaleDateString() : ''

  const current = upload + download
  const currT = flowTransfer(Math.abs(current))
  currT.value = current < 0 ? '-' + currT.value : currT.value
  const totalT = flowTransfer(total)

  proxies.unshift({
    type: 'ss',
    server: '1.0.0.1',
    port: 80,
    cipher: 'aes-128-gcm',
    password: 'password',
    name: `流量信息: ${currT.value} ${currT.unit} / ${totalT.value} ${totalT.unit} ${date}`,
  })
  return proxies
}
