// Provide basic utility functions

// Create a query string
function buildQueryString(obj) {
    var query = [];
    for (var prop in obj) {
     if (obj.hasOwnProperty(prop) && typeof obj[prop] !== "undefined") {
        query.push(prop + "=" + obj[prop]);
      }
    }
    return query.join("&");
}
  
// Construct path for a URL given a params object
function generatePath(route, params) { 
    var query = buildQueryString(params);
    if (query !== "") {
      return route + "?" + query;
    }
    return route;
}

module.exports = {
  buildQueryString : buildQueryString,
  generatePath : generatePath,  
  
  // Add all attributes from base to New
  // Assume no conflicts
  mergeObj(orig, next) {
    for (var key in orig) {
      if (orig.hasOwnProperty(key) && orig[key] != "undefined") {
        next[key] = orig[key];
      }
    }
  },

};
