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
                 type: '',
                 position: { x: 100, y: 100 },
                 size: { w: 200, h: 300 },
                 background: { color: '#ffffff' },
                 border: { width: 1, type: 'solid', color: '#666666' },
                 children: [
                 ]
             },
             {
                 _id: 2,
                 type: '',
                 position: { x: 500, y: 100 },
                 size: { w: 300, h: 300 },
                 background: { color: '#ffffff' },
                 border: { width: 1, type: 'solid', color: '#666666' },
             },
             {
                 _id: 3,
                 type: '',
                 position: { x: 1000, y: 100 },
                 size: { w: 500, h: 600 },
                 background: { color: '#ffffff' },
                 border: { width: 1, type: 'solid', color: '#666666' },
                 children: [
                     {
                         _id: 10,
                         type: '',
                         position: { x: 100, y: 100 },
                         size: { w: 100, h: 200 },
                         background: { color: '#eeeeee' },
                         border: { width: 1, type: 'solid', color: '#666666' },
                     },
                 ]
             }
         ],
         edges: [
             {
                 from_id: 2,
                 to_id: 10,
             },
             {
                 from_id: 1,
                 to_id: 3,
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
