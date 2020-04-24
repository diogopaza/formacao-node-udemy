var http = require('http');

http.createServer((req,res)=>{
    if(req.url == '/'){
        res.end("to no /")
    }
    if(req.url == '/teste'){
        res.end("to no teste")
    }
}).listen(3000, ()=>{
    console.log("rodando")
})
    
/*
server.get("/teste", (req,res)=>{
    res.send("ouvindo")
})*/