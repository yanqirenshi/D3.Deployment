"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Port = /*#__PURE__*/function () {
  function Port() {
    _classCallCheck(this, Port);
  }

  _createClass(Port, [{
    key: "dataTemplate",
    value: function dataTemplate() {
      return {
        node: null,
        edge: null,
        _id: null,
        _core: null,
        _class: 'PORT'
      };
    }
  }, {
    key: "normalize",
    value: function normalize(data) {
      var tmp = this.dataTemplate();
      tmp._core = data;
      return data;
    } ///// ////////////////////////////////////////////////////////////////
    /////   Draw
    ///// ////////////////////////////////////////////////////////////////

  }, {
    key: "draw",
    value: function draw(place, data) {
      place.selectAll('circle.port').data([data], function (d) {
        return d._id;
      }).enter().append('circle').attr('class', 'port').attr('cx', function (d) {
        return d.position.x;
      }).attr('cy', function (d) {
        return d.position.y;
      }).attr('r', function (d) {
        return 6;
      }).attr('level', function (d) {
        return d._level;
      }).style('fill', function (d) {
        return '#fff';
      }).style("stroke", function (d) {
        return '#888';
      });
    }
  }]);

  return Port;
}();

exports["default"] = Port;