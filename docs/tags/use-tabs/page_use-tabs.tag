<page_use-tabs>

    <section-header title="Page02"></section-header>

    <div style="padding-left:55px;">
        <page-tabs core={page_tabs} callback={clickTab}></page-tabs>
    </div>

    <div>
        <page_use-tabs_tab_readme class="hide"></page_use-tabs_tab_readme>
        <page_use-tabs_tab_tab1   class="hide"></page_use-tabs_tab_tab1>
        <page_use-tabs_tab_tab2   class="hide"></page_use-tabs_tab_tab2>
        <page_use-tabs_tab_tab3   class="hide"></page_use-tabs_tab_tab3>
        <page_use-tabs_tab_help   class="hide"></page_use-tabs_tab_help>
    </div>

    <script>
     this.page_tabs = new PageTabs([
         {code: 'readme', label: 'README', tag: 'page_use-tabs_tab_readme' },
         {code: 'tab1',   label: 'TAB1',   tag: 'page_use-tabs_tab_tab1' },
         {code: 'tab2',   label: 'TAB2',   tag: 'page_use-tabs_tab_tab2' },
         {code: 'tab3',   label: 'TAB3',   tag: 'page_use-tabs_tab_tab3' },
         {code: 'help',   label: 'HELP',   tag: 'page_use-tabs_tab_help' },
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

</page_use-tabs>
