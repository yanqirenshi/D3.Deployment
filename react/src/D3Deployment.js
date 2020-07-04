import D3Svg from '@yanqirenshi/d3.svg';
import { DrawerGeometry, DrawerHierarchy } from './Drawer.js';

import D3DeploymentNode from './D3DeploymentNode.js';
import D3DeploymentEdge from './D3DeploymentEdge.js';
import D3DeploymentPort from './D3DeploymentPort.js';

export default class D3Deployment {
    constructor () {
        this._nodes = { list: [], ht: {}, tree: [] };
        this._edges = { list: [], ht: {} };
        this._ports = { list: [], ht: {} };

        this.id_counter = 1;

        this._calculator = new DrawerGeometry();
        this._drawer     = new DrawerHierarchy();
        this._node       = new D3DeploymentNode();
        this._port       = new D3DeploymentPort();
        this._edge       = new D3DeploymentEdge();

        this._painter = {
            NODE: this._node,
            EDGE: this._edge,
            PORT: this._port,
        };

        this.selector = null;
        this.w = 0;
        this.h = 0;
        this.look = { at: { x:0, y:0 }, };
        this.scale = 1;

        this._d3svg = null;
        this._layerForeground = null;
        this._layerBackground = null;
    }
    init (params) {
        // D3SVG
        this.selector = params.svg.selector;
        this.w = params.svg.w || 0;
        this.h = params.svg.h || 0;
        this.look = params.svg.look || { at: { x:0, y:0 }, };
        this.scale = params.svg.scale || 1;

        const svg = this.getSvgElement();

        this._node.addFilterShadow(svg);

        var marker = svg
            .append("defs") // TODO: さがせよ
            .append("marker")
            .attr('id', "edge-arrow")
            .attr('refX', 15)
            .attr('refY', 5)
            .attr('markerWidth', 10)
            .attr('markerHeight', 10)
            .attr('orient', "auto");

        // 矢印の形をpathで定義します。
        marker.append("path")
            .attr('d', "M 0,0 V 10 L10,5 Z")
            .attr('fill', "#333");

        return this;
    }
    /* ******** */
    /*  SVG     */
    /* ******** */
    makeSvg () {
        let d3svg = new D3Svg();

        d3svg.init({
            d3_element: this.selector,
            w:     this.w,
            h:     this.h,
            look:  this.look,
            scale: this.scale,
        });

        return d3svg;
    }
    getSvg () {
        if (this._d3svg)
            return this._d3svg;

        this._d3svg = this.makeSvg();

        this.makeLayers();

        return this._d3svg;
    }
    getSvgElement () {
        return this.getSvg().d3Element();
    }
    /* ******** */
    /*  Layers  */
    /* ******** */
    makeLayers () {
        const layers = [
            { id: 1, name: 'background' },
            { id: 2, name: 'foreground' },
        ];

        this.getSvgElement()
            .selectAll('g.layer')
            .data(layers, (d) => { return d.id; })
            .enter()
            .append('g')
            .attr('class', (d) => {
                return 'layer ' + d.name;
            });
    }
    getLayerForeground () {
        if (this._layerForeground)
            return this._layerForeground;

        let svg = this.getSvgElement();

        this._layerForeground = svg.select('g.layer.foreground');

        return this._layerForeground;
    }
    getLayerBackground () {
        if (this._layerBackground)
            return this._layerBackground;

        let svg = this.getSvgElement();

        this._layerBackground = svg.select('g.layer.background');

        return this._layerBackground;
    }
    /* ******** */
    /*  DATA  */
    /* ******** */
    data2pool (trees, pool) {
        for (let tree of trees) {
            let id = tree._id;

            pool.ht[id] = tree;
            pool.list.push(tree);

            if (tree.children)
                this.data2pool(tree.children, pool);
        }

        return pool;
    }
    importNodes (nodes) {
        let node = this._node;

        let tmp = (nodes || []).map((d) => {
            return node.normalize(d);
        });

        let drawer = this._drawer;
        for (let data of tmp)
            drawer.fitting(data);

        let pool = this.data2pool(tmp, this._nodes);

        pool.tree = tmp;

        return pool;
    }
    importEdges (edges) {
        let edge = this._edge;

        let id = 1;

        let tmp = (edges || []).map((d) => {
            d._id = this.id_counter++;
            return edge.normalize(d, id++);
        });

        return this.data2pool(tmp, this._edges);
    }
    makePort (type, node, edge) {
        let port = this._port.normalize({
            node:   node,
            edge:   edge,
            _id:    this.id_counter++,
            _class: 'PORT',
            _type:  type,
        });

        this._ports.list.push(port);
        this._ports.ht[port._id] = port;

        return port;
    }
    makePorts (edges) {
        let nodes = this._nodes.ht;

        for (let edge of edges){
            let node_from = nodes[edge.from.id];
            let node_to   = nodes[edge.to.id];

            edge.from.node = node_from;
            edge.to.node   = node_to;

            edge.from.port = this.makePort('FROM', edge.from.node, edge);
            edge.to.port   = this.makePort('TO',   edge.to.node,   edge);
        }
    }
    getPortLineFrom (node) {
        return {
            x: Math.floor(node.size.w / 2) + node.position.x ,
            y: Math.floor(node.size.h / 2) + node.position.y
        };
    }
    getPortLineToPoint (node) {
        let w = node.size.w;
        let h = node.size.h;

        return {
            x: 0,
            y: Math.floor(Math.sqrt((w * w) + (h * h))),
        };
    }
    getPortLineTo (degree, node) {
        let point = this.getPortLineToPoint(node);
        let x = point.x;
        let y = point.y;

        let degree_tmp;
        if (degree===0)
            degree_tmp = degree;
        else if (!degree)
            degree_tmp = 90;
        else
            degree_tmp = degree % 360;

        let radian = this._calculator.deg2rad(degree_tmp);
        let cos = Math.cos(radian);
        let sin = Math.sin(radian);

        return {
            x: Math.floor(x * cos - y * sin),
            y: Math.floor(x * sin + y * cos),
        };
    }
    /**
     * Port の位置を計算するため、Port と Nodeの中心の直線を算出する。
     *
     * @param {object} port Line を算出する対象の Port。 TODO: これ、つこてなくない？
     * @param {number} port_pos_degree Port の位置。
     * @param {object} node port の Node。 算出した Line の位置を補正するための Node
     */
    makePortLine (degree, node) {
        let from = this.getPortLineFrom(node);
        let to   = this.getPortLineTo(degree, node);

        return {
            from: {
                x: from.x,
                y: from.y,
            },
            to: {
                x: to.x + from.x,
                y: to.y + from.y,
            },
        };
    }
    positioningPort (port, port_pos_degree, node) {
        let calc = this._calculator;

        let lines_entity = this._node.getFourSides(node);
        let line_port    = this.makePortLine(port_pos_degree, node);

        return calc.getCrossPoint(lines_entity, line_port) || {x:0, y:0};
    }
    fittingPort (port) {
        let port_pos;
        if (port._type==='FROM')
            port_pos = port.edge._core.from.position;
        else
            port_pos = port.edge._core.to.position;

        let position = this.positioningPort(port,
                                            port_pos,
                                            port.node);

        port.position = position;
    }
    fittingEdge (edge) {
        edge.from.position = {
            x: edge.from.port.position.x,
            y: edge.from.port.position.y,
        };

        edge.to.position = {
            x: edge.to.port.position.x,
            y: edge.to.port.position.y,
        };
    }
    /**
     * data を元に描画用のデータに変換する。
     * 変換したデータを保管する。
     * data.edge を元に port のデータも作成する。
     * @param {object} data { node: [], edges: [] }
     */
    data (data) {
        if (arguments.length===0)
            return this._nodes.list;

        this.importNodes(data.nodes);
        this.importEdges(data.edges);

        this.makePorts(this._edges.list);

        // fitting ports
        for (let port of this._ports.list)
            this.fittingPort(port);

        // fitting edges
        for (let edge of this._edges.list)
            this.fittingEdge(edge);

        this.draw();

        return this;
    }
    elementDataList () {

        return [].concat(
            this._nodes.list,
            this._edges.list,
            this._ports.list
        );
    }
    ///// ////////////////////////////////////////////////////////////////
    /////   Flatten
    ///// ////////////////////////////////////////////////////////////////
    flattenCore (data, lev) {
        let out = [data];

        let children = data.children.reduce((acc, val) => {
            val._level = lev;
            return acc.concat(this.flattenCore(val, lev * 10));
        }, []);

        return out.concat(children);
    }
    flatten () {
        let data = this._nodes.tree;

        if (!data)
            return [];

        let lev = 10;
        return data.reduce((acc, val) => {
            val._level = lev;
            return acc.concat(this.flattenCore(val, lev * 10));
        }, []);
    }
    getDrawElements () {
        let out = this.flatten();

        // port に level を設定
        for (let port of this._ports.list) {
            port._level = port.node._level;
            out.push(port);
        }

        // edge に level を設定
        for (let edge of this._edges.list) {
            let lev_from = edge.from.port._level;
            let lev_to   = edge.to.port._level;
            if (lev_from > lev_to)
                edge._level = lev_from - 1;
            else
                edge._level = lev_to   - 1;

            out.push(edge);
        }

        // ソートして返す
        return out.sort((a, b) => {
            return (a._level < b._level) ? -1 : 1;
        });
    }
    ///// ////////////////////////////////////////////////////////////////
    /////   Draw
    ///// ////////////////////////////////////////////////////////////////
    painter(element_class) {
        let painter = this._painter[element_class];

        return painter || null;
    }
    drawElement (place, element) {
        let painter = this.painter(element._class);

        if (!painter)
            return;

        painter.draw(place, element);
    }
    draw() {
        let place = this.getLayerForeground();

        let elements = this.getDrawElements();

        for (let element of elements)
            this.drawElement(place, element);
    }
}
