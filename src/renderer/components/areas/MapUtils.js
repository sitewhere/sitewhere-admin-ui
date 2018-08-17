import L from 'leaflet'

export default {

  // Convert zone bounds to leaflet LatLng array.
  swToLeafletBounds: function (bounds) {
    var latLngs = []
    for (var index = 0; index < bounds.length; index++) {
      var bound = bounds[index]
      latLngs.push(new L.LatLng(bound.latitude, bound.longitude))
    }
    return latLngs
  },

  leafletToSwBounds: function (bounds) {
    var locations = []
    for (var index = 0; index < bounds.length; index++) {
      var bound = bounds[index]
      locations.push({'latitude': bound.lat, 'longitude': bound.lng, 'elevation': 0})
    }
    return locations
  }
}
