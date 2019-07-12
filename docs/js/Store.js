class Store extends Vanilla_Redux_Store {
    constructor(reducer) {
        super(reducer, Immutable.Map({}));
    }
    pages() {
        return [
            {
                code: "home",
                menu_label: '家',
                tag: 'home_page',
            },
            {
                code: "examples",
                menu_label: '試',
                tag: 'page_example',
                children: [
                    {
                        code: "elements",
                        children: [
                            {
                                code: "element-id",
                                regex: /^\d+$/,
                                // TODO: regex: { contents: /^\d+$/, type: 'integer' },
                                tag: 'page_element',
                            },
                        ],
                    },
                ],
            },
            {
                code: "usage",
                menu_label: '使',
                tag: 'page-usage',
            },
            {
                code: "classes",
                menu_label: '構',
                tag: 'page-classes',
            },
        ];
    }
    init () {
        let data = {
            site: {
                active_page: 'home',
                home_page: 'home',
                pages: this.pages(),
            }
        };

        this._contents = Immutable.Map(data);
        return this;
    }
}
