class D3DeploymentMarkers {
    addMarkerComponent (svg) {
    }
    addMarkerFile (svg) {
    }
}

class D3DeploymentNode {
    constructor() {
        this.drawer = new DrawerHierarchy();
    }
    ///// ////////////////////////////////////////////////////////////////
    /////   Utility
    ///// ////////////////////////////////////////////////////////////////
    getFourSides  (data) {
        let port_r = 4;
        let margin =  4 + port_r;

        let x = data.position.x;
        let y = data.position.y;

        let w = data.size.w;
        let h = data.size.h;

        let top_left     = { x: x -     margin, y: y -     margin};
        let top_right    = { x: x + w + margin, y: y -     margin};
        let bottom_rigth = { x: x + w + margin, y: y + h + margin};
        let bottom_left  = { x: x -     margin, y: y + h + margin};

        return [
            { from: top_left,     to: top_right    },
            { from: top_right,    to: bottom_rigth },
            { from: bottom_rigth, to: bottom_left  },
            { from: bottom_left,  to: top_left     },
        ];
    }
    ///// ////////////////////////////////////////////////////////////////
    /////   Adjust
    ///// ////////////////////////////////////////////////////////////////
    dataTemplate () {
        return {
            type: '',
            label: {
                contents: '',
                position: { x: 20, y: 20 },
                font: { size: 16, color: '#333333' },
            },
            position: null,
            size:     null,
            background: null,
            border: null,
            link: null,
            children: [],
            _id: null,
            _core: null,
            _class: 'NODE',
        };
    };
    normalizeBase (data) {
        let core = data._core;

        if (core._id || core._id==0)
            data._id = core._id;

        if (core.type)
            data.type = core.type;

        if (core.link)
            data.link = core.link;
        else
            data.link = { url: null };
    }
    normalize (data) {
        if (!data)
            return null;

        let new_data = this.dataTemplate();

        new_data._core = data;

        if (data.children && data.children.length > 0)
            new_data.children = data.children.map((d) => {
                return this.normalize(d);
            });

        this.normalizeBase(new_data);

        let drawer = this.drawer;
        new_data.label      = drawer.normalizeLabel(new_data._core.label);
        new_data.size       = drawer.normalizeSize(new_data._core.size);
        new_data.position   = drawer.normalizePosition(new_data._core.position);
        new_data.border     = drawer.normalizeBorder(new_data._core.border);
        new_data.padding    = drawer.normalizePadding(new_data._core.padding);

        new_data.background = drawer.normalizeBackground(new_data._core.background);

        return new_data;
    }
    ///// ////////////////////////////////////////////////////////////////
    /////   Filter
    ///// ////////////////////////////////////////////////////////////////
    addFilterShadow (svg) {
        var filter = svg.append("defs")
            .append("filter")
            .attr("id", "drop-shadow")
            .attr("height", "130%");

        var feGaussianBlur = filter.append("feGaussianBlur")
            .attr("in", "SourceAlpha")
            .attr("stdDeviation", 5)
            .attr("result", "blur");

        filter.append("feOffset")
            .attr("in", "blur")
            .attr("dx", 5)
            .attr("dy", 5)
            .attr("result", "offsetBlur");

        var feMerge = filter.append("feMerge");

        feMerge
            .append("feMergeNode")
            .attr("in", "offsetBlur");
        feMerge
            .append("feMergeNode")
            .attr("in", "SourceGraphic");
    }
    ///// ////////////////////////////////////////////////////////////////
    /////   Draw
    ///// ////////////////////////////////////////////////////////////////
    drawBody (groups) {
        groups
            .append('rect')
            .attr('class', 'node-body')
            .attr('width', (d) => { return d.size.w;})
            .attr('height', (d) => { return d.size.h;})
            .attr('rx', (d) => { return d.border && d.border.r || 0;})
            .attr('ry', (d) => { return d.border && d.border.r || 0;})
            .attr('fill', (d) => {
                return d.background.color;
            })
            .attr('stroke', (d) => { return d.border.color; })
            .attr('stroke-width', (d) => { return d.border.width; })
            .style("filter", (d) => {
                return (d.type=='NODE') ? 'url(#drop-shadow)' : '';
            });
    }
    drawLabel (groups) {
        groups
            .append('text')
            .attr('class', 'node-label')
            .attr('x',  (d) => {
                return d.label.position.x;
            })
            .attr('y', (d) => {
                return d.label.position.y;
            })
            .style('fill', (d) => {
                return d.label.font.color;
            })
            .attr('stroke', (d) => {
                return 'none';
            })
            .style('font-size', (d) => {
                return d.label.font.size;
            })
            .text((d) => {
                return d.label.contents;
            })
        ;
    }
    drawIcon (groups) {
        let icon_groups = groups
            .append('g')
            .attr('class', 'icon-group')
            .attr("transform", (d) => {
                return "translate(" +
                    (d.size.w - 24 - 20) + "," +
                    15 +
                    ")";
            });

        icon_groups
            .append('rect')
            .attr('class', 'node-body')
            .attr('width', (d) => { return 18;})
            .attr('height', (d) => { return 24;})
            .attr('x', (d) => { return 6;})
            .attr('y', (d) => { return 0;})
            .attr('fill', (d) => {
                return '#fff';
            })
            .attr('stroke', (d) => { return '#333'; })
            .attr('stroke-width', (d) => { return 1; });

        icon_groups
            .append('rect')
            .attr('class', 'node-body')
            .attr('width', (d) => { return 12;})
            .attr('height', (d) => { return 6;})
            .attr('x', (d) => { return 0;})
            .attr('y', (d) => { return 3;})
            .attr('fill', (d) => {
                return '#fff';
            })
            .attr('stroke', (d) => { return '#333'; })
            .attr('stroke-width', (d) => { return 1; });

        icon_groups
            .append('rect')
            .attr('class', 'node-body')
            .attr('width', (d) => { return 12;})
            .attr('height', (d) => { return 6;})
            .attr('x', (d) => { return 0;})
            .attr('y', (d) => { return 15;})
            .attr('fill', (d) => {
                return '#fff';
            })
            .attr('stroke', (d) => { return '#333'; })
            .attr('stroke-width', (d) => { return 1; });
    }
    drawLink (groups) {
        let a_element = groups
            .append('a')
            .attr('class', 'link-alt')
            .attr('href', (d) => {
                let url = d.link.url;

                if (!url)
                    return null;

                if (typeof(url) == "function")
                    return url(d);

                return url;
            })
            .attr('target', '_blank')
            .attr('rel', 'noopener noreferrer')
            .style('color', '#888888');

        a_element
            .append('i')
            .attr('class', 'fas fa-external-link-alt')
            .attr('width', (d) => { return 22;})
            .attr('height', (d) => { return 22;})
            .attr('x', (d) => { return 10;})
            .attr('y', (d) => {
                return d.size.h - 12 - 20;
            })
            .style("font-size", (d) => {
                return '12px';
            })
            .style("display", (d) => {
                if (!d.link.url)
                    return 'none';

                return 'block';
            });
    }
    drawComponent (place, data) {
        let groups = place.selectAll('g.node')
            .data([data], (d) => { return d._id; })
            .enter()
            .append('g')
            .attr('class', 'node')
            .attr("transform", (d) => {
                return "translate(" +
                    d.position.x + "," +
                    d.position.y +
                    ")";
            })
            .attr('level',  (d) => { return d._level;});

        this.drawBody(groups, data);
        this.drawIcon(groups, data);
        this.drawLabel(groups, data);
        this.drawLink(groups, data);
    }
    drawNode (place, data) {
        let groups = place.selectAll('g.node')
            .data([data], (d) => { return d._id; })
            .enter()
            .append('g')
            .attr('class', 'node')
            .attr("transform", (d) => {
                return "translate(" +
                    d.position.x + "," +
                    d.position.y +
                    ")";
            })
            .attr('level',  (d) => { return d._level;});

        this.drawBody(groups, data);
        this.drawLabel(groups, data);
        this.drawLink(groups, data);
    }
    draw (place, data) {
        if (data.type=='NODE') {
            this.drawNode(place, data);
            return;
        }

        if (data.type=='COMPONENT') {
            this.drawComponent(place, data);
            return;
        }
    }
}

class D3DeploymentEdge {
    dataTemplate () {
        return {
            from: {
                id: null,
                port: null,
                node: null,
                position: { x:0, y:0 },
            },

            to: {
                id: null,
                port: null,
                node: null,
                position: { x:0, y:0 },
            },

            _id:       null,
            _core:     null,
            _class:    'EDGE',
        };
    }
    normalize (data) {
        let new_data = this.dataTemplate();

        new_data._core = data;

        if (data._id)
            new_data._id = data._id;

        if (data.from._id)
            new_data.from.id = data.from._id;

        if (data.to._id)
            new_data.to.id = data.to._id;

        return new_data;
    }
    ///// ////////////////////////////////////////////////////////////////
    /////   Draw
    ///// ////////////////////////////////////////////////////////////////
    draw (place, data) {
        let lineData = [
            {
                "x": data.from.position.x,
                "y": data.from.position.y,
            },
            {
                "x": data.to.position.x,
                "y": data.to.position.y
            },
        ];

        let lineFunction = d3.line()
            .x(function(d) { return d.x; })
            .y(function(d) { return d.y; });

        let path = place
            .append("path")
            .datum(lineData)
            .attr("fill", "none")
            .attr("d", lineFunction)
            .attr('marker-end', "url(#edge-arrow)")
            .style("stroke-width", 1.5)
            .style('fill',   (d) => { return '#fff';})
            .style("stroke", (d) => { return '#888';});


        var len = path.node().getTotalLength();
        var t = len - (6 + 6 + 10);
        path
            .attr('stroke-dasharray', "0 " + 6 + " " + t + " " + 6)
            .attr( 'stroke-dashoffset', 0);
    }
}

class D3DeploymentPort {
    dataTemplate () {
        return {
            node:   null,
            edge:   null,
            _id:    null,
            _core:  null,
            _class: 'PORT',
        };
    }
    normalize (data) {
        let tmp = this.dataTemplate();

        tmp._core = data;

        return data;
    }
    ///// ////////////////////////////////////////////////////////////////
    /////   Draw
    ///// ////////////////////////////////////////////////////////////////
    draw (place, data) {
        place.selectAll('circle.port')
            .data([data], (d) => { return d._id; })
            .enter()
            .append('circle')
            .attr('class', 'port')
            .attr('cx', (d) => { return d.position.x;})
            .attr('cy', (d) => { return d.position.y;})
            .attr('r',  (d) => { return 6;})
            .attr('level',  (d) => { return d._level;})
            .style('fill',  (d) => { return '#fff';})
            .style("stroke", d => { return '#888';});
    }
}

class D3Deployment {
    constructor () {
        this._nodes = { list: [], ht: {}, tree: [] };
        this._edges = { list: [], ht: {} };
        this._ports = { list: [], ht: {} };

        this.id_counter = 1;

        this._painter = {
            NODE: new D3DeploymentNode(),
            EDGE: new D3DeploymentEdge(),
            PORT: new D3DeploymentPort(),
        };

        this._calculator = new DrawerGeometry();
        this._drawer     = new DrawerHierarchy();
        this._node       = new D3DeploymentNode();
        this._port       = new D3DeploymentPort();
        this._edge       = new D3DeploymentEdge();
    }
    init (svg) {
        new D3DeploymentNode().addFilterShadow(svg);

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

        let radian = this._calculator.deg2rad((degree || 90) % 360);
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

        let lines_entity = new D3DeploymentNode().getFourSides(node);
        let line_port    = this.makePortLine(port_pos_degree, node);

        return calc.getCrossPoint(lines_entity, line_port) || {x:0, y:0};
    }
    fittingPort (port) {
        let port_type = port._type;
        let node_pos  = port.node.position;
        let node_size = port.node.size;

        let port_pos;
        if (port._type=='FROM')
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
    data (data) {
        if (arguments.length==0)
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
    draw(place) {
        let elements = this.getDrawElements();

        for (let element of elements)
            this.drawElement(place, element);
    }
}
