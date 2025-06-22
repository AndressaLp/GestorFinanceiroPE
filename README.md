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
8. O usuário poderá filtrar os serviços por preço e por ordem de cadastro.
9. O usuário poderá filtrar os clientes por ordem alfabética e por ordem de cadastro.
10. O sistema deve permitir que o usuário configure sua conta(editar ou excluir).

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
