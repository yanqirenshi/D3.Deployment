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
                code: "use-tabs",
                menu_label: 'タブ',
                tag: 'page_use-tabs',
            },
            {
                code: "have-child",
                menu_label: '子供',
                tag: 'page_have-childs',
                children: [
                    {
                        code: "child01",
                        tag: 'page_have-childs_page1',
                    },
                    {
                        code: "child02",
                        tag: 'page_have-childs_page2',
                    },
                    {
                        code: "child03",
                        tag: 'page_have-childs_page3',
                    },
                ],
            },
            {
                code: "teams",
                menu_label: '集',
                tag: 'page_teams',
                children: [
                    {
                        code: "members",
                        children: [
                            {
                                code: "user-id",
                                regex: /^\d+$/,
                                // TODO: regex: { contents: /^\d+$/, type: 'integer' },
                                tag: 'page_member',
                            },
                        ],
                    },
                ],
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
