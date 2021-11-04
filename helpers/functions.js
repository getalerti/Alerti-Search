const getRouteParam = (removedPart) => {
  if (typeof window !== "undefined") {
    return window.location.pathname.replace(removedPart, "")
  }
  return null
}

export {
  getRouteParam
}
