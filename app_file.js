const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

app.set('views', './views_file');
app.set('view engine', 'jade');
app.locals.pretty = true;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  });

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/topic/new', (req, res) => {
    fs.readdir('data', (err, files) => {
        if(err){
            console.log(err);
            res.status(500).send('통신 에러 발생 하였습니다.');
        }
    res.render('new', {topics:files})
    });
  });

app.get(['/topic', '/topic/:id'], (req, res) => {
    fs.readdir('data', (err, files) => {
        if(err){
            console.log(err);
            res.status(500).send('통신 에러 발생 하였습니다.');
        }
        var id = req.params.id;
        if(id){
        //id 값이 있을때 접근
        fs.readFile('data/' + id, 'utf8', (err, data)=>{
            if(err){
                console.log(err);
                res.status(500).send('통신 에러 발생 하였습니다.');
            };
            res.render('view', {topics:files, title:id, dec:data});
        });
        //id값이 없을때 접근
    } else {
        res.render('view', {topics:files, title:'welcome!', dec:'hello!'})
    };
});
});

app.post('/topic', (req, res) => {
    var title = req.body.title;
    var dec = req.body.dec;
    fs.writeFile('data/' + title, dec, (err) => {
        if(err){
            res.status(500).send('통신 에러 발생 하였습니다.');
        };
        res.send("성공!");
    });
  });