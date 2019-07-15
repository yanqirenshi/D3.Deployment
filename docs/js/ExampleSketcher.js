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

            this.painter = {
                NODE: new D3DeploymentNode(),
                EDGE: new D3DeploymentEdge(),
                PORT: new D3DeploymentPort(),
            };
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
    drawExample (core) {
        // TODO: ちょっと強引かなぁ。
        new D3DeploymentNode().addFilterShadow(this._d3svg._svg);

        let place = this.getBase('forground');

        let elements = core.flatten();
        for (let element of elements)
            this.draw(place, element);
    };
    draw (place, element) {
        let painter = this.painter[element._class];

        if (!painter)
            return;

        painter.draw(place, element);
    }
}
