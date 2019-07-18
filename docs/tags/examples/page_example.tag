<page_example>

    <section class="section">
        <div class="container">

            <div class="svg-container">
                <svg id="scketchbook"></svg>
            </div>

        </div>
    </section>

    <script>
     this.core = new D3Deployment().data({
         nodes: [
             {
                 _id: 1,
                 type: 'NODE',
                 label: {
                     contents: 'XXXXXXXX',
                     position: { x: 20, y: 30 },
                     font: { size: 24, color: '#d7003a' },
                 },
                 position: { x: 100 - 900, y: 100 - 500},
                 size: { w: 300, h: 300 },
                 background: { color: '#ffffff' },
                 border: { width: 1, type: 'solid', color: '#666666' },
                 link: { url: "https://twitter.com/home" },
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
                 link: { url: (d) => { return 'https://www.google.com'; }},
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
     });
    </script>

    <script>
     this.sketcher = null;
     this.on('mount', () => {
         try {

             this.sketcher = new ExampleSketcher('page_example svg#scketchbook');
             this.sketcher.drawExample(this.core);

         } catch (e) {
             console.log(e);
         }
     });
    </script>

    <style>
     page_example .svg-container {
         width:100%;
         height:555px;
         padding:22px;
         border: 1px solid #fafafa;
         background: #fcfcfc;
     }
    </style>

</page_example>
