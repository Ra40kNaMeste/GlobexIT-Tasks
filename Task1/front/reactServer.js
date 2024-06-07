const http = require("http");
const fs = require("fs");
   
http.createServer(function(request, response){
       
    let filePath = "wwwroot/html/index.html";
    if(request.url.startsWith("/js/")){
        filePath = 'wwwroot' + request.url;
    }
    fs.readFile(filePath, function(error, data){
               
        if(error){
                   
            response.statusCode = 404;
            response.end("Resourse not found!");
        }   
        else{
            response.end(data);
        }
    });
     
}).listen(3001, function(){
    console.log("Server started at 3001");
});