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
                    x: Math.floor(size.w / 2) * -1,
                    y: Math.floor(size.h / 2) * -1,
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
    drawExample (core) {
        let d3Deployment = new D3Deployment();

        core.init(this._d3svg._svg);

        let place = this.getBase('forground');

        core.draw(place);
    };
}
