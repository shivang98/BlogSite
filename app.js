var bodyParser = require("body-parser"),
mongoose = require("mongoose"),
express = require("express"),
app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost/blog_site");

var blogSchema = mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title: "test post",
//     image: "https://www.w3schools.com/howto/img_fjords.jpg",
//     body: "This is a great post"
// }, function(err, blog){
//     if(err){
//         console.log(err);
//     } else{
//         console.log(blog);
//     }
// });

app.get('/', function(req,res){
    res.redirect('/blogs');
});

app.get('/blogs', function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        } else{
            res.render("index", {blogs: blogs});
        }
    });
});

app.post('/blogs', function(req, res){
    console.log(req.body.blog);
    Blog.create(req.body.blog, function(err, blog){
        if (err){
            res.render("new");
        } else{
            res.redirect("/blogs");
        }
    })
});

app.get('/blogs/new', function(req, res){
    res.render("new");
});

app.listen(3000, function(){
    console.log("BlogSite server up and running!");
});