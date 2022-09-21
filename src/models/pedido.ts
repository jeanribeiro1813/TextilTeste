import mongoose, {model, Schema} from 'mongoose';

const Pedido = new Schema({

    resumo_pedido:String,
    dt_cadastro:{
        type: Date,
        default: Date.now,
        required: true
    }
});

export default model('Pedido',Pedido);

