require('./Config/config');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.urlencoded({limit: '100mb', extended: false, parameterLimit:50000}));
app.use(bodyParser.json({limit: '100mb'}));

app.use(cors());

app.use(require('./Routes/index'));

mongoose.connect(process.env.URLDB,{
    useNewUrlParser: true,
    useUnifiedTopology: true
},
(err,res)=>{
    if (err) {
        console.log(err);
    }else{
        console.log('Base de datos conectada')
    }
})



app.listen(process.env.PORT, () => console.log(`listening on ${process.env.PORT}`));
