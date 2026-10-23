# Consulta de CEP — Atividade 2

Tema: consulta de endereços por CEP.

## Planejamento

| O que decidir | Minha escolha | Trecho de código relacionado |
| --- | --- | --- |
| API escolhida | ViaCEP | `fetch(`https://viacep.com.br/ws/${cep}/json/`)` |
| Dado que será buscado | Rua, bairro, cidade e estado | `const dados = await resposta.json()` |
| Elemento HTML que será atualizado | rua, bairro, cidade, estado e mensagem | `document.getElementById('rua').textContent = dados.logradouro` |
| Mensagem exibida em caso de erro | Não foi possível buscar o CEP. Verifique sua conexão e tente novamente. | `mensagem.textContent` no `catch` |

## Executar

Abra `index.html` no navegador com acesso à internet.

## Testes realizados

- CEP válido `01001000`: a API real retornou Praça da Sé, Sé, São Paulo, SP.
- CEP inexistente `00000000`: a API real retornou `erro: "true"`.
- Testes locais do JavaScript com DOM e respostas simulados: preenchimento do endereço, entrada inválida `123`, CEP inexistente e falha de rede. Os quatro passaram, incluindo limpeza do resultado anterior e reativação do botão.

## Publicar no GitHub Pages

No repositório, acesse Settings → Pages. Selecione Deploy from a branch, branch main e pasta / (root). Salve.
