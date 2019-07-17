function getSize (element) {
    let parent = element.parentNode; 
    return {
        w: parent.clientWidth  - 22 * 2,
        h: parent.clientHeight - 22 * 2,
    };
}

function makeCamera (size) {
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

function graphData () {
    return {
         nodes: [
             {
                 _id: 1,
                 type: 'NODE',
                 label: {
                     contents: 'XXXXXXXX',
                     position: { x: 20, y: 20 },
                 },
                 position: { x: 100 - 900, y: 100 - 500},
                 size: { w: 300, h: 300 },
                 background: { color: '#ffffff' },
                 border: { width: 1, type: 'solid', color: '#666666' },
                 children: [
                 ]
             },
             {
                 _id: 2,
                 label: {
                     contents: 'YYYYYYYY',
                     position: { x: 20, y: 20 },
                 },
                 type: 'NODE',
                 position: { x: 500 - 900, y: 100 - 500 },
                 size: { w: 300, h: 300 },
                 background: { color: '#ffffff' },
                 border: { width: 1, type: 'solid', color: '#666666' },
             },
             {
                 _id: 3,
                 label: {
                     contents: 'ZZZZZZZZ',
                     position: { x: 20, y: 20 },
                 },
                 type: 'NODE',
                 position: { x: 1000 - 900, y: 100 - 500 },
                 size: { w: 500, h: 600 },
                 background: { color: '#ffffff' },
                 border: { width: 1, type: 'solid', color: '#666666' },
                 children: [
                     {
                         _id: 10,
                         label: {
                             contents: 'aaaaaaaa',
                             position: { x: 20, y: 20 },
                         },
                         type: 'COMPONENT',
                         position: { x: 100, y: 100 },
                         size: { w: 300, h: 200 },
                         background: { color: '#ffffff' },
                         border: { width: 1, type: 'solid', color: '#666666' },
                     },
                 ]
             }
         ],
         edges: [
             {
                 from: {
                     _id: 2,
                     position: 90 + 90 + 90,
                 },
                 to: {
                     _id: 10,
                     position: 90,
                 }
             },
             {
                 from: {
                     _id: 1,
                     position: 90 + 90 + 90,
                 },
                 to: {
                     _id: 3,
                     position: 90,
                 },
             },
         ]
    };
}

function refreshViewBox (svg, scale) {
    var x = -400,
        y = -200;

    var orgW = 555,
        orgH = 333;

    var w = Math.floor(orgW * scale),
        h = Math.floor(orgH * scale);

    var viewbox = ''
        + (x + Math.floor((orgW - w)/2)) + ' '
        + (y + Math.floor((orgH - h)/2)) + ' '
        + w + ' '
        + h;

    svg.attr('viewBox', viewbox);
}

function draw () {
    let svg = d3.select('svg.graph');

    new D3Deployment()
        .init(svg)
        .data(graphData())
        .draw(svg);

    refreshViewBox(svg, 3.0);
}

draw();
