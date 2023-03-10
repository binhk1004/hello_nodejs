const express = require('express');
var bodyParser = require('body-parser');
//post 방식으로 데이터 전달 시, body에 있는 데이터를 바로 읽을수 없다.
//그렇기에 bodyParser라는 미들웨어를 사용한다.

const app = express();
const port = 3000;

app.set('view engine', 'jade');
//jade 템플릿을 사용하기 위해 연결
app.set('views', './views');
//jade 템플릿을 모아두는 폴더와 연결
app.locals.pretty = true;
//소스 미리보기 시 코드 이쁘게 정렬

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
//bodyParser 사용 시 body에 있는 데이터를 읽기 위해
//위와 같이 설정을 해준다.

app.get('/form', (req, res) => {
  res.render('form');
});

app.get('/form_receiver', (req, res) => {
  var title = req.query.title;
  var description = req.query.description;
  res.send(title +',' + description);
});

app.post('/form_receiver', (req, res) => {
  var title = req.body.title;
  var description = req.body.description;
  res.send(title +',' + description);
});

app.get('/topic/:id', function(req, res){
  //시멘틱 url을 쓰기 위해선 /:파라미터명 으로 한다.
  var topics = [
    'Javascript is....',
    'Nodejs is...',
    'Express is...'
  ];
  var output = `
  <a href="/topic/0">JavaScript</a><br>
  <a href="/topic/1">Nodejs</a><br>
  <a href="/topic/2">Express</a><br><br>
  ${topics[req.params.id]}
  `
  res.send(output);
})

app.get('/topic/:id/:mode', function(req, res){
  res.send(req.params.id +',' + req.params.mode)
})

app.get('/templates', (req, res) => {
  res.render('temp', {time: Date(),title: 'hello'});
  //위에서 jade와 템플릿을 모아드는 폴더를 연결했으므로,
  //렌더링할 페이지를 명명해줌(컨트롤러와 굉장히 유사)
  //변수의 값 혹은 객체를 전달할때는 {변수명 혹은 객체명 : } 으로 사용한다.
  //그리고 jade 템플릿에선 변수를 사용하면 된다.
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/route', (req, res) => {
  res.send('Hello Router! <img src="/test_movie_1.png">')
})

app.get('/dynamic', (req, res) => {
  var time = Date();
  var lis = '';
  for(var i = 0; i < 5; i++){
    lis = lis + '<li>coding</li>'
  }

  var output = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
  </head>
  <body>
      Hello Dynamic!
      <ul>
        ${lis}
      </ul>
      ${time}
  </body>
  </html>`
  res.send(output);
})

app.get('/login', (req, res) => {
    res.send('Login Please!')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})