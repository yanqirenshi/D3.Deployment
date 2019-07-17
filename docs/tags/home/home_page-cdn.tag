<home_page-cdn>

    <section class="section">
        <div class="container">
            <h1 class="title">CDN</h1>
            <h2 class="subtitle"></h2>

            <div class="contents">
                <table class="table is-bordered is-striped is-narrow is-hoverable">
                    <thead>
                        <tr>
                            <th>Version</th>
                            <th>Url</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr each={obj in list}>
                            <td>{obj.version}</td>
                            <td>
                                <a href={obj.url}>
                                    {obj.url}
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>

    <script>
     this.list = [
         { version: '0.0.1', url: 'https://yanqirenshi.github.io/D3.Deployment/dist/0.0.1/D3Deployment.js' },
     ];
    </script>

</home_page-cdn>
