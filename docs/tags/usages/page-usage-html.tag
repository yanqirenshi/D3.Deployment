<page-usage-html>

    <div>
        <pre>{source()}</pre>
    </div>

    <script>
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
    </script>

</page-usage-html>
