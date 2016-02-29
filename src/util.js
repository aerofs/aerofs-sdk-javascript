// Provide basic utility functions

// Create a query string
function buildQueryString(obj) {
    let query = [];
    for (let prop in obj) {
     if (obj.hasOwnProperty(prop) && typeof obj[prop] !== 'undefined') {
        query.push(prop + '=' + obj[prop]);
      }
    }
    return query.join('&');
}
  
// Construct path for a URL given a params object
function generatePath(route, params) { 
    let query = buildQueryString(params);
    if (query !== '') {
      return route + '?' + query;
    }
    return route;
}

module.exports = {
  buildQueryString : buildQueryString,
  generatePath : generatePath,  
};
