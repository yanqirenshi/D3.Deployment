"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _assh0le = require("@yanqirenshi/assh0le");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Node = /*#__PURE__*/function () {
  function Node() {
    _classCallCheck(this, Node);

    this.label = new _assh0le.Label();
    this.rectangle = new _assh0le.Rectangle();
    this.position = new _assh0le.Position();
    this.stroke = new _assh0le.Stroke();
    this.background = new _assh0le.Background();
    this.padding = new _assh0le.Padding();
  } ///// ////////////////////////////////////////////////////////////////
  /////   Utility
  ///// ////////////////////////////////////////////////////////////////


  _createClass(Node, [{
    key: "getFourSides",
    value: function getFourSides(data) {
      var port_r = 4;
      var margin = 4 + port_r;
      var x = data._position.x;
      var y = data._position.y;
      var w = data._size.w;
      var h = data._size.h;
      var top_left = {
        x: x - margin,
        y: y - margin
      };
      var top_right = {
        x: x + w + margin,
        y: y - margin
      };
      var bottom_rigth = {
        x: x + w + margin,
        y: y + h + margin
      };
      var bottom_left = {
        x: x - margin,
        y: y + h + margin
      };
      return [{
        from: top_left,
        to: top_right
      }, {
        from: top_right,
        to: bottom_rigth
      }, {
        from: bottom_rigth,
        to: bottom_left
      }, {
        from: bottom_left,
        to: top_left
      }];
    } ///// ////////////////////////////////////////////////////////////////
    /////   Adjust
    ///// ////////////////////////////////////////////////////////////////

  }, {
    key: "dataTemplate",
    value: function dataTemplate() {
      return {
        type: '',
        label: {
          contents: '',
          position: {
            x: 20,
            y: 20
          },
          font: {
            size: 16,
            color: '#333333'
          }
        },
        position: null,
        size: null,
        background: null,
        border: null,
        link: null,
        children: [],
        _id: null,
        _core: null,
        _class: 'NODE'
      };
    }
  }, {
    key: "normalizeBase",
    value: function normalizeBase(data) {
      var core = data._core;
      if (core.id || core.id === 0) data._id = core.id;
      if (core.type) data.type = core.type;
      if (core.link) data.link = core.link;else data.link = {
        url: null
      };
    }
  }, {
    key: "normalize",
    value: function normalize(data) {
      var _this = this;

      if (!data) return null;
      var new_data = this.dataTemplate();
      new_data._core = data;
      var children = data.children;
      if (children && children.length > 0) new_data.children = children.map(function (child) {
        return _this.normalize(child);
      });
      this.normalizeBase(new_data);
      new_data.label = this.label.build(new_data._core.label);
      new_data.size = this.rectangle.build(new_data._core.size);
      new_data.position = this.position.build(new_data._core.position);
      new_data.border = this.stroke.build(new_data._core.border) || this.stroke.template();
      new_data.padding = this.padding.build(new_data._core.padding);
      new_data.background = this.background.build(new_data._core.background);
      data._node = new_data;
      return new_data;
    } ///// ////////////////////////////////////////////////////////////////
    /////   Filter
    ///// ////////////////////////////////////////////////////////////////

  }, {
    key: "addFilterShadow",
    value: function addFilterShadow(svg) {
      var filter = svg.append("defs").append("filter").attr("id", "drop-shadow").attr("height", "130%");
      filter.append("feGaussianBlur").attr("in", "SourceAlpha").attr("stdDeviation", 5).attr("result", "blur");
      filter.append("feOffset").attr("in", "blur").attr("dx", 5).attr("dy", 5).attr("result", "offsetBlur");
      var feMerge = filter.append("feMerge");
      feMerge.append("feMergeNode").attr("in", "offsetBlur");
      feMerge.append("feMergeNode").attr("in", "SourceGraphic");
    } ///// ////////////////////////////////////////////////////////////////
    /////   Draw
    ///// ////////////////////////////////////////////////////////////////

  }, {
    key: "drawGroup",
    value: function drawGroup(place, data, type) {
      return place.selectAll('g.' + type).data([data], function (d) {
        return d._id;
      }).enter().append('g').attr('class', type).attr("transform", function (d) {
        return "translate(" + d._position.x + "," + d._position.y + ")";
      }).attr('level', function (d) {
        return d._level;
      });
    }
  }, {
    key: "drawBody",
    value: function drawBody(groups) {
      groups.append('rect').attr('class', 'node-body').attr('width', function (d) {
        return d._size.w;
      }).attr('height', function (d) {
        return d._size.h;
      }).attr('rx', function (d) {
        return d.border && d.border.r || 0;
      }).attr('ry', function (d) {
        return d.border && d.border.r || 0;
      }).attr('fill', function (d) {
        return d.background.color;
      }).attr('stroke', function (d) {
        return d.border.color;
      }).attr('stroke-width', function (d) {
        return d.border.width;
      }).style("filter", function (d) {
        return d.type === 'NODE' ? 'url(#drop-shadow)' : '';
      });
    }
  }, {
    key: "drawLabel",
    value: function drawLabel(groups) {
      groups.append('text').attr('class', 'node-label').attr('x', function (d) {
        return d.label.position.x;
      }).attr('y', function (d) {
        return d.label.position.y;
      }).style('fill', function (d) {
        return d.label.font.color;
      }).attr('stroke', function (d) {
        return 'none';
      }).style('font-size', function (d) {
        return d.label.font.size;
      }).text(function (d) {
        return d.label.text;
      });
    }
  }, {
    key: "drawIcon",
    value: function drawIcon(groups) {
      var icon_groups = groups.append('g').attr('class', 'icon-group').attr("transform", function (d) {
        return "translate(" + (d.size.w - 24 - 20) + "," + 15 + ")";
      });
      icon_groups.append('rect').attr('class', 'node-body').attr('width', function (d) {
        return 18;
      }).attr('height', function (d) {
        return 24;
      }).attr('x', function (d) {
        return 6;
      }).attr('y', function (d) {
        return 0;
      }).attr('fill', function (d) {
        return '#fff';
      }).attr('stroke', function (d) {
        return '#333';
      }).attr('stroke-width', function (d) {
        return 1;
      });
      icon_groups.append('rect').attr('class', 'node-body').attr('width', function (d) {
        return 12;
      }).attr('height', function (d) {
        return 6;
      }).attr('x', function (d) {
        return 0;
      }).attr('y', function (d) {
        return 3;
      }).attr('fill', function (d) {
        return '#fff';
      }).attr('stroke', function (d) {
        return '#333';
      }).attr('stroke-width', function (d) {
        return 1;
      });
      icon_groups.append('rect').attr('class', 'node-body').attr('width', function (d) {
        return 12;
      }).attr('height', function (d) {
        return 6;
      }).attr('x', function (d) {
        return 0;
      }).attr('y', function (d) {
        return 15;
      }).attr('fill', function (d) {
        return '#fff';
      }).attr('stroke', function (d) {
        return '#333';
      }).attr('stroke-width', function (d) {
        return 1;
      });
    }
  }, {
    key: "drawLink",
    value: function drawLink(groups) {
      var a_element = groups.append('a').attr('class', 'link-alt').attr('href', function (d) {
        var url = d.link.url;
        if (!url) return null;
        if (typeof url === "function") return url(d);
        return url;
      }).attr('target', '_blank').attr('rel', 'noopener noreferrer').style('color', '#888888');
      a_element.append('text').attr('x', function (d) {
        return 10;
      }).attr('y', function (d) {
        return d.size.h - 10;
      }).style("font-size", function (d) {
        return '12px';
      }).style("display", function (d) {
        if (!d.link.url) return 'none';
        return 'block';
      }).text(function (d) {
        if (!d.link.url) return '';
        return 'link';
      });
    }
  }, {
    key: "drawComponent",
    value: function drawComponent(place, data) {
      var groups = this.drawGroup(place, data, 'component');
      this.drawBody(groups, data);
      this.drawIcon(groups, data);
      this.drawLabel(groups, data);
      this.drawLink(groups, data);
    }
  }, {
    key: "drawNode",
    value: function drawNode(place, data) {
      var groups = this.drawGroup(place, data, 'node');
      this.drawBody(groups, data);
      this.drawLabel(groups, data);
      this.drawLink(groups, data);
    }
  }, {
    key: "draw",
    value: function draw(place, data) {
      if (data.type === 'NODE') {
        this.drawNode(place, data);
        return;
      }

      if (data.type === 'COMPONENT') {
        this.drawComponent(place, data);
        return;
      }
    }
  }]);

  return Node;
}();

exports["default"] = Node;