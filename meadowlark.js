var express = require("express");
//加上./是代表不去node_modules下去查找
var fortune = require("./lib/fortune");
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

//配置全局测试环境
app.use(function(req,res,next){
    res.locals.showTests = app.get("env") !== 'production' && req.query.test === '1';
    next();
});

//添加路由
app.get("/",function(req,res){
    res.render("home");
});
app.get("/about",function(req,res){
    res.render("about",{
        fortune:fortune.getFortune(),
        pageTestScript: '/qa/tests-about.js'
    });
});
app.get("/tours/hood-river",function(req,res){
    res.render("tours/hood-river");
});
app.get("/tours/request-group-rate",function(req,res){
    res.render("tours/request-group-rate");
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
});
