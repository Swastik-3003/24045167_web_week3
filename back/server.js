const dotenv = require('dotenv');
dotenv.config();
const mongoose  = require('mongoose');
const express =require('express');

const app = express();
const url = process.env.URL;
const port = process.env.PORT;
const userNa = process.env.MYMAIL;
const pass = process.env.PASS;


const nodemailer = require('nodemailer');
//for mailing
const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.MYMAIL,
        pass:process.env.PASS
    }
});

const cors = require('cors');

const fs = require('fs');

//importing models
const User_model = require('./models/Users.js');
const Snip_model = require('./models/Snippets.js');

const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        ;        
        console.log('Success');
        console.log(userNa);
        console.log(process.env.PASS);
    }
    catch(error){
        console.error('Failure\n ', error );
    }
};
connectDB();

app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}));
app.use(express.json());

//login verification 
app.get('/api/users/:user/:pass', (req,res)=>{
    const u = req.params.user;
    const p = req.params.pass;
    User_model.find({ user: u, pass: p})
        .then(users =>{
            if(users.length === 0){
                return res.status(404).send('user not found');
            }   
            console.log(users);
            return res.json(users);
        })
        .catch(err =>{
            return res.status(500).send('internal server error');
        })
});
//upon success snip extraction
app.get('/api/:user/home', (req,res) => {
    console.log('pass');
    const u = req.params.user;
    
    Snip_model.find({ user: u})
        .then(s => {
           
            return res.json(s);
        })
        .catch(err => {
            return res.status(500).send('internal server errror');
        })
});

//delete snippet
app.delete('/api/:id', (req,res)=>{
 
    const id = req.params.id;

    Snip_model.findOneAndDelete({ _id: id})
        .then(resp =>{
            return res.status(200).json(resp);
        })
        .catch(err => {
            return res.status(500).json(err);
        })
});
//delete group
app.delete('/api/:user/:group',(req,res)=>{
    const u = req.params.user;
    const g = req.params.group;
   
    Snip_model.deleteMany({ user:u, groupName:g })
        .then(resp =>{
            return res.status(200).json(resp);
        })
        .catch(err =>{
            return res.status(500).json(err);
        })
});
//update snippets
app.put('/api/:id', (req,res)=>{
    const id = req.params.id;
    const c = req.body.code;
    const t = req.body.title;
    const l = req.body.language;
    Snip_model.findOneAndUpdate({_id:id},{$set:{code:c,language:l,title:t}})
        .then(resp =>{
            return res.status(200).json(resp);
        })
        .catch(err => {
            return res.status(500).json(err);
        })
});
//download snippets
app.get('/api/download/:id',async(req,res) => {

    const id = req.params.id;
    try{
    const snip = await Snip_model.findById(id);
    if(!snip){
        return res.status(404).json({Error:'Not Found'});
    }

    res.setHeader('Content-Type','text/plain');
    res.setHeader('Content-Disposition',`attachment; filename="${snip.title}_${snip.language}.txt"`);
    return res.send(snip.code);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Internal Server Error');
    }
});
//new User
app.post('/api/signup', async (req,res)=>{
    const u = req.body.user;
    const p = req.body.pass;
    const e = req.body.email;
    const n = {user:u,pass:p,email:e};
    try {
        const existing = await User_model.find({ user: u });
        console.log(existing);
        if (existing.length > 0) {
          return res.status(409).send('User already exists');
        }
    
        await User_model.create(n); 
        return res.status(200).send('User created');
    
      } catch (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }
})
//new Snippet 
app.post('/api/new/:user', async(req,res)=>{
    const u = req.params.user;
    const g = req.body.gp;
    const t = req.body.t;
    const l = req.body.l;
    Snip_model.create({user:u,groupName:g,title:t,code:'',language:l})
        .then(resp =>{
            
            return res.status(200).send('Created');
        })
        .catch(err =>  res.status(500).send('error'))
})
//Forgot User
app.post('/api/forgot',async(req,res)=>{
    const e = req.body.email;
    
    try{
        const user = await User_model.findOne({email:e});
        if(!user){
            return res.status(404).send('user does not exist');
        }
        console.log(user);
        
        const mailOptions = {
            from:process.env.MYMAIL,
            to:e,
            subject:'Password Recovery - Snippet Hub',
            text: 
`Hello ${user.user}, 


Your password is ${user.pass}

from,
Snippet - Hub`

        };
        await transporter.sendMail(mailOptions);

        res.status(200).send('Done');
    } catch(err){
        console.log(err);
        return res.status(500).send('Internal Server Error');
    }
});

app.listen(port,()=> console.log(`Server running on port ${port}`));


