require('dotenv').config();
const express = require("express");
const app = express();
const { dbConnection } = require('./database/config');
const cors = require('cors');

app.use(cors());
app.use( express.json() );
dbConnection();

app.listen(3000, ()=>{
    console.log("Server started !!!");
});


app.use("/api/autores", require('./routes/autor.router'));
app.use("/api/editoriales", require('./routes/editorial.router'));
app.use("/api/libros", require('./routes/libro.router'));