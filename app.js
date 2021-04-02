const express = require('express');

//objeto de servidor
const app = express();

//informando local dos arquivos estáticos com middleware
app.use(express.static(__dirname + '/public'));


//rota principal
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html'); //envia o html da aplicação
})

app.listen(3000, () => {
    console.log('server running on port', 3000);
});

