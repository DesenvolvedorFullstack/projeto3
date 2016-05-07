
Projeto com Directives e HTTP Server
===

O que são Directives?
----

Directives são marcadores que você pode colocar em elementos HTML fazendo
que o mesmo tenha o comportamento que você deseja configurar nele.

O AngularJS utiliza várias directives próprias, porém ele também possibilita que você crie
directivas customizadas, ou seja você pode criar suas próprias directives.

Exemplos de directives do AngularJS
---

~~~html
<input type="text" ng-model="exemplo" />
~~~

O ng-model é uma directive própria do AngularJS, com essa directive nós podemos utilizar o two-way databinding
assim como vimos em exemplos anteriores. Simplesmente escrevendo o trecho de código abaixo:

~~~text
{{exemplo}}
~~~
Criando minha própria directive
---

Agora vamos criar nossa própria directive. De uma forma bem simples para criar uma directive precisamos primeiro entender a nossa necessidade
vamos supor que você quer uma tag que passando apenas um objeto de pessoa, você consiga tem um layout padrão para os dados dessa pessoa como nome, idade e email.
Vamos criar uma directive que faça isso para nós.


Vamos criar um projeto chamado projeto3.Nesse projeto nós vamos
criar o arquivo main.js e também o index.html.

Lembrando que o nosso arquivo main, ficará da seguinte forma:

~~~javascript
//projeto3/main.js
var app = angular.module('Projeto3',[]);
app.controller('MinhaController', function($scope, $http) {
    //Objeto pessoa
    $scope.pessoa = {
          nome:"Nataniel",
          idade:25,
          email:"nataniel.paiva@gmail.com"
    };
});
~~~

Nesse arquivo criamos o nosso objeto chamado pessoa, nesse Objeto nós temos as propriedades nome, idade e email.
Agora eu simplesmente vou criar uma tag no html chamada <pessoa>

~~~html
<!--projeto3/index.html-->
<html ng-app="Projeto3">
    <head>
        <title>Directives</title>
    </head>
    <body ng-controller="MinhaController">
        <pessoa ng-model="pessoa"></pessoa>
        <script src="lib/angular.min.js"></script>
        <script src="main.js"></script>
    </body>
</html>
~~~

Essa tag que criamos acima não existe no HTML, porém ela será a nossa primeira directive,
vamos escrever ela no angular para que atenda nossa necessidade. Lembrando que a nossa necessidade é deixar um layout padrão
para o nossa tela de pessoas. Então para isso vamos criar uma pasta chamada directives, nessa pasta vamos configurar a nossa directive pessoa.
Dentro dessa pasta vamos criar o arquivo pessoa.js que ficará da seguinte forma:

~~~javascript
//projeto3/directives/pessoa.js
app.directive('pessoa', function() {
    return {
      templateUrl:'directives/pessoa.html',
      scope:{
        model:'=ngModel'
      }
    };
});
~~~

Nós estamos utilizando a mesma app do nosso módulo Projeto3 onde configuramos lá no main.js lembra?
Em nossa directive passamos apenas duas propriedades no retorno da nossa função, o templateUrl que é onde ficará o HTML padrão do nosso layout e a propriedade scope, que será exatamente o ng-model passado
para nossa directive.Fiz esse HTML simples para nosso template. Segue o código abaixo:


~~~html
<!-- projeto3/directives/pessoa.html -->
<table>
    <tr>
        <th>
            Nome
        </th>
        <th>
            Idade
        </th>
        <th>
            Email
        </th>
    </tr>
    <tr>
        <td>
            <!-- model é exatamente o objeto que for passado para a ng-model da nossa directive -->
            {{model.nome}}
        </td>
        <td>
            {{model.idade}}
        </td>
        <td>
            {{model.email}}
        </td>
    </tr>
</table>
~~~

HTTP Server
===

Para que você veja funcionando o exemplo de directive em seu código,
vamos criar um server com o NodeJS chamando o http-server(módulo do NodeJS). Para isso será necessário você instalar o NodeJS em usa máquina.
Para instalar o NodeJS em sua máquina veja as instruções a baixo:

Windows
---

Para instalar no windows basta ir no site https://nodejs.org/ e efetuar o download da versão 4.
Depois executar o programa e next, next...

Linux
---

Para a instalação no linux utilize os seguintes comandos

~~~text
sudo apt-get udpate
sudo apt-get install nodejs
~~~

Vamos instalar também um pacote do nodejs chamado npm, para isso utilizamos o seguinte comando:

~~~text
sudo apt-get install npm
~~~

Pronto! Agora vamos configurar o http-server em nosso projeto3, para isso vamos ter que executar
o seguinte comando:


~~~text
  sudo npm init
~~~

Esse comando vai lhe dar as seguintes opções:


~~~text
name(projeto3): Tecle Enter
version(1.0.0): Tecle Enter
description: Meu projeto com directive
entry point(main.js): Tecle Enter
test command: Deixe vazio
git repository: github.com/seunome
keywords:
author: Seu nome
license: (ISC) MIT

Depois será perguntado se deseja salvar o arquivo,
só clique enter se o default for sim.
~~~

Agora existe em sua pasta raiz um arquivo chamado package.json da seguinte forma:

~~~json
//projeto3/package.json
{
  "name": "projeto3",
  "version": "1.0.0",
  "description": "Meu projeto com directive",
  "main": "main.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/github.com/seunome.git"
  },
  "author": "Seu nome",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/github.com/seunome/issues"
  },
  "homepage": "https://github.com/github.com/seunome#readme"
}

~~~

Você vai alterar o arquivo para que fique assim:

~~~json
//projeto3/package.json
{
  "name": "projeto3",
  "version": "1.0.0",
  "description": "Meu projeto com directive",
  "main": "main.js",
  "devDependencies": {
    "http-server": "^0.6.1"
  },
  "scripts": {
    "prestart": "npm install",
    "start": "http-server -a localhost -p 8000 -c-1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/github.com/seunome.git"
  },
  "author": "Seu nome",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/github.com/seunome/issues"
  },
  "homepage": "https://github.com/github.com/seunome#readme"
}
~~~

Perceba que alteramos o seguinte:

~~~json

//Substituimos esse
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1"
}

//por esse
"scripts": {
  "start": "http-server -a localhost -p 8000 -c-1"
}

// e colocamos esse

"devDependencies": {
  "http-server": "^0.6.1"
}
~~~


~~~json

//Retiramos esse por não haver teste em nossa aplicação
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1"
}
~~~

~~~json
//Colocamos esse para rodarmos o nosso servidor
"scripts": {
  "start": "http-server -a localhost -p 8000 -c-1"
}
~~~

~~~json
//Colocamos eesse para que possamos utilizar o http-server
"devDependencies": {
  "http-server": "^0.6.1"
}
~~~

Nesse package.json nós configuramos o que nós utilizaremos em nosso projeto e também descrevemos o que de fato é o nosso projeto. Vou explicar mais detalhado sobre esse arquivo nos capítulos seguintes. Depois de criar esse arquivo vá na pasta raíz do seu projeto, ou seja dentro da pasta projeto3 e execute o seguinte comando:

Ubuntu
~~~text
sudo npm install
~~~
Windows
~~~text
npm install
~~~
Depois que você utiliza esse comando o mesmo cria uma pasta
na raíz do seu projeto chamada node_modules, repare que dentro dela
tem outra pasta chamada http-server que é a que utilizaremos para rodar nossa aplicação.

Para rodar a aplicação basta executar o seguinte comando:

Ubuntu
~~~text
 sudo npm start
~~~

Windows
~~~text
  npm start
~~~

Sua aplicação estará rodando na porta 8000. Para que você veja ela em execução basta ir no browser e acessar o endereço
http://localhost:8000

Pronto! Viu como sua aplicação está rodando e ainda com sua directive funcionando.
Você pode baixar o projeto3 pronto [aqui](https://github.com/DesenvolvedorFullstack/projeto3)..

Não deixe de fazer os excercícios, pois são muito importantes para o seu aprendizado.
