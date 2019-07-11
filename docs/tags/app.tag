<app>

    <menu-bar brand={{label:'RT'}} site={site()} moves={[]}></menu-bar>

    <app-page-area></app-page-area>

    <section-footer></section-footer>

    <script>
     this.site = () => {
         return STORE.state().get('site');
     };
     this.updateMenuBar = () => {
         if (this.tags['menu-bar'])
             this.tags['menu-bar'].update();
     }
    </script>


    <script>
     /* this.on('mount', () => {
      *     ROUTER.rootElement(this.refs['page-area']);
      * }); */

     STORE.subscribe((action)=>{
         if (action.type=='MOVE-PAGE') {
             this.updateMenuBar();
             this.tags['app-page-area'].update({ opts: { route: action.route }});
         }
     });

     window.addEventListener('resize', (event) => {
         this.update();
     });

     if (location.hash=='')
         location.hash=STORE.get('site.active_page');
    </script>

</app>
