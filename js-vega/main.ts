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

const table = "flights_2008_10k";

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

// transform to compute the extent
// const extent = {
//     type: "querycore",
//     query: {
//         signal: `'select min(' + field + ') as "min", max(' + field + ') as "max" from ${table}'`
//     }
// } as any;

// bin and aggregate
const data = {
    type: "querycore",
    query: {
        signal: `'select ' + bins.step + ' * floor((' + field + '-cast(' + bins.start + ' as float))/' + bins.step + ') as "bin_start", count(*) as "cnt" from ${table} where ' + field + ' between ' + bins.start + ' and ' + bins.stop + ' group by bin_start'`
    }
} as any;

const extent = {
    type: "querycore",
    query: "select origin_state as category, count(origin_state) as amount from flights_2008_10k GROUP by origin_state limit 10"
} as any;

const spec: vega.Spec = {
  "$schema": "https://vega.github.io/schema/vega/v5.json",
  "width": 400,
  "height": 200,
  "padding": 5,

  "data": [
    // {
    //     "name": "table",
    //     // "values": [
    //     //     { "amount": 28},
    //     //     { "amount": 55},
    //     //     { "amount": 43},
    //     //     { "amount": 91},
    //     //     { "amount": 81},
    //     //     { "amount": 53},
    //     //     { "amount": 19},
    //     //     { "amount": 87}
    //     // ]
    //     // "values": [
    //     //     {"category": "A", "amount": 28},
    //     //     {"category": "B", "amount": 55},
    //     //     {"category": "C", "amount": 43},
    //     //     {"category": "D", "amount": 91},
    //     //     {"category": "E", "amount": 81},
    //     //     {"category": "F", "amount": 53},
    //     //     {"category": "G", "amount": 19},
    //     //     {"category": "H", "amount": 87}
    //     // ]
    // }
      {
          "name": "table",
          "transform": [ extent ] 
      }
  ],

  "signals": [
    {
      "name": "tooltip",
      "value": {},
      "on": [
        {"events": "rect:mouseover", "update": "datum"},
        {"events": "rect:mouseout",  "update": "{}"}
      ]
    }
  ],

  "scales": [
    {
      "name": "xscale",
      "type": "band",
      "domain": {"data": "table", "field": "category"},
      "range": "width",
      "padding": 0.05,
      "round": true
    },
    {
      "name": "yscale",
      "domain": {"data": "table", "field": "amount"},
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
      "from": {"data": "table"},
      "encode": {
        "enter": {
          "x": {"scale": "xscale", "field": "category"},
          "width": {"scale": "xscale", "band": 1},
          "y": {"scale": "yscale", "field": "amount"},
          "y2": {"scale": "yscale", "value": 0}
        },
        "update": {
          "fill": {"value": "steelblue"}
        },
        "hover": {
          "fill": {"value": "red"}
        }
      }
    },
    {
      "type": "text",
      "encode": {
        "enter": {
          "align": {"value": "center"},
          "baseline": {"value": "bottom"},
          "fill": {"value": "#333"}
        },
        "update": {
          "x": {"scale": "xscale", "signal": "tooltip.category", "band": 0.5},
          "y": {"scale": "yscale", "signal": "tooltip.amount", "offset": -2},
          "text": {"signal": "tooltip.amount"},
          "fillOpacity": [
            {"test": "isNaN(tooltip.amount)", "value": 0},
            {"value": 1}
          ]
        }
      }
    }
  ]
}

