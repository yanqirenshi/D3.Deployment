import * as d3 from 'd3';

export default class Edge {
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
                marker: {
                    start: false,
                    end: true,
                },
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

        if (data.stroke) {
            if (data.stroke.color)
                new_data.stroke.color = data.stroke.color;

            if (data.stroke.width)
                new_data.stroke.width = data.stroke.width;

            if (data.stroke.marker)
                new_data.stroke.marker = data.stroke.marker;
        }

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
            },
            {
                "x": data.to.position.x,
                "y": data.to.position.y,
                stroke: data.stroke,
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
            .attr('marker-end', d => {
                if (!d[1].stroke.marker ||  d[1].stroke.marker.end)
                    return "url(#edge-arrow)";

                return null;
            })
            .style('stroke-linecap', 'round')
            .style('fill', (d) => {
                return d[1].stroke.color;
            })
            .style("stroke", (d) => {
                return d[1].stroke.color;
            })
            .style("stroke-width", (d) => {
                return d[1].stroke.width;
            });


        var len = path.node().getTotalLength();
        var margin = 12;
        var t = len - (margin * 2);
        path
            .attr('stroke-dasharray', `0 ${margin} ${t} ${margin}`)
            .attr( 'stroke-dashoffset', 0);
    }
}
