const http = require('http')
const fs = require('fs')
const lodash = require('lodash')

const server = http.createServer((req, res) => {

    // random numbers from loadash 
    const num = _.random(0, 20)
    console.log(`Random ${num}`)

    res.setHeader('Content-Type', 'text/html')
    let path = "./views/"

    // Run once
    const greet = _.once(() => {
      console.log('Greetings!')
    })

    greet()
    greet()

    switch(req.url) {
        case "/": path += "index.html"; res.statusCode = 200; break;
        case "/about": path += "about.html"; res.statusCode = 200; break;
        case "/about-us":
            res.statusCode = 301
            res.setHeader('Location', '/about')
            break
        default: path += "404.html"; res.statusCode = 404; break;
    }
    
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            res.write(data)
            res.end()
        }
    })
})

server.listen(3000, 'localhost', () => {
  console.log(`listening on port 3000`)
})