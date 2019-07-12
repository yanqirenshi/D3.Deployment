class D3DeploymentNode {
    ///// ////////////////////////////////////////////////////////////////
    /////   Adjust
    ///// ////////////////////////////////////////////////////////////////
    dataTemplate () {
        return {
            _id: null,
            type: '',
            position: null,   // See Mthod: adjustPosition
            size:     null,   // See Metho: adjustSize
            background: null, // See Metho: adjustBackground,
            border: null,
            children: [],
            _core: null,
        };
    };
    adjustBase (data) {
        let core = data._core;

        if (data._core._id || data._core._id==0)
            data._id = data._core._id;

        if (data.type)
            data.type = data._core.type;
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
}

class D3DeploymentPort {
    dataTemplate () {
        return {
            node:  null,
            edge:  null,
            _id:   null,
            _core: null,
        };
    }
    adjust (data, id) {
    }
}

class D3DeploymentEdge {
    dataTemplate () {
        return {
            from: {
                id: null,
                port: null,
                node: null,
            },

            to: {
                id: null,
                port: null,
                node: null,
            },

            _id:       null,
            _core:     null,
        };
    }
    adjust (data, id) {
        let new_data = this.dataTemplate();

        if (data._id)
            new_data._id = data._id;

        if (data.from_id)
            new_data.from.id = data.from_id;

        if (data.to_id)
            new_data.to.id = data.to_id;

        return data;
    }
}

class D3Deployment {
    constructor () {
        this._nodes = { list: [], ht: {} };
        this._edges = { list: [], ht: {} };
        this._ports = { list: [], ht: {} };
    }
    data2pool (trees, pool) {
        for (let tree of trees) {
            let id = tree._id;

            pool.ht[id] = tree;
            pool.list.push(tree);

            if (tree.children)
                this.data2pool(tree.children, pool);
        }
    }
    importNodes (nodes) {
        let node = new D3DeploymentNode();

        let tmp = (nodes || []).map((d) => {
            return node.adjust(d);
        });

        for (let data of tmp)
            node.fitting(data);

        this.data2pool(tmp, this._nodes);
    }
    importEdges (edges) {
        let edge = new D3DeploymentEdge();

        let id = 1;
        let tmp = (edges || []).map((d) => {
            return edge.adjust(d, id++);
        });

        this.data2pool(tmp, this._edges);
    }
    makePorts (edges) {
        // node を from, to へセット
        // port を作成しながら from, to へセット
    }
    data (data) {
        if (arguments.length==0)
            return this._nodes.list;

        this.importNodes(data.nodes);
        this.importEdges(data.edges);

        this.makePorts(this._edges.list);

        return this;
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
    flatten (data) {
        if (!data)
            return [];

        let lev = 10;
        let out = data.reduce((acc, val) => {
            val._level = lev;
            return acc.concat(this.flattenCore(val, lev));
        }, []);

        return out.sort((a, b) => {
            return (a.level < b.lebel) ? -1 : 1;
        });
    }
    ///// ////////////////////////////////////////////////////////////////
    /////   Draw
    ///// ////////////////////////////////////////////////////////////////
}
