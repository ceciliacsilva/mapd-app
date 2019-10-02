const query = "SELECT arrdelay FROM flights_2008_10k LIMIT 10"

const defaultQueryOptions = {}
const connector = new window.MapdCon()

connector
    .protocol("http")
    .host("localhost")
    .port("6278")
    .dbName("omnisci")
    .user("admin")
    .password("HyperInteractive")
    .connectAsync()
    .then(session =>
          Promise.all([
            session.getTablesAsync(),
            // session.getFieldsAsync("flights_donotmodify"),
            session.queryAsync(query, defaultQueryOptions),
          ])
         )
    .then(values => {
        // handle result of getTablesAsync
        console.log(
          "All tables available at metis.mapd.com:",
          values[0].map(x => x.name)
        )

        
        // handle result of getFieldsAsync
        // console.log(
        //   "All fields for 'flights_donotmodify':",
    //   values[1].columns.reduce((o, x) => Object.assign(o, { [x.name]: x }), {})
        // )
        
        // handle result of first query
        document.getElementById("result-async").innerHTML =
            "10 arrival delays " + values[1].map(x => x.arrdelay) + " from the DB."
        console.log(values[1].map(x => x.arrdelay))

        // // handle result of 2nd query
        // createRowChart(values[3])
        // console.log(
        //   "Query 2 results:",
        //   values[3].reduce((o, x) => Object.assign(o, { [x.key0]: x.val }), {})
        // )
    })
    .catch(error => {
        console.error("Something bad happened: ", error)
    })


