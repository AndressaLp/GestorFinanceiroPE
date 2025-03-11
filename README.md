# Sistema de Gestão para Autônomos

## Visão Geral
Uma plataforma de gestão simples para pequenas empresas e autônomos organizarem seus serviços, permitindo o cadastro de clientes, registro de serviços prestados e geração de relatórios com gráficos estatísticos.

## Principais Funcionalidades
- Login e cadastro
- Gerenciamento de clientes
- Gerenciamento de serviços
- Relatório mensal
- Gráfico estatístico

## Tecnologias
- **Front-end**: React.js e TailwindCSS
- **Back-end**: C# com ASP.NET Core
- **Banco de dados**: MySQL

### Outros
- **Autenticação**: JWT
- **Arquitetura**: Monolítica
- **API**: RESTful
- **TDD**: xUnit e Moq
- **Deploy**: Render (back-end), Railway (banco de dados), Vercel ou Render (front-end)
- **CI/CD**: Github Actions

## Requisitos Funcionais
1. O usuário deve conseguir se cadastrar e realizar login com autenticação segura.
2. Deve ser possível recuperar e redefinir senha.
3. A tela inicial deve exibir um resumo geral dos serviços e clientes cadastrados, incluindo um gráfico do mês atual.
4. O sistema deve permitir gerenciar clientes (cadastrar, listar, editar e excluir).
5. O sistema deve permitir gerenciar os serviços prestados (cadastrar, listar, editar e excluir).
6. O relatório mensal deve exibir um resumo das atividades, incluindo um gráfico estatístico.
7. Deve haver uma funcionalidade de busca para localizar clientes e serviços cadastrados.
8. O usuário poderá filtrar os serviços cadastrados.
9. O sistema deve permitir que o usuário configure sua conta.

## Requisitos Não Funcionais
1. O sistema deve ser responsivo e funcionar corretamente em dispositivos móveis e desktops.
2. A interface do sistema deve ser simples, intuitiva e fácil de usar.
3. A autenticação deve ser segura, utilizando JWT para controle de acesso.
4. O tempo de carregamento das páginas não deve ultrapassar 3 segundos.
5. O sistema deve seguir as diretrizes de acessibilidade da web (WCAG).
6. O sistema deve realizar backups diários para evitar perda de dados.
7. O sistema deve lidar com erros de forma adequada e fornecer mensagens informativas aos usuários.
8. O código do sistema deve seguir os princípios da arquitetura monolítica.
9. O sistema deve ser compatível com os principais navegadores web.
10. O sistema deve possuir testes automatizados para garantir a qualidade do código.

## Estratégias de Desenvolvimento
- **TDD**: Serão implementados testes unitários para garantir a qualidade do código desde o início.
- **Clean code e boas práticas**: O código será estruturado seguindo as boas práticas para maior legibilidade e manutenção.
- **Versionamento com Git/Github**: Controle de versões para rastrear mudanças.
- **CI/CD**: Garantirá a entrega rápida e segura de novas funcionalidades.

## Tipo de Arquitetura: Monolítica
- Implementação simples.
- Adequada para projetos pequenos.
- Facilidade de deploy.

## Tecnologias Escolhidas (Justificativas)
- **React.js**: Eficiente para a criação de interfaces de usuário dinâmicas e interativas.
- **TailwindCSS**: Permite o desenvolvimento rápido de interfaces responsivas e personalizadas.
- **C#**: Linguagem de programação versátil, com forte tipagem e excelente desempenho.
- **ASP.NET Core**: Framework web moderno e multiplataforma, ideal para a criação de APIs RESTful e aplicações web escaláveis.
- **MySQL**: Banco de dados relacional popular, confiável e de código aberto. Adequado para projetos pequenos, com bom desempenho e facilidade de uso.
- **JWT**: Garante a segurança e a integridade das informações transmitidas entre o front-end e o back-end.
- **API RESTful**: O front-end pode consumir os dados via chamadas HTTP, simplificando a comunicação entre sistemas.
- **xUnit**: Framework moderno e eficiente para testes automatizados no .NET Core.
- **Moq**: Biblioteca para mocking, permitindo testar serviços isoladamente.
- **Render**: Plataforma de hospedagem em nuvem que facilita a implantação de aplicações web e APIs.
- **Railway**: Plataforma de hospedagem de banco de dados em nuvem, simples e eficiente.
- **Vercel**: Plataformas de hospedagem em nuvem para aplicações front-end, com excelente desempenho e facilidade de uso.
- **Github Actions**: Plataforma de automação do GitHub que permite a criação de fluxos de trabalho para CI/CD. Facilita a integração e a entrega contínua de novas funcionalidades.

## Plano de Trabalho

### 1. PLANEJAMENTO
1. **Definição do projeto**:
   - Objetivos
   - Funcionalidades
   - Tecnologias
2. **Levantamento de requisitos**:
   - Requisitos funcionais
   - Requisitos não funcionais
3. **Configuração do ambiente**:
   - Criar repositório no Github
   - Criar README com descrição do projeto
   - Configurar o ambiente de desenvolvimento

### 2. DESIGN
1. **Estilo**:
   - Definir cores, fontes, etc.
2. **Protótipo**:
   - Criar as telas do projeto

### 3. DESENVOLVIMENTO
1. **Banco de dados**:
   - Modelagem e criação do DER
   - Criar tabelas no MySQL
2. **Back-end**:
   - Criar conexão com o banco de dados
   - Criar as classes de Domínio que representam as tabelas
   - Criar as classes de Repositório que contêm os métodos
   - Criar as classes de Serviço para a lógica de negócios
   - Criar as classes do Controlador para os Endpoints da API
   - Implementar autenticação JWT
3. **Front-end**:
   - Criar a estrutura
   - Desenvolver as telas
   - Integrar com a API

### 4. TESTES
1. **Testes unitários**:
   - Criar testes unitários para back-end
2. **Testes de integração**:
   - Testar a integração entre o front-end e a API
   - Testar a integração entre back-end e MySQL
3. **Testes funcionais**:
   - Testar fluxo completo do sistema
4. **Testes de segurança**:
   - Testar autenticação JWT e proteção de dados

### 5. IMPLANTAÇÃO
1. **Deploy do Back-end**:
   - Publicar API no Render
2. **Deploy do Front-end**:
   - Publicar o front-end no Vercel ou Render
3. **Configuração do Banco de Dados**:
   - Configurar o banco de dados no Railway
4. **Configuração CI/CD**:
   - Automatizar build e deploy

### 6. MANUTENÇÃO
1. **Monitoramento**:
   - Monitorar o desempenho do sistema e identificar possíveis problemas
2. **Correção de bugs**:
   - Corrigir bugs e otimizar o código
3. **Backup**:
   - Realizar backup do banco de dados
