/* ******** */
/*  Request */
/* ******** */
var Uri = new Vanilla_URI();
var Request = new Vanilla_Ajax('http', 'localhost', '');
var API = new Vanilla_Ajax({
    scheme: _CONFIG.api.scheme,
    host: _CONFIG.api.host,
    port: _CONFIG.api.port,
    path: _CONFIG.api.path,
    credentials: 'include',
    callback: {
        401: function (r, api) {
            location.hash = '#sign-in';
        }
    }
});

/* ******* */
/*  Redux  */
/* ******* */
var ACTIONS = new Actions();
var REDUCER = new Reducer();
var STORE = new Store(REDUCER).init();

/* *********** */
/*  Metronome  */
/* *********** */
var Metronome = new Vanilla_metronome({
    interval: 1000 * 10,
    tick: function (count) {
         // ACTIONS.fetchData();
    }
});

/* ****** */
/*  Router  */
/* ****** */
var ROUTER = new VanillaRouterRiot(
    STORE.get('site'),
    {
        callbacks: {
            changed: (route) => {
                ACTIONS.movePage({
                    route: route,
                });
            },
            tags: {
                errors : {
                    404: () => {
                        return 'error-404';
                    },
                    500: () => {
                        return 'error-404';
                    },
                },
            }
        }
    });
ROUTER.start();
