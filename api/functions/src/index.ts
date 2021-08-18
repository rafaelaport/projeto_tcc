import * as admin from 'firebase-admin';

const serviceAccount = require("../src/config/projeto-tcc-209b6-firebase-adminsdk-w0uir-f6eefebd07.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

import * as functions from 'firebase-functions';
import * as express from 'express';

import {aparelhoController} from './controller/exportControllers';

// APIS
let appApi = express();
let appAparelhos = express();

// ROTA - API
appApi.get('/', function(req, res){
  res.send('API');
});

// ROTA - APARELHOS
appAparelhos.route('/')
  .get(async (req, res) => { res.json(await aparelhoController.consultarTodosAparelhos()) });

appAparelhos.get('/aparelhos-por-usuario/:idUsuario', async (req, res) => { res.json(await aparelhoController.consultarAparelhosPorUsuario(req.params.idUsuario)) });

appAparelhos.get('/:id', async (req, res) => { res.json(await aparelhoController.consultarAparelhoPorId(req.params.id)) });

// EXPORTS APPS
exports.api = functions.https.onRequest(appApi);
exports.aparelhos = functions.https.onRequest(appAparelhos);

