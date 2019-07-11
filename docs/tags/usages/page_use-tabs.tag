<page-usage>

    <section-header title="Usage"></section-header>

    <div style="padding-left:55px;">
        <page-tabs core={page_tabs} callback={clickTab}></page-tabs>
    </div>

    <div>
        <page-usage_tab-readme class="hide"></page-usage_tab-readme>
        <page-usage_tab-tab1   class="hide"></page-usage_tab-tab1>
        <page-usage_tab-tab2   class="hide"></page-usage_tab-tab2>
        <page-usage_tab-tab3   class="hide"></page-usage_tab-tab3>
        <page-usage_tab-help   class="hide"></page-usage_tab-help>
    </div>

    <script>
     this.page_tabs = new PageTabs([
         {code: 'readme', label: 'README', tag: 'page-usage_tab-readme' },
         {code: 'tab1',   label: 'TAB1',   tag: 'page-usage_tab-tab1' },
         {code: 'tab2',   label: 'TAB2',   tag: 'page-usage_tab-tab2' },
         {code: 'tab3',   label: 'TAB3',   tag: 'page-usage_tab-tab3' },
         {code: 'help',   label: 'HELP',   tag: 'page-usage_tab-help' },
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

</page-usage>
