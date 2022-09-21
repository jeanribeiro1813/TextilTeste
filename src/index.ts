import express , {Request, Response} from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import Person from './models/person'
import Pedido from './models/pedido'


const app = express();
app.use(express.json())
app.use(cors())

app.get('/',(req:Request, res:Response) => {
    res.send('Ola Mundo')
})

//ROTAS API CLIENTE / PERSON

//CREATE
app.post('/create', async (req:Request, res:Response) => {

    const {nome ,email,telefone, dt_nascimento , endereco,  complemento, bairro} = req.body

    const person = {
        nome ,email,telefone, dt_nascimento , endereco,  complemento, bairro
    }
    
    if(!person.nome){
        res.status(500).json({message:"Por Favor colocar o nome"})
    }
    try{

        const emailExist =  await Person.findOne({email})

        if(emailExist){
            res.status(409).json({message:'Email já existe , por favor verificar'})
        }

        const result = await Person.create(person)
        res.status(200).json({message:result})

    }catch(e){
        res.status(500).json({error:'Error: ', e})
    }

    })


//READ
app.get('/read', async (req:Request, res:Response) => {

    
    try{

        const pessoas = await Person.find()
        res.status(200).json({message:pessoas})

    }catch(e){
        res.status(500).json({error:'Error: ', e})
    }

    })


//UPDATE

app.put('/update/:id', async (req:Request, res:Response) => {

    const  id  = req.params.id

    const {nome ,email,telefone, dt_nascimento , endereco,  complemento, bairro} = req.body

    const person = {
        nome ,email,telefone, dt_nascimento , endereco,  complemento, bairro
    }

    try{

        const pessoas = await Person.updateOne({_id: id},person)
        res.json({message: person})

    }catch(e){
        res.status(500).json({error:'Error: ', e})
    }

    })


//DELETE
app.delete('/delete/:id', async (req:Request, res:Response) => {

    const id  = req.params.id

    try{       

        await Person.deleteOne({_id: id})
        res.json({message:"Deletado com sucesso"})
        

    }catch(e){
        res.status(500).json({error:'Error: ', e})
    }

    })



//ROTAS API PEDIDOS , PAREI AQUI CONTINUAR AMANHÃ

app.post('pedidos/create/', async (req:Request, res:Response) => {
    
    const {resumo_pedido} = req.body

    const pedido = {
        resumo_pedido,
        
    }
    
    if(!pedido.resumo_pedido){
        res.status(500).json({message:"Por Favor colocar o pedido"})
    }
    try{

        const user = await Pedido.findOne()
        const result = await Pedido.create(pedido)
        res.status(200).json({message:result})

    }catch(e){
        res.status(500).json({error:'Error: ', e})
    }

    })

app.get('pedidos/read', async (req:Request, res:Response) => {


    try{

        const pedidos = await Pedido.find()
        res.status(200).json({message:pedidos})

    }catch(e){
        res.status(500).json({error:'Error: ', e})
    }

    })



app.put('pedidos/update/:id', async (req:Request, res:Response) => {

    const  id  = req.params.id

    const {resumo_pedido} = req.body

    const pedido = {
        resumo_pedido,
    }

    try{

        const pedidos = await Pedido.updateOne({_id: id},pedido)
        res.json({message: pedidos})

    }catch(e){
        res.status(500).json({error:'Error: ', e})
    }

    })


//DELETE
app.delete('pedidos/delete/:id', async (req:Request, res:Response) => {

    const id  = req.params.id

    try{       

        await Pedido.deleteOne({_id: id})
        res.json({message:"Deletado com sucesso"})
        

    }catch(e){
        res.status(500).json({error:'Error: ', e})
    }

    })

    
    
    

mongoose.connect('mongodb+srv://jeanribeiro1813:AwDMA3hU8UNgc2nN@cluster0.hnpj2tf.mongodb.net/bancoapi?retryWrites=true&w=majority')
.then(() =>{
    console.log('Conectando ao Mongo')
    app.listen(3000, function () {
        console.log('Porta 3000')
    })
})
.catch((err) => {
    console.log(err)
})
