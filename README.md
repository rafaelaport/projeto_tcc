# Easier pH

---

![Wellington Fidelis](https://img.shields.io/badge/made%20by-Wellington%20Fidelis-5965e0)

![](https://img.shields.io/github/last-commit/WellingtonFidelis/projeto_tcc?color=rgb(89,101,224))

![](https://img.shields.io/github/contributors/WellingtonFidelis/projeto_tcc?color=rgb(89,101,224))

![](https://img.shields.io/badge/license-MIT-%2304D361?color=rgb(89,101,224))

<p align="center">
  <img src="./portifolio/home_1.png" />
</p>

# :pushpin: Tabela de conteúdos

* [Sobre o projeto](#satisfied-sobre-o-projeto)
* [Layout](#panda_face-layout)
* [Tecnologias](#snowflake-tecnologias)
* [Como rodar o projeto](#question-como-rodar-o-projeto)
* [Autor](#closed_book-autor)

---

# :satisfied: Sobre o projeto

Este projeto foi idealizado e construído para nosso TCC (Trabalho de conclusão de curso) de Engenharia da Computação.

Essa parte, visível pelos usuários e utilizada via web, é um dos componentes do projeto o outro é um dispositivo embarcado (algo como um dispositivo IOT) que realiza as medições do pH da água, a princípio focamos em medir o pH somente da água mas a ideia pode contemplar outros fluídos que precisem de um pH pré-estabelecido, e envia para um servidor e atráves desta aplicação web conseguimos gerenciar as medições.

## A aplicação web

A aplicação web agora tem duas versões, a primeira foi totalmente construída com HTML, Javascript, CSS e partes do ecossistema do Firebase (usamos o Firestore para o armazenamento dos dados em nuvem não relacional e o Cloud Functions como API para receber as gravações e consultas dos dados vindos pelo aplicativo web).

A versão dois foi construída com o framework Django baseado na linguagem python. Só que dessa vez o armazenamento está em SQLite, mas a ferramenta dispõe de opções para conexão com vários sistemas gerenciadores de banco de dados da atualidade.

## O dispositivo

O dispositivo ou aparelho, como chamamos neste projeto, é um hardware montado com uma placa de Arduino Uno, que nada mais é que um microcontrolador que permite criar soluções para uma gama enorme de problemas reais. Esse nosso aparelho possui um sensor para medição do potencial de hidrgênia na água, esse sensor possui um eletrodo que está conectado a um potenciômetro, que converte o valor potencial medido pelo eletrodo em unidade de pH. O aparelho possui também uma placa Wi-Fi que permite que o aparelho fique localizado em qualquer lugar que o sinal dos roteadores cheguem.

O cáculo da conversão, assim como as funcionalidades de conexão com a web via, foram programados utilizando o Arduino IDE e a linguagem C++.

## Usabilidade

A usabilidade, de forma bem simplista, trata-se de:

1. Configurações/cadastros dos proprietários dos aparelhos no sistema;
2. Cadastro dos aparelhos do proprietário;
3. Envio dos aparelhos para os proprietários;
4. Instalação dos aparelhos nos locais desejados pelos proprietários e que recebam o sinal do Wi-Fi;
5. Teste inicial de conexão e envio de dados;
6. O Propietário deve realizar o acesso na aplicação web e consultar as medições realizadas por cada aparelho.

---

# :panda_face: Layout

* [Bootstrap](https://getbootstrap.com/)

---

# :snowflake: Tecnologias

* [Python](https://www.python.org/)
* [Django](https://www.djangoproject.com/)
* [Ionicons](https://ionic.io/ionicons/)
* [FreePik](https://www.freepik.com/)
* [Docker](https://www.docker.com/)
* [Mermaid](https://mermaid.js.org/)

---

# :question: Como rodar o projeto

## Acessando direto pelo site

* Ainda não consegui deixar online. =/

## Rodando na máquina local

(certifique-se de ter instalado na sua máquina o [Docker](https://www.docker.com/) e o [Docker Compose](https://docs.docker.com/compose/install/))

1. Abra o terminal na pasta desejada para clonar o repositório e execute o comando:

``` bash
git clone https://github.com/WellingtonFidelis/projeto_tcc.git
```

1. Depois de concluído, execute os seguintes comandos para seguir para o caminho do app:

``` bash
cd projeto_tcc/
```

Para criar a imagem e deixar o app online:

``` bash
docker-compose up --build
```

Acessando o web app, abra o navegador e digite:

* <http://localhost:8000/>

---

# :closed_book: Autor

Idealizado e desenvolvido por [Rafaela Portugal](https://github.com/rafaelaport) & [Wellington Fidelis](https://github.com/WellingtonFidelis).
