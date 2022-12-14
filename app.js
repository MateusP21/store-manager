const express = require('express');
require('express-async-errors');
const errorHandlerMiddleware = require('./middlewares/errorHandlerMiddleware');
const productRoutes = require('./routes/productRoutes');
const saleRoutes = require('./routes/saleRoutes');

const app = express();
app.use(express.json());

app.use('/products', productRoutes);
app.use('/sales', saleRoutes);

app.use(errorHandlerMiddleware);
// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// app.use(errorHandler);
// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação
module.exports = app;
