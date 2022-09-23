const express = require("express");
var sqlLite = require('./sqLITE.js');
sqlLite.createDatabase();
//sqlLite.outCreateTable();
const app = express();
 
app.use(express.static(__dirname + "/html"));
 
app.get("/", function(request, response){nod
     
     response.sendFile(__dirname + "/html/site.html");
 });

const urlencodedParser = express.urlencoded({extended: false});

app.post("/form.html", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
    response.send(`${request.body.userName} - ${request.body.userEmail}`);
});
app.post("/optgroup.html", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
    console.log("polzak " +request.body.userName);
    sqlLite.insertOrders(request.body.userName, request.body.userName, request.body.selectWater, request.body.countWater);
    //response.sendFile(__dirname + "/html/orders.html");
    let orders = sqlLite.retRunQuries('123');
    //console.log("массив3 " + orders);
    //console.log(orders.water[0]);
    //response.send(`${orders.water[0]} - ${orders.amount[0]}`);
});
// app.get("/orders.html", urlencodedParser, function (request, response) {
//     //console.log(typeof sqlLite.cons)
//     let orders = sqlLite.retRunQuries('123');
//     response.send(`${orders.water} - ${orders.amount}`);
// });
app.listen(3000, ()=>console.log("Сервер запущен..."));

