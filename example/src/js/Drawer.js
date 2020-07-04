// https://yanqirenshi.github.io/D3.Sketch/dist/edge/Drawer.js
/**
 * 幾何学計算するための Drawer です。
 *
 * @example
 * let drawer = new DrawerHierarchy();
 */
export class DrawerGeometry {
    ///// ////////////////////////////////////////////////////////////////
    /////   Utilities
    ///// ////////////////////////////////////////////////////////////////
    deg2rad (degree) {
        return degree * ( Math.PI / 180 );
    }
    ///// ////////////////////////////////////////////////////////////////
    /////   Cross Point of two lines
    ///// ////////////////////////////////////////////////////////////////
    isCorss(A, B, C, D) {
        // 二つの線分の交差チェック
        // https://www.hiramine.com/programming/graphics/2d_segmentintersection.html
        let ACx = C.x - A.x;
        let ACy = C.y - A.y;
        let BUNBO = (B.x - A.x) * (D.y - C.y) - (B.y - A.y) * (D.x - C.x);

        if (BUNBO===0)
            return false;

        let r = ((D.y - C.y) * ACx - (D.x - C.x) * ACy) / BUNBO;
        let s = ((B.y - A.y) * ACx - (B.x - A.x) * ACy) / BUNBO;

        return ((0 <= r && r <= 1) && (0 <= s && s <= 1));
    }
    // 2直線の交点を求める。(具)
    getCrossPointCore (line, line_port) {
        let out = { x:0, y:0 };

        let A = line.from;
        let B = line.to;
        let C = line_port.from;
        let D = line_port.to;

        let bunbo = (B.y - A.y) * (D.x - C.x) - (B.x - A.x) * (D.y - C.y);

        if (!this.isCorss(A, B, C, D))
            return null;

        // 二つの線分の交点を算出する。
        // http://mf-atelier.sakura.ne.jp/mf-atelier/modules/tips/program/algorithm/a1.html
        let d1, d2;

        d1 = (C.y * D.x) - (C.x * D.y);
        d2 = (A.y * B.x) - (A.x * B.y);

        out.x = (d1 * (B.x - A.x) - d2 * (D.x - C.x)) / bunbo;
        out.y = (d1 * (B.y - A.y) - d2 * (D.y - C.y)) / bunbo;

        return out;
    }
    // 2直線の交点を求める。
    getCrossPoint (lines, line_port) {
        for (let line of lines) {
            let point = this.getCrossPointCore(line, line_port);

            if (point)
                return point;
        }

        return null;
    }
}

/**
 * Drawer の共通要素とての Core です。
 * 各 Drawer の要素を整えるメッソッドをまとめているクラスです。
 * いろいろと共通なものがあると思うので。
 * また見通しも良くなるかと。
 * 作る必要があるのかはアレですが。。。
 *
 * @example
 * let drawer = new DrawerHierarchy();
 */
export class Drawer {
    ///// ////////////////////////////////////////////////////////////////
    /////   normalize
    ///// ////////////////////////////////////////////////////////////////
    normalizeFont (font_core) {
        let template = { size: 16, color: '#333333' };

        if (!font_core)
            return template;

        return font_core;
    }
    normalizeLabel (label_core) {
        let label = {
            contents: '',
            position: { x: 20, y: 20 },
            font: { size: 16, color: '#333333' },
        };

        if (!label_core)
            return label;

        if (label_core.contents)
            label.contents = label_core.contents;

        let label_tmp = label_core.position ? label_core.position : label.position;
        label.position = this.normalizePosition(label_tmp);

        label.font = this.normalizeFont(label_core.font);

        return label;
    }
    normalizeSize (size_core) {
        let size = { w: 0, h: 0 };

        if (!size_core)
            return size;

        if (size_core.w || size_core.w===0)
            size.w = size_core.w;

        if (size_core.h || size_core.h===0)
            size.h = size_core.h;

        return size;
    }
    normalizePosition (position_core) {
        let position = { x: 0, y: 0 };

        if (!position_core)
            return position;

        if (position_core.x || position_core.x===0)
            position.x = position_core.x;

        if (position_core.y || position_core.y===0)
            position.y = position_core.y;

        return position;
    }
    normalizeBackground (background_core) {
        let background = {
            color: '#ffffff'
        };

        if (!background_core)
            return background;

        if (background_core.color)
            background.color = background_core.color;

        return background;
    }
    normalizeBorder (border_core) {
        let border = {
            width: 1,
            type: 'solid',
            color: '#666666'
        };

        if (!border_core)
            return border;

        if (border_core.width || border_core.width===0)
            border.width = border_core.width;

        if (border_core.color)
            border.color = border_core.color;

        if (border_core.type)
            border.type = border_core.type;

        return border;
    }
    normalizePadding (padding_core) {
        let template = { top: 0, left: 0, bottom: 0, right: 0 };

        if (!padding_core)
            return template;

        return padding_core;
    }
}

/**
 * 階層構造のデータの Drawer です。
 * Data の 位置、サイズ を整えます。
 *
 * @example
 * let drawer = new DrawerHierarchy();
 */
export class DrawerHierarchy extends Drawer {
    ///// ////////////////////////////////////////////////////////////////
    /////   Utilities
    ///// ////////////////////////////////////////////////////////////////
    data2rect (data) {
        return {
            from: {
                x: data.position.x,
                y: data.position.y,
            },
            to: {
                x: data.position.x + data.size.w,
                y: data.position.y + data.size.h,
            }
        };
    }
    ///// ////////////////////////////////////////////////////////////////
    /////   Fitting
    ///// ////////////////////////////////////////////////////////////////
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
        let rect_b = this.data2rect(child);

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
            this.fittingCalSizeCore(rect, this.data2rect(data));
            data.size.w = rect.to.x - rect.from.x;
            data.size.h = rect.to.y - rect.from.y;
        }
    }
}
