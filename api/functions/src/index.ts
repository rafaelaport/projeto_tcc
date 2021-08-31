import * as admin from 'firebase-admin';

const serviceAccount = require("../src/config/projeto-tcc-209b6-firebase-adminsdk-w0uir-f6eefebd07.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

import * as functions from 'firebase-functions';
import * as express from 'express';

import {aparelhoController, historicoController} from './controller/exportControllers';
import { usuariocontroller } from './controller/usuario/usuarioController';

const cors = require('cors');

// APIS
let appApi = express();
let appAparelho = express();
let appHistorico = express();
let appUsuario = express();

appApi.use(cors());
appAparelho.use(cors());
appHistorico.use(cors());
appUsuario.use(cors());

// ROTA - API
appApi.get('/', function(req, res){
  res.send('API');
});

// ROTA - APARELHOS
appAparelho.get('/', async (req, res) => { res.json(await aparelhoController.consultarTodosAparelhos()) });
appAparelho.get('/por-usuario/:idUsuario', async (req, res) => { res.json(await aparelhoController.consultarAparelhosPorUsuario(req.params.idUsuario)) });
appAparelho.get('/:id', async (req, res) => { res.json(await aparelhoController.consultarAparelhoPorId(req.params.id)) });
appAparelho.post('/salvar', async (req, res) => { res.json(await aparelhoController.salvarAparelho(req.body)) });
appAparelho.put('/editar/:id', async (req, res) => { res.json(await aparelhoController.editarAparelho(req.params.id, req.body)) });
appAparelho.delete('/excluir/:id', async (req, res) => { res.json(await aparelhoController.excluirAparelho(req.params.id)) });

// ROTA - HISTORICOS 
appHistorico.get('/', async (req, res) => { res.json(await historicoController.consultarTodosHistoricos()) });
appHistorico.get('/por-aparelho/:idAparelho', async (req, res) => { res.json(await historicoController.consultarHistoricosPorAparelho(req.params.idAparelho)) });
appHistorico.get('/salvar/:idAparelho', async (req, res) => { res.json(await historicoController.salvarHistorico(req.params.idAparelho)) });

// ROTA - USUARIO
appUsuario.get('/:id', async (req, res) => { res.json(await usuariocontroller.consultarUsuarioPorId(req.params.id)) });

// EXPORTS APPS
exports.api = functions.https.onRequest(appApi);
exports.aparelho = functions.https.onRequest(appAparelho);
exports.historico = functions.https.onRequest(appHistorico);

