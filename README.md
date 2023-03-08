### Curso de Clean Code e Clean Architecture - Rodrigo Branas

Curso do Rodrigo Branas sobre Microservices com TypeScript e Clean Code, Refactoring, TDD, OO, Ports and Adapters, Clean Architecture, Domain-Driven Design, Design Patterns, SOLID, Event-Driven Architecture e CQRS.

<div>
    <img alt="Criado por Alcir Junior [Caju]" src="https://img.shields.io/badge/criado%20por-Alcir Junior [Caju]-%23f08700">
    <img alt="License" src="https://img.shields.io/badge/license-MIT-%23f08700">
</div>

<!-- --- -->

<!-- #### Telas do Sistema -->

<!-- <p align="center">
    <img alt="Tela 01" src="_images/image1.png" width="75%" style="margin: 15px 0" />
</p> -->

---

#### Descrição

Curso do Rodrigo Branas sobre Microservices com TypeScript e Clean Code, Refactoring, TDD, OO, Ports and Adapters, Clean Architecture, Domain-Driven Design, Design Patterns, SOLID, Event-Driven Architecture e CQRS.

---

#### Visualizar o projeto na IDE:

Para quem quiser visualizar o projeto na IDE clique no teclado a tecla `ponto`, esse recurso do GitHub é bem bacana

#### Aulas 01
Refactoring tem mais relação com a alteração feita na estrutura interna do software, para torná-lo mais fácil o entedimento e menos custoso se ser modificado.

Onde não é alterado o seu comportamento, mas sim o investimento para entregar o mesmo resultado de antes, melhor estruturado.

Para ter a segurança de refatorar um código, por onde começar?

- Tests Unitários;
    - Nosso teste simplesmente é um cliente para nosso código;
    - Para iniciar nossos testes aplicamos essas regras:
        - Given / Arrange
        - When / Act
        - Then / Assert
- Identificar Code Smells;
    - Nomes estranhos;
        - Renomear Funções;
        - Renomear Variáveis;
        - Renomear Arquivos;
    - Reduzir o tamanho vertical do código;
        - Remover Linhas em branco métodos e funções;
            - Linha em branco divide membros de classe, métodos, construtores, variáveis de instância, etc;
        - Remover Cometários;
            - Nomes de variáveis / funções explicativas;
            - Manter apenas quando necessário;
    - Remover código morto;
    - Muitas condições confusas, aninhadas, complexas, extensas;
        - Introduzir cláusula guarda;
        - Remover else;
        - Extrair condições;
        - Consolidar condições;
        - Inverter Condição;
        - Introduzir ternário;
    - Números mágicos;
        - Extrair constantes / váviaveis;
    - Tratamento inadequada de erros;
        Tratar erros de forma adequada;
    - Classe / Arquivo grande;
        - Extrair Classe;
#### Aulas 02
- Inveja de dados (longa cadeia de mensagens - Facade abstrai um subsistema mais complexo)
    - Extrair um método;
    - Mover um método para outra classe

#### SOLID Principles
- S
- O: Estar aberto para extensão e "fechado" para modificação
- L
- I
- D

#### SOLID Principles
Testes automatizados são a única forma que temos de garantir que o código funciona.

Entender o porque se teve tempo de contratar uma equie de QA, criar uma rotina de testes, criar um documento com fluxo de testes, porque não foi criado testes automatizados?

Testes manuais são importantes e sempre vão existir, mas sempre devem ser complementares.

O que é um teste automatizado?
- Dado um conjunto de entradas, quando algo acontecer a saída deve suprir as expectativas.
    - Given / Arrange: Definição de todas as informações necessárias para executar o comportamento que será testado;
    - When / Act: Executar o comportamento;
    - Then / Assert: Verificar o que aconteceu após a execução, comparando as informações retornadas com a expectativa que foi criada;

Alguns tipos de testes:
- E2E: Já são mais lentos e mais frágeis, pois se baseam em interfaces finais e interfaces sempre estão mudando.
- Integration: Testam recursos externos, são mais lentos e requer mais exforço de programação e já utilizam mais Tests Patterns como mocks, stubs e spyes.
- Unit: Testam comportamentos mais isolados, não lidam com recursos externos, não necessitam muito Tests Patterns como mocks, stubs e spyes.

Unit Tests: São testes de unidade, não becessáriamente unitários, que podem ou não envolver vários componentes pertencentes à mesma camanda e sem qualquer interação com recursos externos como um banco de dados, uma API ou sistema de arquivos.

Integration Tests: Testam componentes pertencentes à múltiplas camadas e normalmente envolvem recursos externos, sejam eles reais ou não, ou seja, o fato de utilizar um Test Pattern como Stub ou Mock não torna o teste de unidade.

E2E Tests: Replicam o ambiente do usuário final, ou seja, são testes executados de ponta a ponta.

FIRST:
- Fast: Os testes devem rodar rápido, assim podemos rodar mais vezes os testes.
- Independente: Não deve existir dependência entre os testes, eles devem poder ser executados de forma isolada.
- Repeatable: O resultado deve ser o mesmo indepentente da quantidade de vezes que seja executado.
- Self-validating: O próprio teste deve ter uma saída bem definida que é válida ou não fazendo que ele passe ou falhe, sempre o assert tem de confirmar todos cenários.
- Timely: Os testes devem ser escritos antes do código em produção.

TDD é um metodo para construir softwares e não para testá-lo que segue o fluxo:
- RED: Escreve um teste que falhe.
- GREEN: Escreve o código que faça o teste passar.
- Refactor: Refatorar o código escrito.

Como começar a testar, dê o primeiro passo, criar um exemplo que as pessoas possam usar como base, com isso passe pelos 5%, 15%, 25%, ... de coverage.

Foque no que tem mais risco e com o que muda com mais frequeência, automatize o que da mais retorno.

#### Aulas 03
Ports and Adapters - Arquitetura Hexagonal

Tornar a aplicação independente de quem guia a aplicação e de seus recursos.

Dividir a aplicação em :
- Drivers: Test Cases, Usuários, APIs, interface gráfica, CLI ou qualquer coisa que seja um Driver, algo que guia sua aplicação.
- Resources: database, SMTP server, File System entre outros.

Porque o nome é Hexagonal: simplemente um recurso visual para poder ter espaços para desenhar os diagramas.

Porque Porta?

A analogia com uma porta é exatamente a mesma que temos em quando pensamos em conectar qualquer tipo de dispositivo em um computador, existe um contrato com um protocolo definido onde qualquer fornecedor pode adaptar sua tecnologia para interagir com a porta.

Porque Adapters?

São simplesmente as implementações dos casos de usos dessa portas.

Faz sentido aplicar Ports and Adpters em qualquer contexto?

Sim, podemos aplicar em todos contextos, pois sempre consumimos recursos e somos guiados por mais de um Driver, como por exemplo Testes, APIs, etc.

No caso do recurso não é necessário ter mais de um, basta um pos queremos ter o controle desse recurso.

Tests Patterns

Um test double é um padrão que tem o objetivo de substituir um DOC (depended-on component) em um determinado tipo de teste por motivos de performance ou segurança.

- Dummy: Objetos que criamos apenas para completar a lista de parâmetros que precisamos passar para invocar um determinado método.
- Stubs: Objetos que retornam respostas prontas, definidas para um determinado teste, por questão de performance ou segurança (exemplo: quando eu executar o método fazer o pedido preciso que o método pegue a cotação do dolar retornando R$ 3,00).
- Spies: Objetos que espionam a execução e armazenam os resultados para a verificação posterior (exemplo: quando eu executar o método fazer pedido preciso saber se o método enviar email foi invocado internamente e com quais parâmetros).
- Mocks: Objetos similares a Stubs e Spies, permitem que você diga exatamente o que quer que ele faça, nós podemos programar o que será feito.
- Fake: Objetos que tem implementações que simulam o funcionamento da instância real, que seria utilizada em produção (exemplo: uma base de dados em memória).

#### Aulas 04
Talvez o nome Clean Design faça mais sentido que Clean Architecture.

Pois o Design está muito mais relacionado a responsabilidades e distribuição de responsabilidades.

Enquanto a Arquitetura traz mais conceitos sobre restrições que você impõe no projeto, exemplo, definição da linguagem de programação, paradigmas adotado, tipo de comunicação entre serviços, frameworks, etc...

Tudo isso são restições impostas que afetam o Design.

Douglas Martin: Design is inevitable, the alternative to good design is bad design, not no design at all.

O que considerar na hora de definir o Design e a Arquitetura de um Software?

- Escodo do produto; - Cada escopo tem suas especificidades;
- Quem é, e qual é o tamamnho da equipe; - O tamanho da equipe e a experiência define diretamente o direcionamento que irá seguir;
- Prazo de entrega; - Usa o que o time sabe, a ferramenta que tem o domínio;
- Tipo de dispositio;
- Volume de requisições;
- Orçamento;

Não se deve adotar o mesmo tipo de abordagem para tudo, mas é uma boa prática definir padrões e seguir.

Não existe um tipo de resposta que atenda sempre.

Nas últimas décadas, vários modelos infuenciaram o Design e a Arquitetura.

Um deles Ivar Jacobson (1992) BCE, EBI, EIC, ECB (Entity-control-boudary) é um padrão arquitetural usando um use-case dirigido a orientação a objeto no design de software.

- Entity representa uma informação relevante para os Stakeholders, usualmente persistente.
- Bondary é uma espécie de interface para quem está fora poder consumir.
- Control garante o preocessamento da execução do seu use-case, e sua regra de negócio coordenando a sequencia de objetos envolvidos.

Uma grande similaridade do Clean Architecture.

Ivar Jacbson: Iniciantes podem muitas vezes utlizar  Entities Objects como transportadores de dados e colocar as regras de negócio em si dentro do Control Object. Isso deve ser evitado. Muitos comportamentos deveriam e poderiam ser colocados nos objetos de entidades que são idependentes.

- Domain-Driven Design, Eric Evnas 2003
- Hexagonal Archtiecture ou Ports and Adapters, Alistair Cockburn 2005
- Onion Architecture, Jeff Palermo 2008

Todas elas tem coisas em comum:
- Isolam as regras de negócio;
- Definem camadas e suas responsabilidades;
- Criam um fluxo de controle e dependência ordenado e direcional;
- Favorecem a testabilidade;
- São independentes de recursos externos;
- Favorecem a evolução tecnológica;

Clean Architecture, Robert Martin 2012

É um modelo que tem como objetivo o desacoplamento entre as regras de ngócio, ou domínio da aplicação e os seus recursos externos como frameworks e banco de dados.

Entities - Entripise (Independence) Business Rules

Entidades são responsáveis por modelar as regras de negócio independentes, aplicadas em qualquer contexto e que podem ser desde um objeto com métodos até mesmo um conjunto de funções.

Como e onde usar?

Nos Use Cases - Application Business Rules

Na Clean Architecture, os casos de uso contém a aplicação das regras de ngócio idependente em um contexto específico.

Eles realizam a orquestração das entidades, executando regras de negócio independentes.

Geralmente é um verbo:
- Fazer um pedido;
- Cancelar um pedido;
- Simular o frete;
- Validar um cupom de desconto;
- Realizar um pagamento;
- Emitir uma nota fiscal.

Repare que os nomes dos casos de uso tem relação com a Screaming Architecture, dar o nome da Classe ou Arquivo ao Use-case.

Interface Adapters

Os Interfaces Adapters fazem a ponte entre os casos de uso e os recursos externos.

São responsáveis por realizar a conversão de dados de uma tecnologia.

Frameworks & Drivers

Por fim os frameworks and drivers são o nível mais baixo de abstração, é o componente que realiza a conexão com o banco de dados, requisições HTTP, interage com o sistema de arquivos ou acessa recursos do SO.

O fuxo de dependência é de fora para dentro.

#### Aulas 05
