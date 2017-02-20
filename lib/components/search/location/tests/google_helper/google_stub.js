'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = googleStub;

var _predictions = require('./predictions');

var _predictions2 = _interopRequireDefault(_predictions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function googleStub() {
  var predictionStub = function predictionStub(options, callback) {
    var suggestsGoogle = (0, _predictions2.default)().filter(function (prediction) {
      return prediction.description.indexOf(options.input) !== -1;
    });

    callback(suggestsGoogle.length > 0 ? suggestsGoogle : null);
  },
      geocodeStub = function geocodeStub(query, callback) {
    if (query.address === '' || query.placeId === '') {
      callback([], 'ZERO_RESULTS');
      return;
    }

    callback([{
      geometry: {
        location: {
          lat: function lat() {
            return 0;
          },
          lng: function lng() {
            return 0;
          }
        }
      }
    }], 'OK');
  },
      google = {
    maps: {
      LatLng: function LatLng() {
        return true;
      },
      places: {
        AutocompleteService: function AutocompleteService() {
          return {
            getPlacePredictions: predictionStub
          };
        }
      },
      Geocoder: function Geocoder() {
        return {
          geocode: geocodeStub
        };
      },

      GeocoderStatus: {
        'OK': 'OK'
      }
    }
  };

  return google;
}