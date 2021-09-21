import * as admin from 'firebase-admin';

const serviceAccount = require("../src/config/projeto-tcc-209b6-firebase-adminsdk-w0uir-f6eefebd07.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

import {aparelhoController, historicoController} from './controller/exportControllers';
import { usuariocontroller } from './controller/usuario/usuarioController';
import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors';
//import * as cookieParser from 'cookie-parser';
//import * as csrf from 'csurf';
//import * as bodyParser from 'body-parser';


//const csrfMiddleware = csrf({ cookie: true });
const appApi = express();

appApi.engine("html", require("ejs").renderFile);
appApi.set("views",  __dirname.replace('\\api\\functions', '\\web'));
appApi.use(express.static("static"));

appApi.use(cors());
//appApi.use(bodyParser.json());
//appApi.use(cookieParser());
//appApi.use(csrfMiddleware);

/*appApi.all("*", (req, res, next) => {
  res.cookie("XSRF-TOKEN", req.csrfToken());
  next();
});*/

appApi.get("/login", function (req, res) {
  res.sendfile("../../web/pages/login.html");
});

/*appApi.get("/signup", function (req, res) {
  res.render("signup.html");
});

appApi.get("/profile", function (req, res) {
  const sessionCookie = req.cookies.session || "";

  console.log(sessionCookie)
  admin
    .auth()
    .verifySessionCookie(sessionCookie, true /** checkRevoked *//*)
   /* .then(() => {
      res.render("pages/profile.html");
    })
    .catch((error) => {
      res.render("pages/login.html");
    });
});

appApi.get("/", function (req, res) {
  res.render("index.html");
});*/

appApi.post("/sessionLogin", (req, res) => {
  
  const idToken = req.body.idToken.toString();
  const expiresIn = 300; // expira em 2 minutos

  admin
    .auth()
    .createSessionCookie(idToken, { expiresIn })
    .then(
      (sessionCookie) => {
        
        const options = { maxAge: expiresIn, httpOnly: true };
        res.cookie("session", sessionCookie, options);
        res.end(JSON.stringify({ status: "success" }));
      },
      (error) => {
        res.status(401).send("UNAUTHORIZED REQUEST!");
      }
    );
});

appApi.get("/sessionLogout", (req, res) => {

  res.clearCookie("session");
  res.redirect("http://localhost:5001/projeto-tcc-209b6/us-central1/api/login");
});

// ROTA - APARELHO
appApi.get('/aparelho', async (req, res) => { res.json(await aparelhoController.consultarTodosAparelhos()) });
appApi.get('/aparelho/por-usuario/:cpf_cnpj', async (req, res) => { res.json(await aparelhoController.consultarAparelhosPorUsuario(req.params.cpf_cnpj)) });
appApi.get('/aparelho/:id', async (req, res) => { res.json(await aparelhoController.consultarAparelhoPorId(req.params.id)) });
appApi.post('/aparelho/salvar', async (req, res) => { res.json(await aparelhoController.salvarAparelho(req.body)) });
appApi.put('/aparelho/editar/:id', async (req, res) => { res.json(await aparelhoController.editarAparelho(req.params.id, req.body)) });
appApi.put('/aparelho/desativar/:id', async (req, res) => { res.json(await aparelhoController.desativarAparelho(req.params.id)) });

// ROTA - HISTORICO 
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

