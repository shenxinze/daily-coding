var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var catgoryRouter = require('./routes/catgory');
const JWT = require('./utils/JWT');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));

// 校验token
app.use((req, res, next) => {
  if(req.url.includes('login')){
    next()
    return
  }
  // 前端传递token 需要添加 `Bearer token...`
  const token = req.headers['authorization']?.split(' ')[1]
  if(token){
    const payload = JWT.verify(token)
    if(payload){
      // 重新计算token过期时间
      const { _id, username } = payload
      const newToken = JWT.generate({_id, username}, '2h')
      res.header('Authorization', newToken)
      next()
    }else{
      res.status(401).send({ok: 0, msg: 'token 过期'})
    }
  }else{
    next()
  }
})

app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/', catgoryRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
