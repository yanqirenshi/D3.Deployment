<page-usage>

    <section-header title="Usage"></section-header>

    <section class="section">
        <div class="container">
            <h1 class="title"></h1>
            <h2 class="subtitle"></h2>

            <div class="contents">

                <div>
                    <page-usage-html></page-usage-html>

                    <div class="flex-root">
                        <page-usage-draw></page-usage-draw>
                        <page-usage-data></page-usage-data>
                    </div>
                </div>

            </div>
        </div>
    </section>

    <style>
     page-usage pre {
         font-size: 12px;
         line-height: 12px;
     }

     page-usage {
         display: block;
         width: 100%;
         height: 100%;
         overflow: auto;
     }

     page-usage .flex-root {
         display: flex;
         margin-top: 22px;
     }
     page-usage .flex-root > *{
         display: block;
         width: 50%;
     }
     page-usage .flex-root > *:first-child{
         margin-right: 11px
     }
     page-usage .flex-root > *:last-child{
         margin-left: 11px
     }
    </style>

</page-usage>
