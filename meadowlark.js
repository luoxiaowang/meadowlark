var express = require("express");
var app = express();

//设置handlebars视图引擎
//用main来作为默认布局main.handlebars
var handlebars = require("express3-handlebars").create({defaultLayout:'main'});
app.engine("handlebars",handlebars.engine);
app.set("view engine",'handlebars');


//环境变量要是设置了PORT，那么就用环境变量的PORT
//PORT=8080 node app.js
//supervisor
app.set("port",process.env.PORT || 3000);

//静态资源目录，放在路由前面
app.use(express.static(__dirname + '/public'));


var fortunes = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple.",
];


//添加路由
app.get("/",function(req,res){
    res.render("home");
});
app.get("/about",function(req,res){
    var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render("about",{fortune:randomFortune});
});

//404    app.use->中间件  没有路由器匹配将会执行的处理器   路由和中间件的顺序很重要
app.use(function(req,res){
    res.status("404");
    res.render("404");
});

//500   会根据参数个数区分404还是500
app.use(function(err,req,res,next){
    console.error(err.stack);
    res.status("500");
    res.render("500");
});

app.listen(app.get("port"),function(){
    console.log("Express started on http://localhost:" + app.get("port") + '; press Ctrl+c to terminate.');
})
