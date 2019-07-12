<page-classes>

    <section-header title="Usage"></section-header>

    <div style="padding-left:55px;">
        <page-tabs core={page_tabs} callback={clickTab}></page-tabs>
    </div>

    <div>
        <page-classes_tab-readme class="hide"></page-classes_tab-readme>
        <page-classes_tab-class4   class="hide"></page-classes_tab-class4>
        <page-classes_tab-class1   class="hide"></page-classes_tab-class1>
        <page-classes_tab-class2   class="hide"></page-classes_tab-class2>
        <page-classes_tab-class3   class="hide"></page-classes_tab-class3>
    </div>

    <script>
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
    </script>

</page-classes>
