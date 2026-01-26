## Descrição

Após 1 ano e 4 meses trabalhando como suporte, um dos maiores desafios que tive na área era o acompanhamento dos chamados que caíam na fila enquanto eu estava ocupado em outras tarefas, o que acabava ocasionando na demora para pegar o atendimento da fila e no aumento do nosso SLA de primeiro atendimento.

Com isso em vista, criei o AutoCatchChamados visando diminuir em 90% o tempo dos chamados do suporte na fila de atendimentos da plataforma [DeskManager](https://deskmanager.com.br/)

## Funcionalidades

  -  **Identificação por Imagem**: O Script identifica um novo chamado na tela por conta do status de "Novo" que é mostrado no canto superior direito do chamado.

 - **Verificação**: O sistema fica buscando um novo chamado a cada 2 segundos. Caso não encontre ele apenas tenta novamente.

  - **Catch** Quando um novo chamado for encontrado, o mouse é "transferido" ao chamado, onde o usuário deve clicar para que seja capturado o chamado

## Instalação
Você deve clonar o repositório 
  ```bash
 git clone https://github.com/DaviGauze/AutoCatchChamados.git
 ```
 e utilizar o comando
```bash 
python main.py 
``` 
ou o comando
```bash 
 pip run main.py
```
para rodar a aplicação e iniciar a busca por novos chamados

## Contribuição
Fico feliz em receber contribuições para o projeto! Para garantir que a colaboração seja eficaz e organizada, por favor, siga estes passos (e lembre de verificar com a liderança da sua organização se a utilização de uma aplicação como essa é permitida) 

### Como Contribuir

1. **Faça um Fork do Repositório**
   - Comece fazendo um fork deste repositório para a sua própria conta no GitHub.

2. **Clone o Repositório**
   - Clone seu fork localmente para o seu computador:
     ```bash
     git clone https://github.com/DaviGauze/AutoCatchChamados.git
     ```

3. **Crie uma Nova Branch**
   - Crie uma branch para sua nova feature ou correção:
     ```bash
     git checkout -b nome-da-sua-branch
     ```

4. **Faça suas Alterações**
   - Implemente as mudanças desejadas no código. Certifique-se de seguir o estilo de código e as convenções do projeto.

5. **Teste suas Alterações**
   - Teste suas alterações para garantir que tudo está funcionando conforme esperado.

6. **Faça Commit das Suas Alterações**
   - Adicione e faça commit das suas alterações:
     ```bash
     git add .
     git commit -m "Descrição clara das suas alterações"
     ```

7. **Envie a Branch para o GitHub**
   - Envie sua branch para o repositório remoto:
     ```bash
     git push origin nome-da-sua-branch
     ```

8. **Crie um Pull Request**
   - Acesse o repositório no GitHub e abra um Pull Request (PR) da sua branch para a branch principal do projeto. Descreva claramente o que foi alterado ou adicionado e porque.

### Diretrizes de Contribuição

- **Respeite o Código do Projeto**: Siga o estilo e as convenções de código estabelecidas no projeto.
- **Escreva Testes**: Se estiver adicionando uma nova funcionalidade, inclua testes para garantir que o código funcione conforme o esperado.
- **Documentação**: Atualize a documentação do projeto se suas alterações modificarem o comportamento ou a interface do usuário.
- **Comunicação**: Se estiver planejando uma grande mudança, considere abrir uma issue para discutir antes de começar a trabalhar nela.

### Problemas e Sugestões

Se você encontrar problemas ou tiver sugestões para o projeto, por favor, abra uma [issue](https://github.com/DaviGauze/AutoCatchChamados/issues) para que possamos discutir e resolver.

#### Obrigado por contribuir!
