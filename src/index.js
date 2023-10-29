const app = require('./servidor');
const rota = require('./rotas');

app.use(rota);

app.listen(3000);