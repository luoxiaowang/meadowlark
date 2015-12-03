var express = require("express");
var app = express();

//环境变量要是设置了PORT，那么就用环境变量的PORT
//PORT=8080 node app.js
//supervisor
app.set("port",process.env.PORT || 3000);

//添加路由
app.get("/",function(req,res){
    res.type("text/plain");
    res.send("Meadowlark Travel");
});
app.get("/about",function(req,res){
    res.type("text/plain");
    res.send("About Meadowlark Travel");
});

//404    app.use->中间件  没有路由器匹配将会执行的处理器   路由和中间件的顺序很重要
app.use(function(req,res){
    res.type("text/plain");
    res.status("404");
    res.send("404 - Not Found");
});

//500   会根据参数个数区分404还是500
app.use(function(err,req,res,next){
    console.error(err.stack);
    res.type("text/plain");
    res.status("500");
    res.send("500 - Server Error");
});

app.listen(app.get("port"),function(){
    console.log("Express started on http://localhost:" + app.get("port") + '; press Ctrl+c to terminate.');
})
