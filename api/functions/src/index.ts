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
  .get(async (req, res) => { res.json(await aparelhoController.consultarTodosAparelhos()) })

// EXPORTS APPS
exports.api = functions.https.onRequest(appApi);
exports.aparelhos = functions.https.onRequest(appAparelhos);

