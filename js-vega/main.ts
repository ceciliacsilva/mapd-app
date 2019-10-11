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
    window["view5"] = view;
});


connection.connectAsync().then(session => {

    // assign session to OmniSci Core transform
    QueryCore.session(session);

    // add core transforms
    (vega as any).transforms["querycore"] = QueryCore;

    const runtime = vega.parse(spec6);
    const view = new vega.View(runtime)
        .logLevel(vega.Info)
        .renderer("svg")
        .initialize(document.querySelector("#view6"));

    view.runAsync();

    // assign view and vega to window so we can debug them
    window["vega"] = vega;
    window["view6"] = view;
});

const query_origin_state = {
    type: "querycore",
    query: "select origin_state as category, count(origin_state) + COUNT(dest_state) as amount from flights_2008_7M GROUP BY origin_state ORDER BY COUNT(origin_state) + COUNT(dest_state) DESC LIMIT 10"
} as any;

const spec: vega.Spec = {
    "$schema": "https://vega.github.io/schema/vega/v5.json",
    "width": 400,
    "height": 100,
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
        {
            "title": "Estado",
            "orient": "bottom",
            "scale": "xscale" },
        {
            "orient": "left",
            "scale": "yscale",
            "format": "~s"
        }
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
                    "fill": { "value": "#357890" }
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
    query: "select avg(depdelay) as temp, flight_dayofmonth, flight_month - 1 as flight_month from flights_2008_7M group by flight_dayofmonth, flight_month"
} as any;

const spec2: vega.Spec = {
    "$schema": "https://vega.github.io/schema/vega/v5.json",
    "width": 350,
    "height": 250,
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
            "range": { "scheme": "blues" } // "greens" }, // "redpurple" },
            "domain": { "data": "table", "field": "temp" },
            "zero": false, "nice": true
        }
    ],

    "axes": [
        {
            "orient": "bottom",
            "scale": "xscale",
            "labels": true,
            // "labels": { "text": ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"] },
            // "values": [2,3,4,5,6,7,8,9,10,11,12,13],
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
            "title": "AVG",
            // "direction": "horizontal",
            "orient": "left"
            "titlePadding": 5,
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
                    "width": { "value": 31 },
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
    query: "SELECT flight_month, distance, airtime, arrdelay + depdelay as delay, carrier_name, plane_year FROM flights_2008_7M where MOD(rowid, 30000) = 1 AND distance > 0 AND airtime > 0 AND arrdelay IS NOT NULL AND depdelay IS NOT NULL AND plane_year IS NOT NULL ORDER BY plane_year"
} as any;

const spec3: vega.Spec = {
    "$schema": "https://vega.github.io/schema/vega/v5.json",
    "width": 400,
    "height": 300,
    "padding": 5,
    "config": {
        "axisY": {
            "titleX": -2,
            "titleY": 310,
            "titleAngle": 0,
            "titleAlign": "right",
            "titleBaseline": "top"
        }
    },


    "data": [
        {
            "name": "table",
            "transform": [query_coordenadas_paralelas]
        },
        {
            "name": "fields",
            "values": [
                "plane_year",
                "delay",
                "distance",
                "airtime",
                "flight_month",
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
            "name": "plane_year", "type": "linear",
            "range": "height", "zero": false, "nice": true,
            "domain": { "data": "table", "field": "plane_year" }
        },
        {
            "name": "flight_month", "type": "linear",
            "range": "height", "zero": false, "nice": true,
            "domain": { "data": "table", "field": "flight_month" }
        },
        {
            "name": "distance", "type": "linear",
            "range": "height", "zero": false, "nice": true,
            "domain": { "data": "table", "field": "distance" }
        },
        {
            "name": "airtime", "type": "linear",
            "range": "height", "zero": false, "nice": true,
            "domain": { "data": "table", "field": "airtime" }
        },
        {
            "name": "delay", "type": "linear",
            "range": "height", "zero": false, "nice": true,
            "domain": { "data": "table", "field": "delay" }
        },
        {
            "name": "carrier_name",
            "type": "ordinal",
            "range": { "scheme": "category20"}, //"tableau20" },
            "domain": { "data": "table", "field": "carrier_name" }
        }
    ],
    "axes": [
        {
            "orient": "left", "zindex": 1,
            "scale": "plane_year", "title": "Ano(Aero)",
            "offset": { "scale": "ord", "value": "plane_year", "mult": -1 }
        },
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
            "scale": "delay", "title": "Delay Total",
            "offset": { "scale": "ord", "value": "delay", "mult": -1 }
        },
    ],
    "legends": [
        {
            "fill": "carrier_name",
            "title": "Companhia Aérea",
            "symbolStrokeWidth": 2,
            "symbolOpacity": 0.7,
            "symbolType": "circle",
        }
    ],

    "marks": [
        {
            "type": "group",
            "from": { "data": "table" },
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
                                "scale": "carrier_name",
                                "field": { "parent": "carrier_name" }
                            },
                            "strokeWidth": { "value": 1.01 },
                            "strokeOpacity": { "value": 0.7 },
                        }
                    }
                }
            ]
        }
    ]
}


const query_scatter_plot = {
    type: "querycore",
    query: "SELECT arrdelay, depdelay, airtime, carrier_name as category FROM flights_2008_7M where mod(rowid, 30000) = 1"
} as any;

const spec4: vega.Spec = {
    "$schema": "https://vega.github.io/schema/vega/v5.json",
    "width": 400,
    "height": 300,
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
            "title": "Delay chegada"
        },
        {
            "scale": "y",
            "grid": true,
            "domain": false,
            "orient": "left",
            "titlePadding": 10,
            "title": "Delay partida"
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

const width = 399;
const height = 287;

const query_hexagonal_map = {
    type: "querycore",
    query: {
        signal: `'SELECT rect_pixel_bin(conv_4326_900913_x(origin_lon), -13847031.457875465, -7451726.712679257, ${width}, ${width}) as x, rect_pixel_bin(conv_4326_900913_y(origin_lat), 2346114.147993467, 6970277.197053557, ${height}, ${height}) as y, COUNT(1) as cnt FROM flights_2008_7M WHERE (origin_lon >= -124.39000000000038 AND origin_lon <= -66.93999999999943) AND (origin_lat >= 20.61570573311549 AND origin_lat <= 52.93117449504004) GROUP BY x, y'`
    }
} as any;

const spec5: vega.Spec = {
    "$schema": "https://vega.github.io/schema/vega/v5.json",
    "width": width,
    "height": height,
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
        },
        {
            "name": "map_size",
            "source": "heatmap_query",
            "transform": [
                {
                    "type": "aggregate",
                    "fields": ["x", "x", "y", "y"],
                    "ops":    ["min", "max", "min", "max"],
                    "as":     ["minx", "maxx", "miny", "maxy"]
                }
            ]
        }
    ],
    "projections": [
        {
            "name": "merc",
            "type": "mercator",
        }
    ],
    "scales": [
        {
            "name": "xscale",
            "type": "linear",
            "domain": {"data": "map_size", "fields": ["minx", "maxx"]},
            "range": "width"
        },
        {
            "name": "yscale",
            "type": "linear",
            "domain": {"data": "map_size", "fields": ["miny", "maxy"]},
            "range": "height"
        },
        {
            "name": "heat_color",
            "type": "pow",
            "domain": {"data": "heatmap_stats", "fields": ["mincnt", "maxcnt"]},
            "range": { "scheme": "blues" }, //"lightgreyteal" }// "greens" },
            "reverse": true
        },
        {
            "name": "heat_size",
            "type": "pow",
            "domain": {"data": "heatmap_stats", "fields": ["mincnt", "maxcnt"]},
            "range": [20, 300],
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
                    "xc": {
                        "scale": "xscale",
                        "field": "x"
                    },
                    "yc": {
                        "scale": "yscale",
                        "field": "y"
                    },
                    "size": { "scale": "heat_size", "field": "cnt" },
                    "fill": {
                        "scale": "heat_color",
                        "field": "cnt"
                    }
                }
            }
        }
    ]
}

const query_deptime = {
    type: "querycore",
    query: "SELECT deptime AS category, count(1) AS amount FROM flights_2008_7M WHERE deptime IS NOT NULL GROUP BY deptime ORDER BY deptime"
    // query: "select origin_state as category, count(origin_state) + COUNT(dest_state) as amount from flights_2008_7M GROUP BY origin_state ORDER BY COUNT(origin_state) + COUNT(dest_state) DESC LIMIT 10"
} as any;

const spec6: vega.Spec = {
    "$schema": "https://vega.github.io/schema/vega/v5.json",
    "width": 400,
    "height": 100,
    "padding": 5,

    "data": [
        {
            "name": "table",
            "transform": [query_deptime]
        }
    ],

    "scales": [
        {
            "name": "xscale",
            // "type": "point",
            "type": "linear",
            "domain": { "data": "table", "field": "category" },
            "range": "width",
            // "padding": 0.05,
            // "round": true
        },
        {
            "name": "yscale",
            "type": "linear",
            "domain": { "data": "table", "field": "amount" },
            "nice": true,
            "range": "height"
        }
    ],

    "axes": [
        {
            "title": "Horas",
            "orient": "bottom",
            "scale": "xscale",
            "tickCount": 12,
            "encode":
            {
                "labels":
                {
                    "update":
                    {
                        "text": { "signal": "(datum.value / 100)" }
                        // ["00:00", "02:00", "04:00", "06:00", "08:00", "10:00", "11:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00", "24:00"]
                    }
                }
            }
        },
        {
            "orient": "left",
            "scale": "yscale",
            "format": "~s"
        }
    ],

    "marks": [
        {
            "type": "line",
            "from": { "data": "table" },
            "encode": {
                "enter": {
                    "x": { "scale": "xscale", "field": "category" },
                    "y": { "scale": "yscale", "field": "amount" },
                },
                "update": {
                    "stroke": { "value": "#357890" }
                },
            }
        },
    ]
}
