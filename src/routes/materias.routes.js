import {Router} from 'express'
import pool from '../database.js'

const router = Router();

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
export default router;