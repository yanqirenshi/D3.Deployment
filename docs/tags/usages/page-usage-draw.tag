<page-usage-draw>

    <div>
        <pre>{source()}</pre>
    </div>

    <script>
     this.source = () => {
         return list.join('\n')
     }
     let list = [
         "function refreshViewBox (svg, scale) {",
         "    var x = -400,",
         "        y = -200;",
         "",
         "    var orgW = 555,",
         "        orgH = 333;",
         "",
         "    var w = Math.floor(orgW * scale),",
         "        h = Math.floor(orgH * scale);",
         "",
         "    var viewbox = ''",
         "        + (x + Math.floor((orgW - w)/2)) + ' '",
         "        + (y + Math.floor((orgH - h)/2)) + ' '",
         "        + w + ' '",
         "        + h;",
         "",
         "    svg.attr('viewBox', viewbox);",
         "}",
         "",
         "function draw () {",
         "    let svg = d3.select('svg.graph');",
         "",
         "    new D3Deployment()",
         "        .init(svg)",
         "        .data(graphData())",
         "        .draw(svg);",
         "",
         "    refreshViewBox(svg, 3.0);",
         "}",
         "",
         "draw();",
         "",
     ]
    </script>

</page-usage-draw>
