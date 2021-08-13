import { app, db } from "../index";

const recipienteCollection = 'recipiente';

app.get('/recipientes/:usuarioId', (req,res) => {

    const usuarioId = req.params.usuarioId; 

    db.collection(recipienteCollection).doc(usuarioId).get()
    .then(recipiente => {

        if(!recipiente.exists) throw new Error('Não foi encontrado recipientes para o usuário informado.');
        
        res.status(200).json({id:recipiente.id, data:recipiente.data()})})
    
    .catch(error => res.status(500).send(error));
        
});

app.get('/recipientes', async (req, res) => {
    try {
        const userQuerySnapshot = await db.collection(recipienteCollection).get();
        const users: any[] = [];
        userQuerySnapshot.forEach(
            (doc)=>{
                users.push({
                    id: doc.id,
                    data:doc.data()
            });
            }
        );
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send(error);
    }
});