const http = require("http")
const fs = require("fs")

const PORT = 3000

http
  .createServer((req, res) => {

    console.log('server works')
    const url =  req.url

    res.setHeader("Content-Type","text/html; charset=utf-8;")

    let indexTemplate = fs.readFileSync("./src/templates/index.html",{encoding:"utf-8",flag:"r"})
    let registerTemplate = fs.readFileSync("./src/templates/register.html",{encoding:"utf-8",flag:"r"})

    res.write(indexTemplate)
    res.end()



  })
  .listen(PORT)


  

