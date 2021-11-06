"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _assh0le = require("@yanqirenshi/assh0le");

var _Node = _interopRequireDefault(require("./Node.js"));

var _Edge = _interopRequireDefault(require("./Edge.js"));

var _Port = _interopRequireDefault(require("./Port.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Rectum = /*#__PURE__*/function (_Colon) {
  _inherits(Rectum, _Colon);

  var _super = _createSuper(Rectum);

  function Rectum(params) {
    var _this;

    _classCallCheck(this, Rectum);

    _this = _super.call(this, params);
    _this.id_counter = 1;
    _this._calculator = new _assh0le.Geometry();
    _this._node = new _Node["default"]();
    _this._port = new _Port["default"]();
    _this._edge = new _Edge["default"]();
    _this._painter = {
      NODE: _this._node,
      EDGE: _this._edge,
      PORT: _this._port
    };
    return _this;
  }
  /* ******** */

  /*  Getter  */

  /* ******** */


  _createClass(Rectum, [{
    key: "node",
    value: function node() {
      return this._node;
    }
  }, {
    key: "port",
    value: function port() {
      return this._port;
    }
  }, {
    key: "edge",
    value: function edge() {
      return this._edge;
    }
    /* **************************** */

    /*  Overwrite Asshole function  */

    /* **************************** */

  }, {
    key: "selector_setAfter",
    value: function selector_setAfter() {
      this.node().addFilterShadow(this.d3Element());
    }
    /* ******** */

    /*  DATA  */

    /* ******** */

  }, {
    key: "data2pool",
    value: function data2pool(trees, pool) {
      var _iterator = _createForOfIteratorHelper(trees),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var tree = _step.value;
          var id = tree._id;
          pool.ht[id] = tree;
          pool.list.push(tree);
          if (tree.children) this.data2pool(tree.children, pool);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return pool;
    }
  }, {
    key: "makeNodes",
    value: function makeNodes(nodes) {
      var node = this.node();
      var tmp = (nodes || []).map(function (d) {
        return node.normalize(d);
      });
      var h = new _assh0le.Hierarchy();

      var _iterator2 = _createForOfIteratorHelper(tmp),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var data = _step2.value;
          h.fitting(data);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      var pool = this.data2pool(tmp, {
        list: [],
        ht: {},
        tree: []
      });
      pool.tree = tmp;
      return pool;
    }
  }, {
    key: "makeEdges",
    value: function makeEdges(edges) {
      var _this2 = this;

      var edge = this.edge();
      var id = 1;
      var tmp = (edges || []).map(function (d) {
        d._id = _this2.id_counter++;
        return edge.normalize(d, id++);
      });
      return this.data2pool(tmp, {
        list: [],
        ht: {}
      });
    }
  }, {
    key: "makePort",
    value: function makePort(type, node, edge, ports) {
      var port = this.port().normalize({
        node: node,
        edge: edge,
        _id: this.id_counter++,
        _class: 'PORT',
        _type: type
      });
      ports.list.push(port);
      ports.ht[port._id] = port;
      return port;
    }
  }, {
    key: "makePorts",
    value: function makePorts(nodes, edges) {
      var ports = {
        list: [],
        ht: {}
      };

      var _iterator3 = _createForOfIteratorHelper(edges),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var edge = _step3.value;
          var node_from = nodes[edge.from.id];
          var node_to = nodes[edge.to.id];
          edge.from.node = node_from;
          edge.to.node = node_to;
          edge.from.port = this.makePort('FROM', edge.from.node, edge, ports);
          edge.to.port = this.makePort('TO', edge.to.node, edge, ports);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      return ports;
    }
  }, {
    key: "getPortLineFrom",
    value: function getPortLineFrom(node) {
      return {
        x: Math.floor(node._size.w / 2) + node._position.x,
        y: Math.floor(node._size.h / 2) + node._position.y
      };
    }
  }, {
    key: "getPortLineToPoint",
    value: function getPortLineToPoint(node) {
      var w = node._size.w;
      var h = node._size.h;
      return {
        x: 0,
        y: Math.floor(Math.sqrt(w * w + h * h))
      };
    }
  }, {
    key: "getPortLineTo",
    value: function getPortLineTo(degree, node) {
      var point = this.getPortLineToPoint(node);
      var x = point.x;
      var y = point.y;
      var degree_tmp;
      if (degree === 0) degree_tmp = degree;else if (!degree) degree_tmp = 90;else degree_tmp = degree % 360;

      var radian = this._calculator.deg2rad(degree_tmp);

      var cos = Math.cos(radian);
      var sin = Math.sin(radian);
      return {
        x: Math.floor(x * cos - y * sin),
        y: Math.floor(x * sin + y * cos)
      };
    }
    /**
     * Port の位置を計算するため、Port と Nodeの中心の直線を算出する。
     *
     * @param {object} port Line を算出する対象の Port。 TODO: これ、つこてなくない？
     * @param {number} port_pos_degree Port の位置。
     * @param {object} node port の Node。 算出した Line の位置を補正するための Node
     */

  }, {
    key: "makePortLine",
    value: function makePortLine(degree, node) {
      var from = this.getPortLineFrom(node);
      var to = this.getPortLineTo(degree, node);
      return {
        from: {
          x: from.x,
          y: from.y
        },
        to: {
          x: to.x + from.x,
          y: to.y + from.y
        }
      };
    }
  }, {
    key: "positioningPort",
    value: function positioningPort(port, port_pos_degree, node) {
      var calc = this._calculator;
      var lines_entity = this.node().getFourSides(node);
      var line_port = this.makePortLine(port_pos_degree, node);
      return calc.getCrossPoint(lines_entity, line_port) || {
        x: 0,
        y: 0
      };
    }
  }, {
    key: "fittingPort",
    value: function fittingPort(port) {
      var port_pos;
      if (port._type === 'FROM') port_pos = port.edge._core.from.position;else port_pos = port.edge._core.to.position;
      var position = this.positioningPort(port, port_pos, port.node);
      port.position = position;
    }
  }, {
    key: "fittingEdge",
    value: function fittingEdge(edge) {
      edge.from.position = {
        x: edge.from.port.position.x,
        y: edge.from.port.position.y
      };
      edge.to.position = {
        x: edge.to.port.position.x,
        y: edge.to.port.position.y
      };
    }
    /**
     * data を元に描画用のデータに変換する。
     * 変換したデータを保管する。
     * data.edge を元に port のデータも作成する。
     * @param {object} data { node: [], edges: [] }
     */

  }, {
    key: "data",
    value: function data(_data) {
      if (arguments.length === 0) return _get(_getPrototypeOf(Rectum.prototype), "data", this).call(this);
      var nodes = this.makeNodes(_data.nodes);
      var edges = this.makeEdges(_data.edges);
      var ports = this.makePorts(nodes.ht, edges.list); // fitting ports

      var _iterator4 = _createForOfIteratorHelper(ports.list),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var port = _step4.value;
          this.fittingPort(port);
        } // fitting edges

      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      var _iterator5 = _createForOfIteratorHelper(edges.list),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var edge = _step5.value;
          this.fittingEdge(edge);
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }

      return _get(_getPrototypeOf(Rectum.prototype), "data", this).call(this, {
        nodes: nodes,
        edges: edges,
        ports: ports
      });
    } ///// ////////////////////////////////////////////////////////////////
    /////   Flatten
    ///// ////////////////////////////////////////////////////////////////

  }, {
    key: "flattenCore",
    value: function flattenCore(data, lev) {
      var _this3 = this;

      var out = [data];
      var children = data.children.reduce(function (acc, val) {
        val._level = lev;
        return acc.concat(_this3.flattenCore(val, lev * 10));
      }, []);
      return out.concat(children);
    }
  }, {
    key: "flatten",
    value: function flatten(data) {
      var _this4 = this;

      var nodes = data.nodes.tree;
      if (!nodes) return [];
      var lev = 10;
      return nodes.reduce(function (acc, val) {
        val._level = lev;
        return acc.concat(_this4.flattenCore(val, lev * 10));
      }, []);
    }
  }, {
    key: "getDrawElements",
    value: function getDrawElements(data) {
      var out = this.flatten(data);
      var ports = data.ports.list;
      var edges = data.edges.list; // port に level を設定

      var _iterator6 = _createForOfIteratorHelper(ports),
          _step6;

      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var port = _step6.value;
          port._level = port.node._level;
          out.push(port);
        } // edge に level を設定

      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }

      var _iterator7 = _createForOfIteratorHelper(edges),
          _step7;

      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var edge = _step7.value;
          var lev_from = edge.from.port._level;
          var lev_to = edge.to.port._level;
          if (lev_from > lev_to) edge._level = lev_from - 1;else edge._level = lev_to - 1;
          out.push(edge);
        } // ソートして返す

      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }

      return out.sort(function (a, b) {
        return a._level < b._level ? -1 : 1;
      });
    } ///// ////////////////////////////////////////////////////////////////
    /////   Draw
    ///// ////////////////////////////////////////////////////////////////

  }, {
    key: "painter",
    value: function painter(element_class) {
      var painter = this._painter[element_class];
      return painter || null;
    }
  }, {
    key: "drawElement",
    value: function drawElement(place, element) {
      var painter = this.painter(element._class);
      if (!painter) return;
      painter.draw(place, element);
    }
  }, {
    key: "draw",
    value: function draw() {
      var place = this.layer('foreground');
      var data = this.data();
      var elements = this.getDrawElements(data);

      var _iterator8 = _createForOfIteratorHelper(elements),
          _step8;

      try {
        for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
          var element = _step8.value;
          this.drawElement(place, element);
        }
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
      }
    }
  }]);

  return Rectum;
}(_assh0le.Colon);

exports["default"] = Rectum;