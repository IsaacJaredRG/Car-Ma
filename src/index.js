import express from 'express'
import { engine } from 'express-handlebars'
import {join, dirname} from 'path'
import { fileURLToPath } from 'url'
import morgan from 'morgan'
import materiasRoutes from './routes/materias.routes.js'

//inicializacion
const app= express();
const __dirname = dirname (fileURLToPath(import.meta.url));
//settings
app.set('port', process.env.PORT || 9000 );
app.set('views', join(__dirname,'views'));
app.engine('.hbs', engine({
    defaultLayout:'main',
    layoutsDir: join(app.get('views'), 'layouts'),
    partialsDir: join(app.get('views'), 'partials'),
    extnames: '.hbs'
}));
app.set('view engine', '.hbs');

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
//routes
app.get('/',(req,res)=>{
    res.render('index')
})
app.use(materiasRoutes);
//public files
app.use(express.static(join(__dirname, 'public')));
app.use(express.static(join(__dirname, 'javascripts')));
//run server
app.listen(app.get('port'), ()=>
    console.log('server listening on port', app.get('port')));