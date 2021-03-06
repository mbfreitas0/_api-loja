const express = require('express');
var cors = require('cors');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const productRoute = require('./routes/product-route');
const categoryRoute = require('./routes/category-route');
const orderRoute = require('./routes/order-route');
const userRoute = require('./routes/user-route');
const imageRoute  = require('./routes/image-route');

//app.use(morgan('dev'));
//app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({ extended: true }));  // apenas dados simples
app.use(express.json()); // json de entrada no body */

app.use(cors());

app.use( (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }
    next();
}); 

app.listen(3001, () => {
    console.log('CORS-enabled web server listening on port 3000')
  })

 

app.use('/products', productRoute);
//app.use('/categories', categoryRoute);
//app.use('/orders', orderRoute);
app.use('/users', userRoute);
//app.use('/images', imageRoute);


app.use((req, res, next) => {
    const erro = new Error('Não encontrado');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    });
});

module.exports = app;