class Sizing {
    getSize (element) {
        if (element==window)
            return {
                w: window.innerWidth,
                h: window.innerHeight,
            };

        return {
            w: element.parentNode.clientWidth - 22 * 2,
            h: element.parentNode.clientHeight - 22 * 2,
        };
    }
};

class Camera {
    makeCamera (size) {
        return {
            look: {
                at: {
                    x: Math.floor(size.w / 2),
                    y: Math.floor(size.h / 2),
                },
            },
            scale: 2.0,
        };
    }
}

class ExampleSketcher extends DefaultSketcher {
    constructor (selector) {
        try {
            let element = document.querySelector(selector);
            let size   = new Sizing().getSize(element);
            let camera = new Camera().makeCamera(size);

            super({
                element: {
                    selector: selector,
                },
                w: size.w,
                h: size.h,
                x: camera.look.at.x,
                y: camera.look.at.y,
                scale: camera.scale,
            });
        } catch (e) {
            console.warn(e);
        }
    }
    exampleData () {
        return {
            x: 0,
            y: 0,
            w: 222,
            h: 333,
            r: 8,
            stroke: {
                color: '#333333',
                width: 1,
            },
            background: {
                color: '#fff'
            }
        };
    }
    drawExample (data) {
        let place = this.getBase('forground');

        this.data(new D3Deployment().flatten(data))
            .sizing()
            .positioning()
            .draw(place);
    };
    draw (place) {
        let data = this._data;

        place.selectAll('rect.sample')
            .data(data, (d) => { return d._id; })
            .enter()
            .append('rect')
            .attr('class', 'sample')
            .attr('x', (d) => { return d.position.x;})
            .attr('y', (d) => { return d.position.y;})
            .attr('width', (d) => { return d.size.w;})
            .attr('height', (d) => { return d.size.h;})
            .attr('rx', (d) => { return d.border && d.border.r || 0;})
            .attr('ry', (d) => { return d.border && d.border.r || 0;})
            .attr('fill', (d) => {
                return d.background.color;
            })
            .attr('stroke', (d) => { return d.border.color; })
            .attr('stroke-width', (d) => { return d.border.width; });
    }
}
