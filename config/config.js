exports.company = process.env.REACT_APP_COMPANY
exports.currency = process.env.REACT_APP_CURRENCY


// DEV

// exports.altenar = {
//   script: 'https://sb2integration-altenar2-stage.biahosted.com/api/Integration/calimacostg',
//   walletcode: "070422",
//   skinId: "apuestatotal",
//   lang: "es-ES"
// }

// PROD

exports.altenar = {
  script: 'https://sb2integration-altenar2.biahosted.com/api/Integration/apuestatotal1',
  walletcode: "074022",
  skinId: "apuestatotal",
  lang: "es-ES"
}


exports.urls = {
  authURL: process.env.REACT_APP_CALIMACO_API_BASE + '/auth',
  dataURL: process.env.REACT_APP_CALIMACO_API_BASE + '/data',
  contentsURL: process.env.REACT_APP_CALIMACO_API_BASE + '/contents',
  paymentURL: process.env.REACT_APP_CALIMACO_API_BASE + '/payment',
  casinoURL: process.env.REACT_APP_CALIMACO_API_BASE + "/casino"
}

exports.endpointWS = {
  wsserver: process.env.REACT_APP_CALIMACO_BASE,
  server: process.env.REACT_APP_CALIMACO_BASE,
  serverPath: '/api/notifications',
}
