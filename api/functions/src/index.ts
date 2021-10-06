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

let appApi = express();

appApi.use(cors());

// ROTA - APARELHOS
appApi.get('/aparelho', async (req, res) => { res.json(await aparelhoController.consultarTodosAparelhos()) });
appApi.get('/aparelho/por-usuario/:cpf_cnpj', async (req, res) => { res.json(await aparelhoController.consultarAparelhosPorUsuario(req.params.cpf_cnpj)) });
appApi.get('/aparelho/:id', async (req, res) => { res.json(await aparelhoController.consultarAparelhoPorId(req.params.id)) });
appApi.post('/aparelho/salvar', async (req, res) => { res.json(await aparelhoController.salvarAparelho(req.body)) });
appApi.put('/aparelho/editar/:id', async (req, res) => { res.json(await aparelhoController.editarAparelho(req.params.id, req.body)) });
appApi.put('/aparelho/desativar/:id', async (req, res) => { res.json(await aparelhoController.desativarAparelho(req.params.id)) });

// ROTA - HISTORICOS 
appApi.get('/historico', async (req, res) => { res.json(await historicoController.consultarTodosHistoricos()) });
appApi.get('/historico/por-aparelho/:idAparelho', async (req, res) => { res.json(await historicoController.consultarHistoricosPorAparelho(req.params.idAparelho)) });
appApi.post('/historico/salvar/:idAparelho', async (req, res) => { res.json(await historicoController.salvarHistorico(req.params.idAparelho)) });
appApi.put('/historico/desativar/:idAparelho', async (req, res) => { res.json(await historicoController.desativarHistoricoPorAparelho(req.params.idAparelho)) });

// ROTA - USUARIO
appApi.get('/usuario/:id', async (req, res) => { res.json(await usuariocontroller.consultarUsuarioPorId(req.params.id)) });
appApi.get('/usuario/por-cpf-cnpj/:cpf_cnpj', async (req, res) => { res.json(await usuariocontroller.ConsultarUsuarioPorCpfCnpj(req.params.cpf_cnpj)) });
appApi.post('/usuario/salvar', async (req, res) => { res.json(await usuariocontroller.salvarUsuario(req.body)) });
appApi.put('/usuario/editar/:id', async (req, res) => { res.json(await usuariocontroller.editarUsuario(req.params.id, req.body)) });
appApi.put('/usuario/desativar/:id', async (req, res) => { res.json(await usuariocontroller.desativarUsuario(req.params.id)) });

// EXPORTS APPS
exports.api = functions.https.onRequest(appApi);

