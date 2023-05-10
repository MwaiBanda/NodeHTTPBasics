const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog =  require('./models/blogs')
const app = express()

// register view engine
app.set('view engine', 'ejs')
app.use(morgan('dev'))
app.use(express.static('public'));

const DB_URL = "mongodb+srv://mwaideveloper:playground@playground.zde6mdx.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(DB_URL)
.then(() => {
  app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
  })
})
.catch((err) => {
  console.log(err)
})



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

app.get('/blogs', (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('index', { blogs: result, title: 'All blogs' });
    })
    .catch(err => {
      console.log(err);
    });
});

app.post('/blogs', (req, res) => {
  // console.log(req.body);
  const blog = new Blog(req.body);

  blog.save()
    .then(result => {
      res.redirect('/blogs');
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/blogs/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(result => {
      res.render('details', { blog: result, title: 'Blog Details' });
    })
    .catch(err => {
      console.log(err);
    });
});

app.delete('/blogs/:id', (req, res) => {
  const id = req.params.id;
  
  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/blogs' });
    })
    .catch(err => {
      console.log(err);
    });
});


// 404 page
app.use((req, res) => {
    res.status(404).render('404')
})


