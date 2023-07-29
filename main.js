import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {Control, defaults as defaultControls, MousePosition} from 'ol/control.js';
import { createStringXY } from 'ol/coordinate';

const mousePositionControl = new MousePosition({
  coordinateFormat: createStringXY(4),
  projection: 'EPSG:4326',
  className: 'custom-mouse-position',
  target: document.getElementById('mouse-position'),
});

class GeomTypeControl extends Control {
  /**
   * @param {Object} [opt_options] Control options.
   */
  constructor(opt_options) {
    const options = opt_options || {};

    const form = document.createElement('form');
    const select = document.createElement('select');

    const optionPoint = document.createElement('option');
    optionPoint.setAttribute('value', 'Point');
    optionPoint.innerHTML = 'Point';
    select.appendChild(optionPoint);

    const optionLineString = document.createElement('option');
    optionLineString.setAttribute('value', 'LineString');
    optionLineString.innerHTML = 'LineString';
    select.appendChild(optionLineString);

    const optionPolygon = document.createElement('option');
    optionPolygon.setAttribute('value', 'Polygon');
    optionPolygon.innerHTML = 'Polygon';
    select.appendChild(optionPolygon);

    form.appendChild(select);

    const element = document.createElement('div');
    element.className = 'ol-control';
    element.id = 'geomTypeControl'
    element.appendChild(form);

    super({
      element: element,
      target: options.target,
    });
  }
}

const map = new Map({
  controls: defaultControls().extend([
    mousePositionControl,
    new GeomTypeControl()
  ]),
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  target: 'map',
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});
