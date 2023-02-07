export const getUTMS = (origin = document?.referrer, url = window?.location?.href) => {
  let urlParams = ''
  let utmSource = ''
  let utmMedium = ''
  let utmCampaign = ''
  let utmContent = ''

  //   let origin = 'https://www.google.com/'
  //   let url =
  //     'https://www.apuestatotal.com/registro/?utm_source=Facebook&utm_medium=PPL&utm_campaign=regalo-de-bienvenida&utm_content=apuesta-gratis-20'

  //   origin = 'https://www.facebook.com/'
  //   url = 'https://www.apuestatotal.com/registro/?utm_source=&utm_medium=&utm_campaign=&utm_content='

  //   // origin = ""
  //   url = ''

  let originKey = ''
  switch (true) {
    case origin.includes('google'):
      originKey = 'google'
      break
    case origin.includes('yahoo'):
      originKey = 'yahoo'
      break
    case origin.includes('bing'):
      originKey = 'bing'
      break
    default:
      break
  }

  const index = url.indexOf('?')
  const onlyQuery = url.substring(index)

  urlParams = new URLSearchParams(onlyQuery)

  utmSource = urlParams.get('utm_source')
  utmMedium = urlParams.get('utm_medium')
  utmCampaign = urlParams.get('utm_campaign')
  utmContent = urlParams.get('utm_content')

  if (origin) {
    if (originKey !== '' && origin.includes(originKey)) {
      urlParams.set('utm_source', originKey)
      urlParams.set('utm_medium', 'organic')
    } else {
      if (!utmSource) {
        urlParams.set('utm_source', origin)
      }
      if (!utmMedium) {
        urlParams.set('utm_medium', 'referral')
      }
    }
  } else {
    urlParams.set('utm_source', 'direct')
    urlParams.set('utm_medium', 'none')
  }
  utmSource = urlParams.get('utm_source') ?? ''
  utmMedium = urlParams.get('utm_medium') ?? ''
  utmCampaign = urlParams.get('utm_campaign') ?? ''
  utmContent = urlParams.get('utm_content') ?? ''

  return { utmSource, utmMedium, utmCampaign, utmContent }
}
