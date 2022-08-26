const http = require('http')
const fs = require('fs')
const url = require('url')
const slugify = require('slugify') //lowee 
const replaceTemplate = require('./modules/replaceTemplate.func')

//Api 
const API = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const ObjectAPI = JSON.parse(API)

//templates
const overview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8')
const figure = fs.readFileSync(`${__dirname}/templates/figures.html`, 'utf-8')
const producttem = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8')


//server
const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true)

    //overview
    if (pathname === '/' || req.url === '/overview') {

        res.writeHead(200, { 'Content-Type': 'text/html' })
        const cardsHTML = ObjectAPI.map(item => replaceTemplate(figure, item)).join('')
        const Output = overview.replace('{%FiGURE%}', cardsHTML)
        res.end(Output)
    }

    //product
    else if (pathname === '/product') {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        const product = ObjectAPI[query.id]
        if (query.id > ObjectAPI.length) {
            res.end('<h1>Product not found</h1>')
        } else {
            const output = replaceTemplate(producttem, product)
            res.end(output)
        }
    }

    //API
    else if (pathname === '/api') {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(API)
    }

    //not found
    else {
        res.writeHead(404, {
            'Content-Type': 'text/html'
        })
        res.end('<h1>Page not found</h1>')
    }
})

//server listen
server.listen(3000, () => {
    console.log('Listening on port 3000')
})