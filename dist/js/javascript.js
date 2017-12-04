'use strict';

var _domready = require('domready');

var _domready2 = _interopRequireDefault(_domready);

var _svgToInline = require('./svg-to-inline.js');

var _svgToInline2 = _interopRequireDefault(_svgToInline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _domready2.default)(function () {
  // Executes after dow ready
});

(0, _svgToInline2.default)({
  elementsClass: 'svg',
  useTriggerClass: true
});