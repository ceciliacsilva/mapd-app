import * as vega from "vega";
import QueryCore from "vega-transform-omnisci-core";
import "@mapd/connector/dist/browser-connector";

const connection = new (window as any).MapdCon()
    .protocol("http")
    .host("localhost")
    .port("6278")
    .dbName("omnisci")
    .user("admin")
    .password("HyperInteractive");

const table = "flights_2008_7M";

var vegaOptions = {}
connection.connectAsync().then(session => {

    // assign session to OmniSci Core transform
    QueryCore.session(session);

    // add core transforms
    (vega as any).transforms["querycore"] = QueryCore;

    const runtime = vega.parse(spec);
    const view = new vega.View(runtime)
        .logLevel(vega.Info)
        .renderer("svg")
        .initialize(document.querySelector("#view"));

    view.runAsync();

    // assign view and vega to window so we can debug them
    window["vega"] = vega;
    window["view"] = view;
});

connection.connectAsync().then(session => {

    // assign session to OmniSci Core transform
    QueryCore.session(session);

    // add core transforms
    (vega as any).transforms["querycore"] = QueryCore;

    const runtime = vega.parse(spec2);
    const view = new vega.View(runtime)
        .logLevel(vega.Info)
        .renderer("svg")
        .initialize(document.querySelector("#view2"));

    view.runAsync();

    // assign view and vega to window so we can debug them
    window["vega"] = vega;
    window["view2"] = view;
});

connection.connectAsync().then(session => {

    // assign session to OmniSci Core transform
    QueryCore.session(session);

    // add core transforms
    (vega as any).transforms["querycore"] = QueryCore;

    const runtime = vega.parse(spec3);
    const view = new vega.View(runtime)
        .logLevel(vega.Info)
        .renderer("svg")
        .initialize(document.querySelector("#view3"));

    view.runAsync();

    // assign view and vega to window so we can debug them
    window["vega"] = vega;
    window["view3"] = view;
});

connection.connectAsync().then(session => {

    // assign session to OmniSci Core transform
    QueryCore.session(session);

    // add core transforms
    (vega as any).transforms["querycore"] = QueryCore;

    const runtime = vega.parse(spec4);
    const view = new vega.View(runtime)
        .logLevel(vega.Info)
        .renderer("svg")
        .initialize(document.querySelector("#view4"));

    view.runAsync();

    // assign view and vega to window so we can debug them
    window["vega"] = vega;
    window["view4"] = view;
});

connection.connectAsync().then(session => {

    // assign session to OmniSci Core transform
    QueryCore.session(session);

    // add core transforms
    (vega as any).transforms["querycore"] = QueryCore;

    const runtime = vega.parse(spec5);
    const view = new vega.View(runtime)
        .logLevel(vega.Info)
        .renderer("svg")
        .initialize(document.querySelector("#view5"));

    view.runAsync();

    // assign view and vega to window so we can debug them
    window["vega"] = vega;
    window["view4"] = view;
});



const query_origin_state = {
    type: "querycore",
    query: "select origin_state as category, count(origin_state) as amount from flights_2008_7M GROUP BY origin_state ORDER BY COUNT(origin_state) DESC LIMIT 10"
} as any;

const spec: vega.Spec = {
    "$schema": "https://vega.github.io/schema/vega/v5.json",
    "width": 500,
    "height": 300,
    "padding": 5,

    "data": [
        {
            "name": "table",
            "transform": [query_origin_state]
        }
    ],

    "signals": [
        {
            "name": "tooltip",
            "value": {},
            "on": [
                { "events": "rect:mouseover", "update": "datum" },
                { "events": "rect:mouseout", "update": "{}" }
            ]
        }
    ],

    "scales": [
        {
            "name": "xscale",
            "type": "band",
            "domain": { "data": "table", "field": "category" },
            "range": "width",
            "padding": 0.05,
            "round": true
        },
        {
            "name": "yscale",
            "domain": { "data": "table", "field": "amount" },
            "nice": true,
            "range": "height"
        }
    ],

    "axes": [
        { "orient": "bottom", "scale": "xscale" },
        { "orient": "left", "scale": "yscale" }
    ],

    "marks": [
        {
            "type": "rect",
            "from": { "data": "table" },
            "encode": {
                "enter": {
                    "x": { "scale": "xscale", "field": "category" },
                    "width": { "scale": "xscale", "band": 1 },
                    "y": { "scale": "yscale", "field": "amount" },
                    "y2": { "scale": "yscale", "value": 0 }
                },
                "update": {
                    "fill": { "value": "green" }
                },
                "hover": {
                    "fill": { "value": "red" }
                }
            }
        },
        {
            "type": "text",
            "encode": {
                "enter": {
                    "align": { "value": "center" },
                    "baseline": { "value": "bottom" },
                    "fill": { "value": "#333" }
                },
                "update": {
                    "x": { "scale": "xscale", "signal": "tooltip.category", "band": 0.5 },
                    "y": { "scale": "yscale", "signal": "tooltip.amount", "offset": -2 },
                    "text": { "signal": "tooltip.amount" },
                    "fillOpacity": [
                        { "test": "isNaN(tooltip.amount)", "value": 0 },
                        { "value": 1 }
                    ]
                }
            }
        }
    ]
}

const query_arrival_delay = {
    type: "querycore",
    // query: "select avg(arrdelay) as temp, flight_dayofmonth - 1, flight_month - 1 from flights_2008_7M group by flight_dayofmonth, flight_month"
    query: "select avg(arrdelay) as temp, flight_dayofmonth, flight_month from flights_2008_7M group by flight_dayofmonth, flight_month"
} as any;

const spec2: vega.Spec = {
    "$schema": "https://vega.github.io/schema/vega/v5.json",
    "width": 600,
    "height": 400,
    "padding": 5,

    "data": [
        {
            "name": "table",
            "transform": [query_arrival_delay]
        }
    ],

    "scales": [
        {
            "name": "xscale",
            "domain": { "data": "table", "field": "flight_month" },
            "range": "width",
            "round": true
        },
        {
            "name": "yscale",
            "type": "band",
            "domain": { "data": "table", "field": "flight_dayofmonth" },
            // "nice": true,
            "range": "height",
            // "zero": false,
        },
        {
            "name": "color",
            "type": "linear",
            "range": { "scheme": "greens" }, // "redpurple" },
            "domain": { "data": "table", "field": "temp" },
            "zero": false, "nice": true
        }
    ],

    "axes": [
        {
            "orient": "bottom",
            "scale": "xscale",
            "labels": true,
            // "values": ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
            "bandPosition": 0,
            "domain": false,
            "title": "Mês",
            "ticks": false,
        },
        {
            "orient": "left",
            "scale": "yscale",
            // "labels": false,
            "domain": false,
            "ticks": false,
        }
    ],
    "legends": [
        {
            "fill": "color",
            "type": "gradient",
            "title": "Avg. Atraso partida",
            "titleFontSize": 12,
            "titlePadding": 4,
            "gradientLength": {"signal": "height - 16"}
        }
    ],

    "marks": [
        {
            "type": "rect",
            "from": { "data": "table" },
            "encode": {
                "enter": {
                    "x": { "scale": "xscale", "field": "flight_month" },
                    "width": { "value": 50 },
                    "y": { "scale": "yscale", "field": "flight_dayofmonth" },
                    "height": { "scale": "yscale", "band": 1 },
                    "tooltip": { "signal": "{'month': datum.flight_month}" }
                },
                "update": {
                    "fill": { "scale": "color", "field": "temp" }
                }
            }
        },
    ]
}

const query_coordenadas_paralelas = {
    type: "querycore",
    // query: "SELECT flight_month, distance, plane_year FROM flights_2008_7M GROUP BY flight_month, distance, plane_year limit 200"
    // query: "SELECT flight_month, avg(distance) as avg_distance, AVG(airtime) as avg_airtime, AVG(arrdelay) + AVG(depdelay) as avg_delay, SUM(cancelled) as sum_cancelled FROM flights_2008_7M GROUP BY flight_month"
    query: "SELECT flight_month, distance, airtime, arrdelay + depdelay as delay, plane_year FROM flights_2008_7M where MOD(rowid, 20000) = 1"
} as any;

const spec3: vega.Spec = {
    "$schema": "https://vega.github.io/schema/vega/v5.json",
    "width": 500,
    "height": 400,
    "padding": 5,
    "config": {
        "axisY": {
            "titleX": -2,
            "titleY": 410,
            "titleAngle": 0,
            "titleAlign": "right",
            "titleBaseline": "top"
        }
    },


    "data": [
        {
            "name": "cars",
            "transform": [query_coordenadas_paralelas]
        },
        {
            "name": "fields",
            "values": [
                "flight_month",
                "distance",
                "airtime",
                "delay",
            ]
        }
    ],

    "scales": [
        {
            "name": "ord", "type": "point",
            "range": "width", "round": true,
            "domain": { "data": "fields", "field": "data" }
        },
        {
            "name": "flight_month", "type": "linear",
            "range": "height", "zero": false, "nice": true,
            "domain": { "data": "cars", "field": "flight_month" }
        },
        {
            "name": "distance", "type": "linear",
            "range": "height", "zero": false, "nice": true,
            "domain": { "data": "cars", "field": "distance" }
        },
        {
            "name": "airtime", "type": "linear",
            "range": "height", "zero": false, "nice": true,
            "domain": { "data": "cars", "field": "airtime" }
        },
        {
            "name": "delay", "type": "linear",
            "range": "height", "zero": false, "nice": true,
            "domain": { "data": "cars", "field": "delay" }
        },
        {
            "name": "plane_year",
            "type": "ordinal",
            "range": { "scheme": "tableau20" },
            "domain": { "data": "cars", "field": "plane_year" }
        }
    ],
    "axes": [
        {
            "orient": "left", "zindex": 1,
            "scale": "flight_month", "title": "Mês",
            "offset": { "scale": "ord", "value": "flight_month", "mult": -1 }
        },
        {
            "orient": "left", "zindex": 1,
            "scale": "distance", "title": "Distância",
            "offset": { "scale": "ord", "value": "distance", "mult": -1 }
        },
        {
            "orient": "left", "zindex": 1,
            "scale": "airtime", "title": "Tempo voo",
            "offset": { "scale": "ord", "value": "airtime", "mult": -1 }
        },
        {
            "orient": "left", "zindex": 1,
            "scale": "delay", "title": "Delay",
            "offset": { "scale": "ord", "value": "delay", "mult": -1 }
        },
    ],
    "legends": [
        {
            "fill": "plane_year",
            "title": "Ano Aeronave",
            "symbolStrokeWidth": 2,
            "symbolOpacity": 0.7,
            "symbolType": "circle",
        }
    ],

    "marks": [
        {
            "type": "group",
            "from": { "data": "cars" },
            "marks": [
                {
                    "type": "line",
                    "from": { "data": "fields" },
                    "encode": {
                        "enter": {
                            "x": { "scale": "ord", "field": "data" },
                            "y": {
                                "scale": { "datum": "data" },
                                "field": { "parent": { "datum": "data" } }
                            },
                            "stroke": {
                                "scale": "plane_year",
                                "field": { "parent": "plane_year" }
                            },
                            "strokeWidth": { "value": 1.01 },
                            "strokeOpacity": { "value": 0.5 },
                        }
                    }
                }
            ]
        }
    ]
}


const query_scatter_plot = {
    type: "querycore",
    query: "SELECT arrdelay, depdelay, airtime, carrier_name as category FROM flights_2008_7M where mod(rowid, 5000) = 1"
} as any;

const spec4: vega.Spec = {
    "$schema": "https://vega.github.io/schema/vega/v5.json",
    "width": 500,
    "height": 400,
    "padding": 5,

    "data": [
        {
            "name": "source",
            "transform": [query_scatter_plot]
        }
    ],

    "scales": [
        {
            "name": "x",
            "type": "linear",
            "round": true,
            "nice": true,
            "zero": true,
            "domain": { "data": "source", "field": "arrdelay" },
            "range": "width"
        },
        {
            "name": "y",
            "type": "linear",
            "round": true,
            "nice": true,
            "zero": true,
            "domain": { "data": "source", "field": "depdelay" },
            "range": "height"
        },
        {
            "name": "size",
            "type": "linear",
            "round": true,
            "nice": false,
            "zero": true,
            "domain": { "data": "source", "field": "airtime" },
            "range": [0, 538]
        },
        {
            "name": "color",
            "type": "ordinal",
            "domain": { "data": "source", "field": "category" },
            "range": { "scheme": "tableau20" }
        }
    ],

    "axes": [
        {
            "scale": "x",
            "grid": true,
            "domain": false,
            "orient": "bottom",
            "tickCount": 10,
            "title": "Arrival Delay"
        },
        {
            "scale": "y",
            "grid": true,
            "domain": false,
            "orient": "left",
            "titlePadding": 10,
            "title": "Departure Delay"
        }
    ],

    "legends": [
        {
            "size": "size",
            "title": "Tempo de voo",
            "format": "s",
            // "symbolStrokeColor": "#4682b4",
            "symbolStrokeWidth": 2,
            "symbolOpacity": 0.7,
            "symbolType": "circle"
        },
        {
            "fill": "color",
            "title": "Companhia aerea",
            "symbolStrokeWidth": 2,
            "symbolOpacity": 0.7,
            "symbolType": "circle",
        }
    ],

    "marks": [
        {
            "name": "marks",
            "type": "symbol",
            "from": { "data": "source" },
            "encode": {
                "update": {
                    "x": { "scale": "x", "field": "arrdelay" },
                    "y": { "scale": "y", "field": "depdelay" },
                    "size": { "scale": "size", "field": "airtime" },
                    "shape": { "value": "circle" },
                    "strokeWidth": { "value": 2 },
                    "opacity": { "value": 0.5 },
                    "fill": { "scale": "color", "field": "category" },
                }
            }
        }
    ]
}

const query_hexagonal_map = {
    type: "querycore",
    // query: "SELECT reg_hex_horiz_pixel_bin_x(conv_4326_900913_x(origin_lon),conv_4326_900913_x(-157),conv_4326_900913_x(157),conv_4326_900913_y(origin_lat),conv_4326_900913_y(-63),conv_4326_900913_y(81),9.9667,11.5085,0,0,897,647) as x, reg_hex_horiz_pixel_bin_y(conv_4326_900913_x(origin_lon),conv_4326_900913_x(-157),conv_4326_900913_x(157),conv_4326_900913_y(origin_lat),conv_4326_900913_y(-63),conv_4326_900913_y(81),9.9667,11.5085,0,0,897,647) as y, count(*) as cnt FROM flights_2008_10k WHERE ((origin_lon >= -157 AND origin_lon <= 157) AND (origin_lat >= -63 AND origin_lat <= 81)) GROUP BY x, y"
    query: "SELECT origin_lon as x, origin_lat as y, count(*) as cnt FROM flights_2008_10k group by x, y"
} as any;

const spec5: vega.Spec = {
    "$schema": "https://vega.github.io/schema/vega/v5.json",
    "width": 897,
    "height": 647,
    "data": [
        {
            "name": "heatmap_query",
            "transform": [query_hexagonal_map]
        },
        {
            "name": "heatmap_stats",
            "source": "heatmap_query",
            "transform": [
                {
                    "type": "aggregate",
                    "fields": ["cnt", "cnt"],
                    "ops":    ["min", "max"],
                    "as":     ["mincnt", "maxcnt"]
                }
            ]
        }
    ],
    "scales": [
        {
            "name": "heat_color",
            "type": "quantize",
            "domain": {"data": "heatmap_stats", "fields": ["mincnt", "maxcnt"]},
            "range": { "scheme": "greens" },
            "reverse": true
            // "range": ["#115f9a", "#1984c5", "#22a7f0", "#48b5c4", "#76c68f",
            //           "#a6d75b", "#c9e52f", "#d0ee11", "#d0f400"
            //          ]
        }
    ],
    "marks": [
        {
            "type": "symbol",
            "from": {
                "data": "heatmap_query"
            },
            "encode": {
                "update": {
                    "shape": { "value": "circle" },
                    // "shape": { "value": "hexagon"}, 
                    "xc": {
                        "field": "x"
                    },
                    "yc": {
                        "field": "y"
                    },
                    // "width": 9.9667,
                    // "height": 11.5085,
                    "size": { "value": 100 },//"scale": "size", "field": "airtime" },
                    "fill": {
                        "scale": "heat_color",
                        "field": "cnt"
                    }
                }
            }
            // "properties": {
            //     "shape": "hexagon-horiz",
            //     "xc": {
            //         "field": "x"
            //     },
            //     "yc": {
            //         "field": "y"
            //     },
            //     "width": 9.9667,
            //     "height": 11.5085,
            //     "fillColor": {
            //         "scale": "heat_color",
            //         "field": "cnt"
            //     }
            // }
        }
    ]
}
