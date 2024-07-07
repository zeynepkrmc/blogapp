// const express = require("express");
// const router = express.Router();

// const db = require("../data/db");

// const Blog = require("../models/blog");
// const Category = require("../models/category");

// router.use("/blogs/category/:categoryid", async function(req, res) {
//     const id = req.params.categoryid;
//     try {
//         const [blogs, ] = await db.execute("select * from blog where categoryid=?", [id]); 
//         const [categories, ] = await db.execute("select * from category");

//         res.render("users/blogs", {
//             title: "Tüm Kurslar",
//             blogs: blogs,
//             categories: categories,
//             selectedCategory: id
//         })
//     }
//     catch(err) {
//         console.log(err);
//     }
// });

// router.use("/blogs/:blogid", async function(req, res) {
//     const id = req.params.blogid;
//     try {
//         const [blogs, ] = await db.execute("select * from blog where blogid=?", [id]);

//         const blog = blogs[0];

//         if(blog) {
//             return res.render("users/blog-details", {
//                 title: blog.baslik,
//                 blog: blog
//             });
//         }
//         res.redirect("/");
//     }
//     catch(err) {
//         console.log(err);
//     }
// });

// router.use("/blogs", async function(req, res) {
//     try {
//         const [blogs, ] = await db.execute("select * from blog where onay=1")
//         const [categories, ] = await db.execute("select * from category");

//         res.render("users/blogs", {
//             title: "Tüm Kurslar",
//             blogs: blogs,
//             categories: categories,
//             selectedCategory: null
//         })
//     }
//     catch(err) {
//         console.log(err);
//     }
// });

// router.use("/", async function(req, res) {
//     try {
//         const blogs = await Blog.findAll({
//             where:{
//                 anasayfa: true,
//                 onay: true
//             }
//         });
//         const categories = await Category.findAll();

//         res.render("users/index", {
//             title: "Popüler Kurslar",
//             blogs: blogs,
//             categories: categories,
//             selectedCategory: null
//         })
//     }
//     catch(err) {
//         console.log(err);
//     }
// });
 
// module.exports = router;

const express = require("express");
const router = express.Router();

//const db = require("../data/db");

//--BURAYI DEGISTIRDİK -controller/user.js İLE BİRLİKTE
// const Blog = require("../models/blog");
// const Category = require("../models/category");

// const { Op } = require("sequelize");

// router.use("/blogs/category/:categoryid", async function(req, res) {
//     const id = req.params.categoryid;
//     try {
//         const blogs = await Blog.findAll({ //blog bilgisinin birden fazla olmmasını sagalr..
//             where: { //neye gore sorgu yapacagiz?
//                 categoryid: id,
//                 onay: true
//             },
//             raw: true
//         })
//         const categories = await Category.findAll({ raw: true });

//         res.render("users/blogs", {
//             title: "Tüm Kurslar",
//             blogs: blogs,
//             categories: categories,
//             selectedCategory: id
//         })
//     }
//     catch(err) {
//         console.log(err);
//     }
// });


// //blog detay sayfa
// router.use("/blogs/:blogid", async function(req, res) {
//     const id = req.params.blogid;
//     try {
//         const blog = await Blog.findOne({
//             where: {
//                 blogid: id
//             },
//             raw: true
//         });

//         if(blog) {
//             return res.render("users/blog-details", {
//                 title: blog.baslik,
//                 blog: blog
//             });
//         }
//         res.redirect("/");
//     }
//     catch(err) {
//         console.log(err);
//     }
// });

// router.use("/blogs", async function(req, res) {
//     try {
//         const blogs = await Blog.findAll({  //birden fazla sonuc döndüreceğimiz icin findAll
//             where: {
//                 onay: {
//                     [Op.eq]: true // onay=1
//                 }                
//             },
//             raw: true 
//         })
//         const categories = await Category.findAll({ raw: true });

//         res.render("users/blogs", {
//             title: "Tüm Kurslar",
//             blogs: blogs,
//             categories: categories,
//             selectedCategory: null
//         })
//     }
//     catch(err) {
//         console.log(err);
//     }
// });

// router.use("/", async function(req, res) {
//     try {
//         const blogs = await Blog.findAll({
//             where: {
//                 [Op.and]: [
//                     { anasayfa: true }, //and operatorü ile
//                     { onay: true }
//                 ]
//             },
//             raw: true
//         });
//         const categories = await Category.findAll({ raw: true });

//         res.render("users/index", {
//             title: "Popüler Kurslar",
//             blogs: blogs,
//             categories: categories,
//             selectedCategory: null
//         })
//     }
//     catch(err) {
//         console.log(err);
//     }
// });
 
// module.exports = router;

const userController = require("../controllers/user");

router.use("/blogs/category/:categoryid", userController.blogs_by_category);

router.use("/blogs/:blogid", userController.blogs_details);

router.use("/blogs", userController.blog_list);

router.use("/", userController.index);
 
module.exports = router;