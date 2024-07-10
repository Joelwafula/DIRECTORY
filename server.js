const http = require("http");
const fs = require("fs");
const path = require("path")

const port =3000;
const baseDiectory = path.join(__dirname,'public');

const server = http.createServer((req,res)=>{
    console.log(`Request for ${req.url} has been received`);

    let filePath = path.join(baseDiectory, req.url ==='/' ? 'index.html' : req.url);
    fs.stat(filePath,(err,stats)=>{
        if(err){
            res.statusCode = 404;
            res.end(`file not found`);
            return
        }
        if(stats.isDirectory()){
            filePath = path.join(filePath,'index.html')
        }

        fs.readFile(filePath, (err,content)=>{
            if(err){
                res.statusCode = 500;
                res.end(`server error : ${err.code}`);
                return;
            }

            let ext = path.extname(filePath).toLowerCase();
            let contentType ='';

            switch(ext){
                case '.html':
                    contentType = 'text/html';
                    break;
                case '.js':
                    contentType = 'application/javascript';
                    break;
                case '.css':
                    contentType = 'text/css';
                    break;
                case '.json':
                    contentType = 'application/json';
                    break;
                case '.png':
                    contentType = 'image/png';
                    break;

                    default:
                        contentType = 'application/octet-stream';
            }
            res.writeHead(200, {'Content-Type' : contentType});
            res.end(content,'utf-8');
        })

    })
})