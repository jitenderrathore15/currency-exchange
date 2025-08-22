function trackEvent(name, params) {
  try {
    if (window.plausible) window.plausible(name, { props: params || {} })
    if (window.gtag) window.gtag('event', name, params || {})
  } catch (e) {}
}