riot.tag2('app-page-area', '', '', '', function(opts) {
     this.on('update', (action) => {
         if (this.opts.route)
             ROUTER.draw(this, STORE.get('site.pages'), this.opts.route);
     });
});

riot.tag2('app', '<menu-bar brand="{{label:\'RT\'}}" site="{site()}" moves="{[]}"></menu-bar> <app-page-area></app-page-area> <section-footer></section-footer>', '', '', function(opts) {
     this.site = () => {
         return STORE.state().get('site');
     };
     this.updateMenuBar = () => {
         if (this.tags['menu-bar'])
             this.tags['menu-bar'].update();
     }

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
});

riot.tag2('page-classes', '<section-header title="Usage"></section-header> <div style="padding-left:55px;"> <page-tabs core="{page_tabs}" callback="{clickTab}"></page-tabs> </div> <div> <page-classes_tab-readme class="hide"></page-classes_tab-readme> <page-classes_tab-class4 class="hide"></page-classes_tab-class4> <page-classes_tab-class1 class="hide"></page-classes_tab-class1> <page-classes_tab-class2 class="hide"></page-classes_tab-class2> <page-classes_tab-class3 class="hide"></page-classes_tab-class3> </div>', '', '', function(opts) {
     this.page_tabs = new PageTabs([
         {code: 'readme', label: 'README',                  tag: 'page-classes_tab-readme' },
         {code: 'class1', label: 'Class: D3Deployment',     tag: 'page-classes_tab-class4' },
         {code: 'class2', label: 'Class: D3DeploymentNode', tag: 'page-classes_tab-class1' },
         {code: 'class3', label: 'Class: D3DeploymentPort', tag: 'page-classes_tab-class2' },
         {code: 'class4', label: 'Class: D3DeploymentEdge', tag: 'page-classes_tab-class3' },
     ]);

     this.on('mount', () => {
         this.page_tabs.switchTab(this.tags)
         this.update();
     });

     this.clickTab = (e, action, data) => {
         if (this.page_tabs.switchTab(this.tags, data.code))
             this.update();
     };
});

riot.tag2('page-classes_tab-class1', '<section class="section"> <div class="container"> <div class="contents"> </div> </div> </section>', '', '', function(opts) {
});

riot.tag2('page-classes_tab-class2', '<section class="section"> <div class="container"> <div class="contents"> </div> </div> </section>', '', '', function(opts) {
});

riot.tag2('page-classes_tab-class3', '<section class="section"> <div class="container"> <div class="contents"> </div> </div> </section>', '', '', function(opts) {
});

riot.tag2('page-classes_tab-class4', '<section class="section"> <div class="container"> <div class="contents"> </div> </div> </section>', '', '', function(opts) {
});

riot.tag2('page-classes_tab-help', '<section class="section"> <div class="container"> <h1 class="title">HELP</h1> <h2 class="subtitle"> </h2> <div class="contents"> </div> </div> </section>', '', '', function(opts) {
});

riot.tag2('page-classes_tab-readme', '<section class="section"> <div class="container"> <h1 class="title">README</h1> <h2 class="subtitle"> </h2> <div class="contents"> </div> </div> </section>', '', '', function(opts) {
});

riot.tag2('markdown-preview', '', 'markdown-preview h1 { font-weight: bold; font-size: 20px; margin-top: 11px; margin-bottom: 6px; } markdown-preview h2 { font-weight: bold; font-size: 18px; margin-top: 8px; margin-bottom: 4px; } markdown-preview h3 { font-weight: bold; font-size: 16px; margin-top: 6px; margin-bottom: 3px; } markdown-preview h4 { font-weight: bold; font-size: 14px; margin-top: 6px; margin-bottom: 3px; } markdown-preview h5 { font-weight: bold; font-size: 12px; margin-bottom: 4px; } markdown-preview * { font-size: 12px; } markdown-preview table { border-collapse: collapse; } markdown-preview td { border: solid 0.6px #888888; padding: 2px 5px; } markdown-preview th { border: solid 0.6px #888888; padding: 2px 5px; background: #eeeeee; }', '', function(opts) {
     this.on('update', () => {
         this.root.innerHTML = this.opts.data;
     });

    this.root.innerHTML = opts.data

});

riot.tag2('menu-bar', '<aside class="menu"> <p ref="brand" class="menu-label"> {opts.brand.label} </p> <ul class="menu-list"> <li each="{opts.site.pages}"> <a class="{opts.site.active_page==code ? \'is-active\' : \'\'}" href="{\'#\' + code}"> {menu_label} </a> </li> </ul> </aside> <div class="move-page-menu hide" ref="move-panel"> <p each="{moves()}"> <a href="{href}">{label}</a> </p> </div>', 'menu-bar .move-page-menu { z-index: 666665; background: #ffffff; position: fixed; left: 55px; top: 0px; min-width: 111px; height: 100vh; box-shadow: 2px 0px 8px 0px #e0e0e0; padding: 22px 55px 22px 22px; } menu-bar .move-page-menu.hide { display: none; } menu-bar .move-page-menu > p { margin-bottom: 11px; } menu-bar > .menu { z-index: 666666; height: 100vh; width: 55px; padding: 11px 0px 11px 11px; position: fixed; left: 0px; top: 0px; background: #e198b4; } menu-bar .menu-label, menu-bar .menu-list a { padding: 0; width: 33px; height: 33px; text-align: center; margin-top: 8px; border-radius: 3px; background: none; color: #ffffff; font-weight: bold; padding-top: 7px; font-size: 14px; } menu-bar .menu-label,[data-is="menu-bar"] .menu-label{ background: #ffffff; color: #e198b4; } menu-bar .menu-label.open,[data-is="menu-bar"] .menu-label.open{ background: #ffffff; color: #e198b4; width: 44px; border-radius: 3px 0px 0px 3px; text-shadow: 0px 0px 1px #eee; padding-right: 11px; } menu-bar .menu-list a.is-active { width: 44px; padding-right: 11px; border-radius: 3px 0px 0px 3px; background: #ffffff; color: #333333; }', '', function(opts) {
     this.moves = () => {
         let moves = [
             { code: 'link-a', href: '', label: 'Link A' },
             { code: 'link-b', href: '', label: 'Link B' },
             { code: 'link-c', href: '', label: 'Link C' },
         ]
         return moves.filter((d)=>{
             return d.code != this.opts.current;
         });
     };

     this.brandStatus = (status) => {
         let brand = this.refs['brand'];
         let classes = brand.getAttribute('class').trim().split(' ');

         if (status=='open') {
             if (classes.find((d)=>{ return d!='open'; }))
                 classes.push('open')
         } else {
             if (classes.find((d)=>{ return d=='open'; }))
                 classes = classes.filter((d)=>{ return d!='open'; });
         }
         brand.setAttribute('class', classes.join(' '));
     }

     this.clickBrand = () => {
         let panel = this.refs['move-panel'];
         let classes = panel.getAttribute('class').trim().split(' ');

         if (classes.find((d)=>{ return d=='hide'; })) {
             classes = classes.filter((d)=>{ return d!='hide'; });
             this.brandStatus('open');
         } else {
             classes.push('hide');
             this.brandStatus('close');
         }
         panel.setAttribute('class', classes.join(' '));
     };
});

riot.tag2('modal-description-editor', '<div class="modal {isActive()}"> <div class="modal-background"></div> <div class="modal-content" style="width: 88vw;"> <div class="card"> <div class="card-content" style="height: 88vh;"> <div style="display:flex; height: 100%; width: 100%;flex-direction: column;"> <div style="margin-bottom:11px;"> <h1 class="title is-4">{title()} の Description の変更</h1> </div> <div style="display:flex; flex-grow: 1"> <div style="flex-grow: 1;margin-right: 8px;"> <div class="element-container"> <h1 class="title is-5">Markdown</h1> <textarea class="input" ref="description" onkeyup="{inputDescription}">{description()}</textarea> </div> </div> <div style=";flex-grow: 1;margin-left: 8px;"> <div class="element-container"> <h1 class="title is-5">Preview</h1> <div class="preview" style="padding: 0px 11px 11px 11px;"> <markdown-preview data="{marked(markdown)}"></markdown-preview> </div> </div> </div> </div> <div style="margin-top:11px;"> <button class="button is-warning" onclick="{clickCancel}">Cancel</button> <button class="button is-danger" style="float:right;" onclick="{clickSave}">Save</button> </div> </div> </div> </div> </div> </div>', 'modal-description-editor .element-container { display:flex; height: 100%; width: 100%; flex-direction: column; } modal-description-editor .element-container .title{ margin-bottom:6px; } modal-description-editor .input { border: 1px solid #eeeeee; padding: 11px; box-shadow: none; height: 100%; width: 100%; } modal-description-editor .preview { border: 1px solid #eeeeee; flex-grow:1; }', '', function(opts) {
     this.markdown = null;

     this.clickCancel = () => {
         this.opts.callback('close-modal-description-editor');
     };
     this.clickSave = () => {
         this.opts.callback('save-column-instance-description', {
             object: this.opts.data,
             value: this.refs['description'].value,
         });
     };
     this.inputDescription = () => {
         this.markdown = this.refs['description'].value;

         this.tags['markdown-preview'].update();
     };

     this.description = () => {
         if (!this.markdown) {
             let obj = this.opts.data;

             this.markdown = !obj ? '' : obj.description;
         }

         return this.markdown;
     };
     this.title = () => {
         if (!this.opts.data)
             return '';

         let obj = this.opts.data;
         return obj._class + ':' + obj.name;
     };
     this.isActive = () => {
         return this.opts.data ? 'is-active' : '';
     };
});

riot.tag2('page-tabs', '<div class="tabs is-boxed"> <ul> <li each="{opts.core.tabs}" class="{opts.core.active_tab==code ? \'is-active\' : \'\'}"> <a code="{code}" onclick="{clickTab}">{label}</a> </li> </ul> </div>', 'page-tabs li:first-child { margin-left: 55px; }', '', function(opts) {
     this.clickTab = (e) => {
         let code = e.target.getAttribute('code');
         this.opts.callback(e, 'CLICK-TAB', { code: code });
     };
});

riot.tag2('section-breadcrumb', '<section-container data="{path()}"> <nav class="breadcrumb" aria-label="breadcrumbs"> <ul> <li each="{opts.data}"> <a class="{active ? \'is-active\' : \'\'}" href="{href}" aria-current="page">{label}</a> </li> </ul> </nav> </section-container>', 'section-breadcrumb section-container > .section,[data-is="section-breadcrumb"] section-container > .section{ padding-top: 3px; }', '', function(opts) {
     this.path = () => {
         let hash = location.hash;
         let path = hash.split('/');

         if (path[0] && path[0].substr(0,1)=='#')
             path[0] = path[0].substr(1);

         let out = [];
         let len = path.length;
         let href = null;
         for (var i in path) {
             href = href ? href + '/' + path[i] : '#' + path[i];

             if (i==len-1)
                 out.push({
                     label: path[i],
                     href: hash,
                     active: true
                 });

             else
                 out.push({
                     label: path[i],
                     href: href,
                     active: false
                 });
         }
         return out;
     }
});

riot.tag2('section-container', '<section class="section"> <div class="container"> <h1 class="title is-{opts.no ? opts.no : 3}"> {opts.title} </h1> <h2 class="subtitle">{opts.subtitle}</h2> <yield></yield> </div> </section>', '', '', function(opts) {
});

riot.tag2('section-contents', '<section class="section"> <div class="container"> <h1 class="title is-{opts.no ? opts.no : 3}"> {opts.title} </h1> <h2 class="subtitle">{opts.subtitle}</h2> <div class="contents"> <yield></yield> </div> </div> </section>', 'section-contents > section.section { padding: 0.0rem 1.5rem 2.0rem 1.5rem; }', '', function(opts) {
});

riot.tag2('section-footer', '<footer class="footer"> <div class="container"> <div class="content has-text-centered"> <p> </p> </div> </div> </footer>', 'section-footer > .footer { background: #ffffff; padding-top: 13px; padding-bottom: 13px; }', '', function(opts) {
});

riot.tag2('section-header-with-breadcrumb', '<section-header title="{opts.title}"></section-header> <section-breadcrumb></section-breadcrumb>', 'section-header-with-breadcrumb section-header > .section,[data-is="section-header-with-breadcrumb"] section-header > .section{ margin-bottom: 3px; }', '', function(opts) {
});

riot.tag2('section-header', '<section class="section"> <div class="container"> <h1 class="title is-{opts.no ? opts.no : 3}"> {opts.title} </h1> <h2 class="subtitle">{opts.subtitle}</h2> <yield></yield> </div> </section>', 'section-header > .section { background: #ffffff; }', '', function(opts) {
});

riot.tag2('section-list', '<table class="table is-bordered is-striped is-narrow is-hoverable"> <thead> <tr> <th>機能</th> <th>概要</th> </tr> </thead> <tbody> <tr each="{data()}"> <td><a href="{hash}">{title}</a></td> <td>{description}</td> </tr> </tbody> </table>', '', '', function(opts) {
     this.data = () => {
         return opts.data.filter((d) => {
             if (d.code=='root') return false;

             let len = d.code.length;
             let suffix = d.code.substr(len-5);
             if (suffix=='_root' || suffix=='-root')
                 return false;

             return true;
         });
     };
});

riot.tag2('sections-list', '<table class="table"> <tbody> <tr each="{opts.data}"> <td><a href="{hash}">{code}</a></td> <td>{tag}</td> </tr> </tbody> </table>', '', '', function(opts) {
});

riot.tag2('page_element', '<section-header title="Member"></section-header>', '', '', function(opts) {
     dump(this.opts._route)
});

riot.tag2('page_example', '<section class="section"> <div class="container"> <div class="svg-container"> <svg id="scketchbook"></svg> </div> </div> </section>', 'page_example .svg-container { width:100%; height:555px; padding:22px; border: 1px solid #fafafa; background: #fcfcfc; }', '', function(opts) {
     this.core = new D3Deployment().data({
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
     });

     this.sketcher = null;
     this.on('mount', () => {
         try {

             this.sketcher = new ExampleSketcher('page_example svg#scketchbook');
             this.sketcher.drawExample(this.core);

         } catch (e) {
             console.log(e);
         }
     });
});

riot.tag2('home_page-cdn', '<section class="section"> <div class="container"> <h1 class="title">CDN</h1> <h2 class="subtitle"></h2> <div class="contents"> <table class="table is-bordered is-striped is-narrow is-hoverable"> <thead> <tr> <th>Version</th> <th>Url</th> </tr> </thead> <tbody> <tr each="{obj in list}"> <td>{obj.version}</td> <td> <a href="{obj.url}"> {obj.url} </a> </td> </tr> </tbody> </table> </div> </div> </section>', '', '', function(opts) {
     this.list = [
         { version: '0.0.1', url: 'https://yanqirenshi.github.io/D3.Deployment/dist/0.0.1/D3Deployment.js' },
     ];
});

riot.tag2('home_page', '<section-header title="D3.Deployment"></section-header> <home_page-cdn></home_page-cdn>', '', '', function(opts) {
});

riot.tag2('page-usage-data', '<div> <pre>{source()}</pre> </div>', '', '', function(opts) {
     this.source = () => {
         return list.join('\n')
     }
     let list = [
         "function graphData () {",
         "    return {",
         "         nodes: [",
         "             {",
         "                 _id: 1,",
         "                 type: 'NODE',",
         "                 label: {",
         "                     contents: 'XXXXXXXX',",
         "                     position: { x: 20, y: 20 },",
         "                 },",
         "                 position: { x: 100 - 900, y: 100 - 500},",
         "                 size: { w: 300, h: 300 },",
         "                 background: { color: '#ffffff' },",
         "                 border: { width: 1, type: 'solid', color: '#666666' },",
         "                 children: [",
         "                 ]",
         "             },",
         "             {",
         "                 _id: 2,",
         "                 label: {",
         "                     contents: 'YYYYYYYY',",
         "                     position: { x: 20, y: 20 },",
         "                 },",
         "                 type: 'NODE',",
         "                 position: { x: 500 - 900, y: 100 - 500 },",
         "                 size: { w: 300, h: 300 },",
         "                 background: { color: '#ffffff' },",
         "                 border: { width: 1, type: 'solid', color: '#666666' },",
         "             },",
         "             {",
         "                 _id: 3,",
         "                 label: {",
         "                     contents: 'ZZZZZZZZ',",
         "                     position: { x: 20, y: 20 },",
         "                 },",
         "                 type: 'NODE',",
         "                 position: { x: 1000 - 900, y: 100 - 500 },",
         "                 size: { w: 500, h: 600 },",
         "                 background: { color: '#ffffff' },",
         "                 border: { width: 1, type: 'solid', color: '#666666' },",
         "                 children: [",
         "                     {",
         "                         _id: 10,",
         "                         label: {",
         "                             contents: 'aaaaaaaa',",
         "                             position: { x: 20, y: 20 },",
         "                         },",
         "                         type: 'COMPONENT',",
         "                         position: { x: 100, y: 100 },",
         "                         size: { w: 300, h: 200 },",
         "                         background: { color: '#ffffff' },",
         "                         border: { width: 1, type: 'solid', color: '#666666' },",
         "                     },",
         "                 ]",
         "             }",
         "         ],",
         "         edges: [",
         "             {",
         "                 from: {",
         "                     _id: 2,",
         "                     position: 90,  90,  90,",
         "                 },",
         "                 to: {",
         "                     _id: 10,",
         "                     position: 90,",
         "                 }",
         "             },",
         "             {",
         "                 from: {",
         "                     _id: 1,",
         "                     position: 90,  90,  90,",
         "                 },",
         "                 to: {",
         "                     _id: 3,",
         "                     position: 90,",
         "                 },",
         "             },",
         "         ]",
         "    };",
         "}",
     ]
});

riot.tag2('page-usage-draw', '<div> <pre>{source()}</pre> </div>', '', '', function(opts) {
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
});

riot.tag2('page-usage-html', '<div> <pre>{source()}</pre> </div>', '', '', function(opts) {
     this.source = () => {
         return list
             .join('\n')
             .replace(/&lt;/g, '<')
             .replace(/&gt;/g, '>')
     }
     let list = [
         '&lt;!DOCTYPE html&gt;',
         '&lt;html&gt;',
         '    &lt;head&gt;',
         '        &lt;meta charset="utf-8"&gt;',
         '        &lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;',
         '        &lt;title&gt;D3.Deployment&lt;/title&gt;',
         '        &lt;link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css"&gt;',
         '        &lt;script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"&gt;&lt;/script&gt;',
         '',
         '        &lt;script src="./d3.js"&gt;&lt;/script&gt;',
         '',
         '        &lt;script src="D3Deployment.js"&gt;&lt;/script&gt;',
         '    &lt;/head&gt;',
         '',
         '    &lt;body&gt;',
         '        &lt;section class="section"&gt;',
         '            &lt;div class="container"&gt;',
         '                &lt;h1 class="title"&gt;&lt;/h1&gt;',
         '                &lt;p class="subtitle"&gt;&lt;/p&gt;',
         '',
         '                &lt;div style="width: 555px;height: 333px;border: 1px solid #EEEEEE;margin-left: auto;margin-right: auto;"&gt;',
         '                    &lt;svg width="555px" height="333px" class="graph"&gt;&lt;/svg&gt;',
         '                &lt;/div&gt;',
         '            &lt;/div&gt;',
         '        &lt;/section&gt;',
         '',
         '        &lt;script src="index.js"&gt;&lt;/script&gt;',
         '    &lt;/body&gt;',
         '&lt;/html&gt;',
     ]
});

riot.tag2('page-usage', '<section-header title="Usage"></section-header> <section class="section"> <div class="container"> <h1 class="title"></h1> <h2 class="subtitle"></h2> <div class="contents"> <div> <page-usage-html></page-usage-html> <div class="flex-root"> <page-usage-draw></page-usage-draw> <page-usage-data></page-usage-data> </div> </div> </div> </div> </section>', 'page-usage { display: block; width: 100%; height: 100%; overflow: auto; margin-left: 55px; } page-usage pre { font-size: 12px; line-height: 12px; } page-usage .flex-root { display: flex; margin-top: 22px; } page-usage .flex-root > *{ display: block; width: 50%; } page-usage .flex-root > *:first-child{ margin-right: 11px } page-usage .flex-root > *:last-child{ margin-left: 11px }', '', function(opts) {
});
