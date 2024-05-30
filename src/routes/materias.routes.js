import {Router} from 'express'
import pool from '../database.js'
import session from 'express-session';


let queryResults = {};

const router = Router();

router.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
  }));

//renderizado de paginas pq sino no cargan a la bestia yo enojado
router.get('/preguntas',(req,res)=>{
    res.render('htmls/preguntas');
});

router.get('/AccionesAdmin',(req,res)=>{
    res.render('htmls/AccionesAdmin');
});
router.get('/gestion',(req,res)=>{
    res.render('htmls/gestion');
});
router.get('/Industrial',(req,res)=>{
    res.render('htmls/Industrial');
});
router.get('/Login',(req,res)=>{
    res.render('htmls/Login');
});
router.get('/logistica',(req,res)=>{
    res.render('htmls/logistica');
});
router.get('/mecatronica',(req,res)=>{
    res.render('htmls/mecatronica');
});
router.get('/TIcs',(req,res)=>{
    res.render('htmls/TIcs');
});

//cosas del add
router.get('/add',(req,res)=>{
    res.render('materias/add');
});

router.post('/add', async(req, res)=>{
    try{
        const {Nombre, Numero_creditos, Creditos_extra, Horario, Nombre_docente} = req.body;
        const newMateria = {
            Nombre, Numero_creditos, Creditos_extra, Horario, Nombre_docente
        }
        await pool.query('INSERT INTO materia SET ?', [newMateria]);
        res.redirect('/list');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

//cosas del list
router.get('/list', async(req,res)=>{
    try{
        const[result]= await pool.query('SELECT * FROM materia');
        res.render('materias/list',{materias:result});

    }
    catch(err){
      res.status(500).json({message:err.message});  
    }
})

//cosas del edit
router.get('/edit/:Id', async(req,res)=>{
    try{
        const {Id}=req.params;
        const [materia]=await pool.query('SELECT * FROM materia WHERE Id = ?',[Id]);
        const materiaEdit = materia[0];
        res.render('materias/edit', {materia: materiaEdit})
    }
    catch(err){
        res.status(500).json({message:err.message});  
    }
})

router.post('/edit/:Id', async(req,res)=>{
    try{
        const {Nombre, Numero_creditos, Creditos_extra, Horario, Nombre_docente} = req.body;
        const{Id}=req.params;
        const editMateria = {
            Nombre, Numero_creditos, Creditos_extra, Horario, Nombre_docente
        };
        await pool.query('UPDATE materia SET ? WHERE Id = ?', [editMateria, Id]);
        res.redirect('/list')
    }
    catch(err){
        res.status(500).json({message:err.message});  
    }
})

//cosas del delete
router.get('/delete/:Id', async(req, res)=>{
    try{
        const {Id} = req.params;
        await pool.query('DELETE FROM materia WHERE Id = ?', [Id]);
        res.redirect('/list');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});



//query para sacar losd atos mediante el nombre
router.get('/query', async (req, res) => {
    try {
      const { query } = req.query;
      console.log(`Parametro decodificados: ${query}`);
      const sql = `SELECT Nombre, Horario  FROM materia WHERE Nombre LIKE?`;
      console.log(sql);
      const [rows] = await pool.query(sql, [`%${query}%`]);
      console.log(JSON.stringify(rows, null, 2));
      console.log(req.session.queryData); // Print the current value of req.session.queryData
      req.session.queryData = rows; // Store the results in the user session
      res.json(rows); // Return a JSON response
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });

  router.post('/storeResponses', (req, res) => {
    const responses = req.body;
    console.log('Guardando respuestas en la sesion', responses); // Agrega esta línea para verificar que las respuestas se están recibiendo
    req.session.responses = responses;
    res.json({ message: 'Responses stored successfully' });
});



router.get('/MostrarMateria', (req, res) => {
    const data = req.session.responses || [];
    console.log('Cargando la pagina con las respuestas', data); // Agrega esta línea para verificar que los datos se están recuperando de la sesión
    res.render('htmls/mostrarMateriasYHorario', { materias: data });
});

//para pasar de mostrarMateria a horario
router.get('/queryHorario', async (req, res) => {
    try {
      const { query1, query2 } = req.query;
      console.log(`Parameters decoded: query1=${query1}, query2=${query2}`);
      
      // Consulta SQL simplificada para filtrar solo por nombre y horario
      const sql = `
        SELECT Nombre, Horario, Nombre_docente
        FROM materia
        WHERE Nombre LIKE ?
        AND Horario LIKE ?;
      `;
      const [rows] = await pool.query(sql, [`%${query1}%`, `%${query2}%`]);
      console.log(JSON.stringify(rows, null, 2));
      console.log(req.session.queryData);
      req.session.queryDataHorario = rows; // Store the results in the user session
      
      res.json(rows); // Return a JSON response with results
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });
  
  router.post('/storeHorario', (req, res) => {
    const responses = req.body;
    console.log('Saving Horario responses in session', responses); // Add this line to verify that responses are being received
    req.session.HorarioResponses = responses;
    res.json({ message: 'Horario responses stored successfully' });
  });
  
  router.get('/Horario', (req, res) => {
    const data = req.session.HorarioResponses || [];
    console.log('Loading page with horario responses', data); // Add this line to verify that data is being retrieved from session
    res.render('htmls/horario', { materias: data });
  });
  
export default router;