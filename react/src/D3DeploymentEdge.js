import * as d3 from 'd3';

export default class D3DeploymentEdge {
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

            stroke: {
                color: '#333',
                width: 1.5,
            },

            _id:       null,
            _core:     null,
            _class:    'EDGE',
        };
    }
    normalize (data) {
        let new_data = this.dataTemplate();

        new_data._core = data;

        if (data.id)
            new_data._id = data.id;

        if (data.from.id)
            new_data.from.id = data.from.id;

        if (data.to.id)
            new_data.to.id = data.to.id;

        if (data.stroke)
            new_data.stroke = data.stroke;

        data._edge = new_data;

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
                stroke: data._core.stroke,
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
            .style('fill', (d) => {
                return d[0].stroke.color;
            })
            .style("stroke", (d) => {
                return d[0].stroke.color;
            })
            .style("stroke-width", (d) => {
                return d[0].stroke.width;
            });


        var len = path.node().getTotalLength();
        var t = len - (6 + 6 + 10);
        path
            .attr('stroke-dasharray', "0 " + 6 + " " + t + " " + 6)
            .attr( 'stroke-dashoffset', 0);
    }
}
