//model 1 
//category modeli
//bu semayı ver tabanına aktarma yapacaz.
const { DataTypes } = require("sequelize");
const sequelize = require("../data/db");
//const { name } = require("ejs");

const Category = sequelize.define("category",{
    //bunu yorumladık çünkü one to many iliski tipini uygulsmsda yapcaz.
    // categoryid: {
    //     type: DataTypes.INTEGER,
    //     autoIncrement: true,
    //     allowNull: false,
    //     primaryKey: true
    // },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

//one to many iliski tipini uygularken sildik.
// async function sync() {
//     await Category.sync({alter: true}); //await Category.sync({force: true});
//     //sadece veri tabanı semasında degisiklik varsa değisiklik yapsın.
//     console.log("category tablosu eklendi");

//     const count = await Category.count();

//     if(count == 0) { 

//     //veri ekleme
//     //1. yol
//     // const c1 = await Category.create({ //await dediğimde bekletiyorum, kategori eklendiğinde bekletiyorum, görüyorum.
//     //     name: "Mobil Geliştirme"
//     // });
    
//     //await c1.save(); //save deyince veri tabanına kaydolur
//     //Category.build({ yerine Category.create deyince yazdıgım anda kaydolur.
//     // console.log(c1.categoryid);
//     // console.log("kategori eklendi");
    
//     //2. yol
//     //birden fazla kayıt oluşturmak için:
//     // await Category.create({name: "Web Geliştirme"});
//     // await Category.create({name: "Mobil Geliştirme"});
//     // await Category.create({name: "İHA"});
//     // await Category.create({name: "Python"});

//     //3. yol
//     await Category.bulkCreate([ // ([]) paranezlere dikkat et!!!
//         {name: "Web Geliştirme"},
//         {name: "Mobil Geliştirme"},
//         {name: "İHA"},
//         {name: "Python"}
//     ]);
// }
//     console.log("kategoriler eklendi");
// }
// //sync();


module.exports = Category;
