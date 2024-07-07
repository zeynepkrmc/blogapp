//model 2
//blog modeli orm veriyi obje üzerinden tasıma 

const { DataTypes } = require("sequelize");
const sequelize = require("../data/db");

const Blog = sequelize.define("blog",{
    //bunu yorumladık çünkü one to many iliski tipini uygulsmsda yapcaz.
    // blogid: {
    //     type: DataTypes.INTEGER,
    //     autoIncrement: true,
    //     allowNull: false,
    //     primaryKey: true
    // },
    baslik: {
        type: DataTypes.STRING,
        allowNull: false
    },
    altbaslik: {
        type: DataTypes.STRING,
        allowNull: false
    },
    aciklama: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    resim: {
        type: DataTypes.STRING,
        allowNull: false 
    },
    anasayfa:{
        type: DataTypes.BOOLEAN,
        allowNull: false 
    },
    onay: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    // onay2: {
    //     type: DataTypes.BOOLEAN,
    //     allowNull: false
    // },
    // categoryid:{
    //     type: DataTypes.INTEGER,
    //     allowNull: false 
    // },

    //no need anymore 
    // eklenmeTarihi:{
    //     type: DataTypes.DATE,
    //     defaultValue: DataTypes.NOW
    // }
}, {
    timestamps: true
}
);


//foreign key one to many iliskisini kurarken bunlari sildi
// async function sync() {
//     await Blog.sync({ alter: true });
//     console.log("blog tablosu eklendi");

//     const count = await Blog.count();

//     if(count == 0) { 
//         await Blog.create({
//             baslik: "Komple Uygulamalı Web Geliştirme Eğitimi",
//             altbaslik: "Sıfırdan ileri seviyeye 'Web Geliştirme': Html, Css, Sass, Flexbox, Bootstrap, Javascript, Angular, JQuery, Asp.Net Mvc&Core Mvc",
//             aciklama: "Web geliştirme komple bir web sitesinin hem web tasarım (html,css,javascript), hem de web programlama (asp.net mvc) konularının kullanılarak geliştirilmesidir. Sadece html css kullanarak statik bir site tasarlayabiliriz ancak işin içine bir web programlama dilini de katarsak dinamik bir web uygulaması geliştirmiş oluruz.",
//             resim: "1.jpeg",
//             anasayfa: true,
//             onay: true,
//             categoryid: 1
//         });

//         await Blog.create({
//             baslik: "Python ile Sıfırdan İleri Seviye Python Programlama",
//             altbaslik: "Sıfırdan İleri Seviye Python Dersleri.Veritabanı,Veri Analizi,Bot Yazımı,Web Geliştirme(Django)",
//             aciklama: "Python, son zamanların en popüler programlama dili haline geldi. Python' ın bu kadar popüler olmasındaki sebep şüphesiz öğrenmesi kolay bir yazılım dili olmasıdır.sadikturan adreslerinde paylaşmış olduğum python dersleri serisini takip ederek ister video ister yazılı kaynaklar yardımıyla kısa zamanda python programlama alanında uzmanlık kazanın ve hayal ettiğiniz projeyi gerçekleştirin.",
//             resim: "2.jpeg",
//             anasayfa: true,
//             onay: true,
//             categoryid: 1
//         });
//     }
// }


//bunlar henüz bir yerde kullanilmiyor, kullanmak için : 
//index.js içinde bunlari yazacağız ama sonra silecegiz.
//const Blog =require("./models/blog");
//const Category =require("./models/category");
// async function sync() {
//     await Blog.sync(); //await Blog.sync({force: true}); bunu sildi
//     console.log("blog tablosu eklendi");
// }

//sync();


module.exports = Blog;