<page_have-childs>

    <section-header title="Page01"></section-header>

    <section-container title="セクション" data={sections()}>
        <sections-list data={opts.data}>
        </sections-list>
    </section-container>

    <script>
     this.sections = () => {
         let pages = STORE.get('site').pages;
         let page = pages.find((d) => { return d.code=='have-child'; });

         return page.children;
     }
    </script>

</page_have-childs>
