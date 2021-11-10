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
const stringToSlug = (str) => {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to   = "aaaaeeeeiiiioooouuuunc------";
  for (var i=0, l=from.length ; i<l ; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes

  return str;
}
const diffDaysTimestamps = (newTime, oldTime) => {
  const difference = newTime - oldTime;
  const daysDifference = Math.floor(difference/1000/60/60/24);
  return daysDifference;
}
export {
  getRouteParam,
  getUrlSearchQuery,
  stringToSlug,
  diffDaysTimestamps
}
