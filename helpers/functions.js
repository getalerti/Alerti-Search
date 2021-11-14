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
const sanitizeUrl = (url) => {
  let newUrl = url
  newUrl = `${newUrl.indexOf('http') === -1 && 'https://'}${newUrl}`
  return newUrl
}

const makeid = (prefix) => {
  const length = 3;
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return prefix + '_' + Math.floor(Math.random() * 100) + '.' + result + '.' + Date.now();
}
export {
  getRouteParam,
  getUrlSearchQuery,
  stringToSlug,
  diffDaysTimestamps,
  sanitizeUrl,
  makeid
}
