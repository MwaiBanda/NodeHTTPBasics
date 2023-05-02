const express = require('express')
const app = express()

import morgan from 'morgan'
import mongoose from 'mongoose'

// register view engine
app.set('view engine', 'ejs')

app.listen(3000)
app.use(express.static('public'));

app.get('/', (req, res) => {
//   res.render('./views/index.ejs', { root: __dirname})
    const blogs = [
      {title: "The Begining Of The End", snippet: "A fictional story on the begining of the end of the world"},
      {title: "To Start You Have To Stop", snippet: "A suspense filled dramatic comedy on everyday life"}

    ]
    res.render('index', {blogs})
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/blogs/create', (req, res) => {
  res.render('create')
})
// redirects
app.get("/about-us", (req, res) => {
  res.redirect('/about')
})

// 404 page
app.use((req, res) => {
    res.status(404).render('404')
})