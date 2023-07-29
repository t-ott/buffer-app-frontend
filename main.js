import './style.css';
import {Map, View} from 'ol';
import Draw from 'ol/interaction/Draw.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import {OSM, Vector as VectorSource} from 'ol/source.js';
import {Control, defaults as defaultControls, MousePosition} from 'ol/control.js';
import {WKT} from 'ol/format.js';
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
    const element = document.getElementById('geomTypeControl');
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
  const geomTypeValue = geomTypeSelect.value;
  console.log('addInteraction value:', geomTypeValue);
  if (geomTypeValue !== 'None') {
    draw = new Draw({
      source: source,
      type: geomTypeValue
    });
    map.addInteraction(draw);
  }
}

geomTypeSelect.onchange = function () {
  map.removeInteraction(draw);
  addInteraction();
};

document.onkeydown = function(e) {
  if (e.key == 'Escape' || e.key == 'Esc') {
    geomTypeSelect.value = 'None';
    map.removeInteraction(draw);
  }
}

map.on('singleclick', function(e) {
  const geomTypeValue = geomTypeSelect.value;
  if (geomTypeValue === 'None') {
    map.forEachFeatureAtPixel(e.pixel, function (f) {
      const geomTypeValue = geomTypeSelect.value;
  
        let geom = f.getGeometry();
        let format = new WKT();
        let wktGeom = format.writeGeometry(geom);
  
        console.log(wktGeom);
    });
  }
});

addInteraction();
