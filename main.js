import './style.css';
import {Map, View} from 'ol';
import Draw from 'ol/interaction/Draw.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import {OSM, Vector as VectorSource} from 'ol/source.js';
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
    select.id = 'geomTypeSelect';

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

const source = new VectorSource({wrapX: false});
const vector = new VectorLayer({
  source: source
});

const map = new Map({
  controls: defaultControls().extend([
    mousePositionControl,
    new GeomTypeControl()
  ]),
  layers: [
    new TileLayer({
      source: new OSM()
    }),
    vector
  ],
  target: 'map',
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});

const geomTypeSelect = document.getElementById('geomTypeSelect');

let draw;
function addInteraction() {
  const value = geomTypeSelect.value;
  console.log(value);
  draw = new Draw({
    source: source,
    type: geomTypeSelect.value
  });
  map.addInteraction(draw);
}

/**
 * Handle change event.
 */
geomTypeSelect.onchange = function () {
  map.removeInteraction(draw);
  addInteraction();
};

addInteraction();
