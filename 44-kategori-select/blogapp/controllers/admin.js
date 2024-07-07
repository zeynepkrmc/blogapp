const Blog = require("../models/blog");
const Category = require("../models/category");
const fs = require("fs");

//remove category posst için kullandık
const sequelize = require("../data/db");

const {Op} = require("sequelize"); //
//delete get 
exports.get_blog_delete = async function(req, res){
    const blogid = req.params.blogid;

    try {
        //tek veriyi sileceğiz.
        const blog = await Blog.findByPk(blogid);
        //const [blogs,] = await db.execute("select * from blog where blogid=?", [blogid]);
       // const blog = blogs[0];

    //     res.render("admin/blog-delete", {
    //         title: "delete blog",
    //         blog: blog
    //     });
    // }
    // catch(err) {
    //     console.log(err); 
    // }
    if(blog) {
        return res.render("admin/blog-delete", {
            title: "delete blog",
            blog: blog
        });
    }
    res.redirect("/admin/blogs"); 
}
catch(err) {
    console.log(err); 
}
}

exports.post_blog_delete = async function(req, res) {
    // const blogid = req.body.blogid;
    // try {
    //     await db.execute("delete from blog where blogid=?", [blogid]);
    //     res.redirect("/admin/blogs?action=delete");
    // }
    // catch(err) {
    //     console.log(err);
    // }
    const blogid = req.body.blogid;
    try {
        const blog = await Blog.findByPk(blogid);
        if(blog) {
            await blog.destroy();
            return res.redirect("/admin/blogs?action=delete");
        }
        res.redirect("/admin/blogs");
    }
    catch(err) {
        console.log(err);
    }
}

exports.get_category_delete = async function(req, res){
    // const categoryid = req.params.categoryid;
    // try {
    //     const [categories,] = await db.execute("select * from category where categoryid=?", [categoryid]);
    //     const category = categories[0];

    //     res.render("admin/category-delete", {
    //         title: "delete category",
    //         category: category
    //     });
    // }
    // catch(err) {
    //     console.log(err);
    // }
    const categoryid = req.params.categoryid;
    try {
        const category = await Category.findByPk(categoryid);

        res.render("admin/category-delete", {
            title: "delete category",
            category: category
        });
    }
    catch(err) {
        console.log(err);
    }
}

exports.post_category_delete = async function(req, res) {
    // const categoryid = req.body.categoryid;
    // try {
    //     await db.execute("delete from category where categoryid=?", [categoryid]);
    //     res.redirect("/admin/categories?action=delete");
    // }
    // catch(err) {
    //     console.log(err);
    // }
    const categoryid = req.body.categoryid;
    try {
        await Category.destroy({
            where: {
                id: categoryid
            }
        });
        res.redirect("/admin/categories?action=delete");
    }
    catch(err) {
        console.log(err);
    }
}

exports.get_blog_create =  async function(req, res) {
    try {
        const categories = await Category.findAll();

        res.render("admin/blog-create", {
            title: "add blog",
            categories: categories
        });
    }
    catch(err) {
        console.log(err);
    }
}

exports.post_blog_create = async function(req, res) {
    const baslik = req.body.baslik;
    const altbaslik = req.body.altbaslik;
    const aciklama = req.body.aciklama;
    const resim = req.file.filename;
    const anasayfa = req.body.anasayfa == "on" ? 1:0;
    const onay = req.body.onay == "on"? 1:0;
    const kategori = req.body.kategori;

    try {
        await Blog.create({
            baslik: baslik,
            altbaslik: altbaslik,
            aciklama: aciklama,
            resim: resim,
            anasayfa: anasayfa,
            onay: onay,
            categoryId: kategori
        });
        res.redirect("/admin/blogs?action=create");
    }
    catch(err) {
        console.log(err);
    }
}

exports.get_category_create = async function(req, res) {
    try {
        res.render("admin/category-create", {
            title: "add category"
        });
    }
    catch(err) {
        console.log(err);
    }
}

exports.post_category_create = async function(req, res) {
    const name = req.body.name;
    try {
        await Category.create({ name: name });
        res.redirect("/admin/categories?action=create");
    }
    catch(err) {
        console.log(err);
    }
}

exports.get_blog_edit = async function(req, res) {
    const blogid = req.params.blogid;

    try {
        // const blog = await Blog.findByPk(blogid);
        //yüklediğimiz her blog için kategory yüklenecek include ile, kategorinin id tanımlamış olsak yeter.
        const blog = await Blog.findOne({
            where:{
                id: blogid
            },
            include: {
                model: Category,
                attributes: ["id"]
            }
        });
        
        const categories = await Category.findAll(); //sayfaya kategori göndeririz. Veri tabanındaki tüm kategoriler

        if(blog) {
            return res.render("admin/blog-edit", {
                title: blog.dataValues.baslik,
                blog: blog.dataValues,
                categories: categories
            });
        }

        res.redirect("admin/blogs");
    }
    catch(err) {
        console.log(err);
    }
}

exports.post_blog_edit = async function(req, res) {
    const blogid = req.body.blogid;
    const baslik = req.body.baslik;
    const altbaslik = req.body.altbaslik;
    const aciklama = req.body.aciklama;
    const kategoriIds = req.body.categories;
    let resim = req.body.resim;

    if(req.file) {
        resim = req.file.filename;

        fs.unlink("./public/images/" + req.body.resim, err => {
            console.log(err);
        });
    }

    const anasayfa = req.body.anasayfa == "on" ? 1 : 0;
    const onay = req.body.onay == "on" ? 1 : 0;
   //const kategoriid = req.body.kategori;

    try {
        const blog = await Blog.findOne({
            where: {
                id: blogid
            },
            include: {
                model: Category,
                attributes: ["id"]
            }
        });
        if(blog) {
            blog.baslik = baslik;
            blog.altbaslik = altbaslik;
            blog.aciklama = aciklama;
            blog.resim = resim;
            blog.anasayfa = anasayfa;
            blog.onay = onay;
            //blog.categoryId = kategoriid;

            if(kategoriIds == undefined){
                await blog.removeCategories(blog.categories); //hic bir kategori seçili değilse blog içinden gelen categories leri ilgili blog ile ilişkilendirmesini sil
            }//removeCategories tek bir obje üzerinden çağrılan bir  meethod, veri tabanından silmiyoruz.
            else {
                await blog.removeCategories(blog.categories);//blog category varsa silelim
                const selectedCategories = await Category.findAll({
                    where: {
                        //category tablosundan id'ye göre kategori seçicem ve o blog ile ilişkilendiricem. çünkü mevcut blog un bütün kategorilerini sildim, herhangi ilişki yok
                        id: {
                            //select * from catefory where IN (1,2,3)
                            [Op.in]: kategoriIds
                        }
                    }
                });
                //blog üzerine addCategories diyerek kullanıcının seçtiği
                //selectedCategories ilişkilendir
                await blog.addCategories(selectedCategories);
            }
            await blog.save();
            return res.redirect("/admin/blogs?action=edit&blogid=" + blogid);
        }
        res.redirect("/admin/blogs");
    }
    catch(err) {
        console.log(err);
    }
}

exports.get_category_remove = async function(req, res){
    const blogid = req.body.blogid;
    const categoryid = req.body.categoryid;
    //klasik sql sorgusu ile
    await sequelize.query(`delete from blogCategories where blogId=${blogid} and categoryid=${categoryid}`);
    res.redirect("/admin/categories" + categoryid);

}

//blog yükleip sayfaya yükleyebiliriz
exports.get_category_edit =  async function(req, res) {
    const categoryid = req.params.categoryid;

    try {
        const category = await Category.findByPk(categoryid);
        const blog = await category.getBlogs();//getBlogs() hazır oluşturulur.
        //1 numaralı  category donerse  1 numaralı id bilgileri döner
        const countBlog = await category.countBlogs(); //blogların sayısı
        //lazy loading
        if(category) {
            return res.render("admin/category-edit", {
                title: category.dataValues.name,
                category: category.dataValues,
                blogs: blog,
                countBlog: countBlog
            });
        }

        res.redirect("admin/categories");
    }
    catch(err) {
        console.log(err);
    }
}

exports.post_category_edit = async function(req, res) {
    // const categoryid = req.body.categoryid;
    // const name = req.body.name;

    // try {
    //     await db.execute("UPDATE category SET name=? where categoryid=?", [name, categoryid]);
    //     res.redirect("/admin/categories?action=edit&categoryid=" + categoryid);
    // }
    // catch(err) {
    //     console.log(err);
    // }
    const categoryid = req.body.categoryid;
    const name = req.body.name;

    try {
        await Category.update({ name: name }, {
            where: {
              id: categoryid
            }
        });
        return res.redirect("/admin/categories?action=edit&categoryid=" + categoryid);
    }    
    catch(err) {
        console.log(err);
    }
}

exports.get_blogs = async function(req, res) {
    try {
        // const [blogs,] = await db.execute("select blogid, baslik, altbaslik, resim from blog");
        const blogs = await Blog.findAll({ attributes: ["id","baslik","altbaslik","resim"],
            include: {//Category tablosunda name alanı alırız.
                model: Category,
                attributes: ['name'] //id almadık sadece name alanı gelcek

            }
        });
        res.render("admin/blog-list", {
            title: "blog list",
            blogs: blogs,
            action: req.query.action,
            blogid: req.query.blogid
        });
    }
    catch(err) {
        console.log(err);
    }
}

exports.get_categories = async function(req, res) {
    try {
        const categories = await Category.findAll();

        res.render("admin/category-list", {
            title: "blog list",
            categories: categories,
            action: req.query.action,
            categoryid: req.query.categoryid
        });
    }
    catch(err) {
        console.log(err);
    }
}


