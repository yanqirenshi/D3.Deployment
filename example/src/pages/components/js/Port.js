export default class Port {
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
