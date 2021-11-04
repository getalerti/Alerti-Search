const getRouteParam = (removedPart) => {
  if (typeof window !== 'undefined') {
    return window.location.pathname.replace(removedPart, '')
  }
  return null
}
const getUrlSearchQuery = () => {
  if (typeof window === "undefined") {
    return null;
  }
  return window.location.search ? decodeURIComponent(window.location.search.replace('?s=', '')) : ''
}

export {
  getRouteParam,
  getUrlSearchQuery
}
