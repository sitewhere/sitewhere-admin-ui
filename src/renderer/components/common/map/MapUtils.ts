import L, { Polygon } from "leaflet";

import { ILocation, IZoneCreateRequest } from "sitewhere-rest-api";
import {
  Map as LeafletMap,
  LatLng,
  LatLngBounds,
  Control,
  FeatureGroup
} from "leaflet";

/** Convert SiteWhere location bounds to leaflet LatLng array */
export function swToLeafletBounds(bounds: ILocation[]): LatLng[] {
  let latLngs: LatLng[] = [];
  bounds.forEach(location => {
    latLngs.push(new L.LatLng(location.latitude, location.longitude));
  });
  return latLngs;
}

/** Convert leaflet LatLng values to SiteWhere locations */
export function leafletToSwBounds(
  bounds: LatLng | LatLng[] | LatLng[][]
): ILocation[] {
  var locations: ILocation[] = [];
  if (bounds && Array.isArray(bounds)) {
    bounds.forEach((bound: any) => {
      locations.push({
        latitude: bound.lat,
        longitude: bound.lng,
        elevation: 0
      });
    });
  }
  return locations;
}

/** Get drawing options based on UI settings */
function getDrawOptions(zone: IZoneCreateRequest): Control.DrawOptions {
  return {
    polyline: false,
    circle: false,
    marker: false,
    circlemarker: false,
    polygon: {
      shapeOptions: {
        color: zone.borderColor,
        opacity: zone.borderOpacity,
        fillColor: zone.fillColor,
        fillOpacity: zone.fillOpacity
      }
    },
    rectangle: {
      shapeOptions: {
        color: zone.borderColor,
        opacity: zone.borderOpacity,
        fillColor: zone.fillColor,
        fillOpacity: zone.fillOpacity
      }
    }
  };
}

/** Get editing options based on UI settings */
function getEditOptions(): Control.DrawOptions {
  return {
    polyline: false,
    circle: false,
    marker: false,
    circlemarker: false,
    polygon: false,
    rectangle: false
  };
}

/** Enables drawing features on map */
export function enableMapDrawing(
  map: LeafletMap,
  zone: IZoneCreateRequest
): Control.Draw {
  var options: Control.DrawConstructorOptions = {
    position: "topright"
  };
  options.draw = getDrawOptions(zone);

  var drawControl = new Control.Draw(options);
  map.addControl(drawControl);
  return drawControl;
}

/** Enables editing features on map */
export function enableMapEditing(
  map: LeafletMap,
  boundsLayer: Polygon
): Control.Draw {
  var editFeatures = new FeatureGroup();
  editFeatures.addLayer(boundsLayer);
  map.addLayer(editFeatures);
  editFeatures.bringToFront();

  var options: Control.DrawConstructorOptions = {
    position: "topright",
    edit: {
      featureGroup: editFeatures,
      remove: true
    }
  };
  options.draw = getEditOptions();

  var drawControl = new Control.Draw(options);
  map.addControl(drawControl);

  var bounds: LatLngBounds = boundsLayer.getBounds();
  if (!boundsLayer.isEmpty()) {
    map.fitBounds(bounds, {
      padding: [0, 0]
    });
  }

  return drawControl;
}
