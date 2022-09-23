var sqlite3 = require('sqlite3');
var newdb;
module.exports = {
   createDatabase: function () {
      let db = new sqlite3.Database('./mcu.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
         if (err && err.code == "SQLITE_CANTOPEN") {
            console.log("1");
            createNewDatabase();
            return;
            } else if (err) {
               console.log("Getting error " + err);
               exit(1);
         }
         else {
            console.log("бд есть " + typeof newdb);
            //createNewDatabase(); 
            //нужно подумать, как создавать таблицу но один раз, а то он всегда видит что бд есть, подуматьв  какой момент она создается, видимо в 5 строке, поэтому падает ошибка что таьблица есть
         }
      });
   },
   outCreateTable: function ()  {
      createTables ();
   },
   //нужно посмотреть как работает ролбэк
   insertOrders: function (iClientId, iClientName, iWater, iAmount) {
      console.log(iWater);
      let db = new sqlite3.Database('./mcu.db');
      db.exec(`
      insert into orders (client_id, client_name, water, amount)
         values  (1, '${iClientName}', '${iWater}', ${iAmount});`);
      console.log("zapisal");
      // db.exec(`
      //  insert into orders (client_id, client_name, water, amount)
      //     values  (?, ?, ?, ?)`,[iClientId, iClientName, iWater, iAmount]);
   },

   // это можно переделать в просто квери, пусть он подключается к бд и просто в ней кверит и все, можно убрать две функции
   // сделать экспорт или всего фалйа или функций, или же, сделать экспорт функций и импортнуть их в файл, а скллайт объявить в главном файле и все, но вообще мб завязаться на классы хз
   // как грамотно передавать все данные, проверить, что получится, если ничего, то сделать логику заказа воды с привязкой к клиенту и пониманием что он заказал, или сделать степер, с выбором воды

   retRunQuries: function  (iClientName) {
      let db = new sqlite3.Database('./mcu.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
         if (err && err.code == "SQLITE_CANTOPEN") {
            console.log("Database not created " + err);
            exit(1);
            return;
            } else if (err) {
                  console.log("Getting error " + err);
                  exit(1);
         }
         runQueries(db, iClientName);
      });
   }
}
function runQueries(db, iClientName) {
   console.log(iClientName);
   let orders = new Array();
   // с препаре разобраться
   db.prepare(`select client_id, client_name, water, amount from orders
   where client_name = ?`,iClientName, errQuery);
   console.log(orders);
   return orders;
}

errQuery = (err, rows) => {
   rows.forEach(row => {
      orders.push({
         water: row.water,
         amount: row.amount
      });  
      console.log(row.client_name + "\t" + row.water + "\t" + row.amount);
   });
} 

function createNewDatabase () {
   newdb = new sqlite3.Database('./mcu.db', (err) => {
      if (err) {
            console.log("ощибка тут " + err);
            console.log("Getting error " + err);
            exit(1);
      }
      console.log('создаем таблицу');
      createTables();
      console.log('создал таблицу');
   });
}

function createTables () {
   console.log("зашел вв создание таблицы ");
   let db = new sqlite3.Database('./mcu.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
      if (err && err.code == "SQLITE_CANTOPEN") {
         console.log("Database not created " + err);
         exit(1);
         return;
         } else if (err) {
               console.log("Getting error " + err);
               exit(1);
      }
      db.exec(`
      create table orders (
         client_id int,
         client_name text,
         water text,
         amount integer 
      );

      `);
   });
   
}

