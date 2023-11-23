import express from 'express';
import cors from "cors"
import multer from 'multer';
import mongoose from 'mongoose';
import {registerValidation, loginValidation, itemCreateValidation} from './validations.js';
import {ItemController, UserController} from './controllers/index.js';
import {checkAuth, handleValidationErrors} from './utils/index.js';






mongoose.connect(
    'mongodb+srv://admin:admin@cluster0.snzruoq.mongodb.net/items?retryWrites=true&w=majority')
    .then(()=> console.log('DB ok'))
    .catch((err)=> console.log('DB error', err));

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) =>{
        cb(null, 'uploads')
    },
    filename:(_, file, cb) =>{
        cb(null, file.originalname)
    },
})

const upload = multer({storage})

app.use(express.json())
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.post('/auth/login',  loginValidation, handleValidationErrors, UserController.login)

app.post('/auth/register', registerValidation,handleValidationErrors, UserController.register);

app.get('/auth/me', checkAuth, UserController.getMe)

app.post('/upload', checkAuth, upload.single('image'), (req, res) =>{
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});
app.get('/themes', ItemController.getLastThemes);
app.get('/items', ItemController.getAll);
app.get('/items/themes', ItemController.getLastThemes);
app.get('/items/:id', ItemController.getOne);
app.post('/items',checkAuth, itemCreateValidation, handleValidationErrors, ItemController.create);
app.delete('/items/:id',checkAuth, ItemController.remove);
app.patch('/items/:id', checkAuth, itemCreateValidation, handleValidationErrors, ItemController.update);

app.listen(4444, (err)=>{
    if (err){
        return console.log(err)
    }
    console.log("OK")
})