const mysql = require("mysql2");
const config = require("../config");

//sequelize parametreleri bunlar, web sitesinde 3. secenek
const Sequelize = require("sequelize");

const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password,{
    dialect: "mysql",
    host: config.db.host
});

async function connect() {
    try{
        await sequelize.authenticate();
        console.log("sequelize mysql server bağlantısı yapıldı");
    }
    catch(err){
        console.log("sequelize mysql server baglantı hatası", err);
    }
}

//yazdığım fonksiyonu çağırmak için:
connect();
module.exports = sequelize;

// let connection = mysql.createConnection(config.db);

// connection.connect(function(err) {
//     if(err) {
//         return console.log(err);
//     }

//     console.log("mysql server bağlantısı yapıldı");
// });

// module.exports = connection.promise();

// promise, async-await => async