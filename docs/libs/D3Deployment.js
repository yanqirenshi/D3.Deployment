class D3DeploymentMarkers {
    addMarkerComponent (svg) {
    }
    addMarkerFile (svg) {
    }
}

class D3DeploymentNode {
    ///// ////////////////////////////////////////////////////////////////
    /////   Adjust
    ///// ////////////////////////////////////////////////////////////////
    dataTemplate () {
        return {
            type: '',
            label: {
                contents: '',
                position: { x: 20, y: 20 },
            },
            position: null,   // See Mthod: adjustPosition
            size:     null,   // See Metho: adjustSize
            background: null, // See Metho: adjustBackground,
            border: null,
            children: [],
            _id: null,
            _core: null,
            _class: 'NODE',
        };
    };
    adjustBase (data) {
        let core = data._core;

        if (data._core._id || data._core._id==0)
            data._id = data._core._id;

        if (data._core.type)
            data.type = data._core.type;
    }
    adjustLabel (data) {
        let core = data._core;

        if (!core.label)
            return;

        if (core.label.contents)
            data.label.contents = core.label.contents;

        if (core.label.position)
            data.label.position = core.label.position;
    }
    adjustSize (data) {
        let size_core = data._core.size;
        let template = { w: 0, h: 0 };

        if (!size_core) {
            data.size = template;

            return;
        }

        if (!data.size)
            data.size = template;

        let size = data.size;

        if (size_core.w || size_core.w==0)
            size.w = size_core.w;

        if (size_core.h || size_core.h==0)
            size.h = size_core.h;
    }
    adjustPosition (data) {
        let position_core = data._core.position;
        let template = { x: 0, y: 0 };

        if (!position_core) {
            data.position = template;

            return;
        }

        if (!data.position)
            data.position = template;

        let position = data.position;

        if (position_core.x || position_core.x==0)
            position.x = position_core.x;

        if (position_core.y || position_core.y==0)
            position.y = position_core.y;
    }
    adjustBackground (data) {
        let background_core = data._core.background;
        let template = {
            color: '#ffffff'
        };

        if (!background_core) {
            data.background = template;

            return;
        }

        if (!data.background)
            data.background = template;

        let background = data.background;

        if (background_core.color)
            background.color = background_core.color;
    }
    adjustBorder (data) {
        let border_core = data._core.border;
        let template = {
            width: 1,
            type: 'solid',
            color: '#666666'
        };

        if (!border_core) {
            data.border = template;

            return;
        }

        if (!data.border)
            data.border = template;

        let border = data.border;

        if (border_core.width || border_core.width==0)
            border.width = border_core.width;

        if (border_core.color)
            border.color = border_core.color;

        if (border_core.type)
            border.type = border_core.type;
    }
    adjustPadding (data) {
        let padding_core = data._core.padding;
        let template = { top: 0, left: 0, bottom: 0, right: 0 };

        if (!padding_core) {
            data.padding = template;

            return;
        }

        if (!data.padding)
            data.padding = template;

        let padding = data.padding;
    }
    adjust (data) {
        if (!data)
            return null;

        let new_data = this.dataTemplate();

        new_data._core = data;

        if (data.children && data.children.length > 0)
            new_data.children = data.children.map((d) => {
                return this.adjust(d);
            });

        this.adjustBase(new_data);
        this.adjustLabel(new_data);
        this.adjustSize(new_data);
        this.adjustPosition(new_data);
        this.adjustBackground(new_data);
        this.adjustBorder(new_data);
        this.adjustPadding(new_data);

        return new_data;
    }
    ///// ////////////////////////////////////////////////////////////////
    /////   Fitting
    ///// ////////////////////////////////////////////////////////////////
    element2rect (element) {
        return {
            from: {
                x: element.position.x,
                y: element.position.y,
            },
            to: {
                x: element.position.x + element.size.w,
                y: element.position.y + element.size.h,
            }
        };
    }
    fittingCalSizeCore (rect_a, rect_b) {
        if (!rect_a.from) {
            rect_a.from = { x: rect_b.from.x, y: rect_b.from.y };
        } else {
            if (rect_a.from.x > rect_b.from.x)
                rect_a.from.x = rect_b.from.x;

            if (rect_a.from.y > rect_b.from.y)
                rect_a.from.y = rect_b.from.y;
        }

        if (!rect_a.to) {
            rect_a.to = {
                x: rect_b.to.x,
                y: rect_b.to.y,
            };
        } else {
            if (rect_a.to.x < rect_b.to.x)
                rect_a.to.x = rect_b.to.x;

            if (rect_a.to.y < rect_b.to.y)
                rect_a.to.y = rect_b.to.y;
        }
    }
    fittingCalSize (rect, child) {
        let rect_a = rect;
        let rect_b = this.element2rect(child);

        this.fittingCalSizeCore(rect_a, rect_b);
    }
    fitting (data, parent) {
        // parent からの相対位置で補正
        if (parent) {
            data.position.x = parent.position.x + data.position.x;
            data.position.y = parent.position.y + data.position.y;
        }

        // children も同様に。
        let rect = {
            from: null,
            to: null,
        };

        // children の fitting 合せて data のサイズも計測。
        let children = data.children;
        if (children && children.length > 0) {
            for (let child of data.children) {
                this.fitting(child, data);

                this.fittingCalSize(rect, child); // rect は破壊的
            }

            // children 内容で data のサイズを補正
            this.fittingCalSizeCore(rect, this.element2rect(data));
            data.size.w = rect.to.x - rect.from.x;
            data.size.h = rect.to.y - rect.from.y;
        }
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
            });

        this.drawBody(groups, data);
        this.drawIcon(groups, data);
        this.drawLabel(groups, data);
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
            });

        this.drawBody(groups, data);
        this.drawLabel(groups, data);
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
    adjust (data) {
        let new_data = this.dataTemplate();

        if (data._id)
            new_data._id = data._id;

        if (data.from_id)
            new_data.from.id = data.from_id;

        if (data.to_id)
            new_data.to.id = data.to_id;

        return new_data;
    }
    ///// ////////////////////////////////////////////////////////////////
    /////   Draw
    ///// ////////////////////////////////////////////////////////////////
    draw (place, data) {
        place.selectAll('line.edge')
            .data([data], (d) => { return d._id; })
            .enter()
            .append('line')
            .attr('class', 'edge')
            .attr("x1", (d) => { return d.from.position.x;})
            .attr("y1", (d) => { return d.from.position.y;})
            .attr("x2", (d) => { return d.to.position.x;})
            .attr("y2", (d) => { return d.to.position.y;})
            .style('fill',   (d) => { return '#fff';})
            .style("stroke", (d) => { return '#888';})
            .attr("stroke-width", 1);
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
    adjust (data) {
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
            .attr('r',  (d) => { return 10;})
            .style('fill',  (d) => { return '#fff';})
            .style("stroke", d => { return '#888';});
    }
}

class D3Deployment {
    constructor () {
        this._nodes = { list: [], ht: {} };
        this._edges = { list: [], ht: {} };
        this._ports = { list: [], ht: {} };

        this.id_counter = 1;

        this._painter = {
            NODE: new D3DeploymentNode(),
            EDGE: new D3DeploymentEdge(),
            PORT: new D3DeploymentPort(),
        };
    }
    init (svg) {
        new D3DeploymentNode().addFilterShadow(svg);

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
        let node = new D3DeploymentNode();

        let tmp = (nodes || []).map((d) => {
            return node.adjust(d);
        });

        for (let data of tmp)
            node.fitting(data);

        return this.data2pool(tmp, this._nodes);
    }
    importEdges (edges) {
        let edge = new D3DeploymentEdge();
        let id = 1;

        let tmp = (edges || []).map((d) => {
            d._id = this.id_counter++;
            return edge.adjust(d, id++);
        });

        return this.data2pool(tmp, this._edges);
    }
    makePort (type, node, edge) {
        let port = new D3DeploymentPort().adjust({
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
    fittingPorts () {
        for (let port of this._ports.list) {
            let port_type = port._type;
            let node_pos  = port.node.position;
            let node_size = port.node.size;

            if (port_type=='FROM') {
                port.position = {
                    x: node_pos.x + node_size.w + 20,
                    y: node_pos.y + node_size.h / 2,
                };
            }

            if (port_type=='TO') {
                port.position = {
                    x: node_pos.x - 20,
                    y: node_pos.y + node_size.h / 2,
                };
            }
        }
    }
    data (data) {
        if (arguments.length==0)
            return this._nodes.list;

        let x = this.importNodes(data.nodes);
        let y = this.importEdges(data.edges);

        this.makePorts(this._edges.list);

        this.fittingPorts();

        // fitting Edges
        for (let edge of this._edges.list) {
            edge.from.position = {
                x: edge.from.port.position.x,
                y: edge.from.port.position.y,
            };

            edge.to.position = {
                x: edge.to.port.position.x,
                y: edge.to.port.position.y,
            };
        }

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
        let data = this._nodes.list;

        if (!data)
            return [];

        let lev = 10;
        let out = data.reduce((acc, val) => {
            val._level = lev;
            return acc.concat(this.flattenCore(val, lev));
        }, []);

        // port に level を設定
        for (let port of this._ports.list) {
            port._level = port.node._level;
            out.push(port);
        }

        // edge に level を設定
        for (let edge of this._edges.list) {
            if (edge.from._level > edge.to._level)
                edge._level = edge.from._level - 1;
            else
                edge._level = edge.to._level - 1;

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
        let elements = this.flatten();

        for (let element of elements)
            this.drawElement(place, element);
    }
}
