import mongoose, {model, Schema} from 'mongoose';


const Person = new Schema({
    nome: String,
    email: String,
    telefone: Number,
    dt_nascimento: String,
    endereco: String,
    complemento: String,
    bairro: String,
    dt_cadastro:{
        type: Date,
        default: Date.now,
        required: true
    }
});

export default model('Person',Person);

