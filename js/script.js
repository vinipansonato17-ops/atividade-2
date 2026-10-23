const formulario = document.getElementById('formulario');
const mensagem = document.getElementById('mensagem');
const resultado = document.getElementById('resultado');
const botao = document.getElementById('buscar');

async function buscarCEP(valor) {
  resultado.hidden = true;
  mensagem.textContent = '';
  mensagem.className = '';
  botao.disabled = true;
  try {
    const cep = valor.trim().replace(/^(\d{5})-(\d{3})$/, '$1$2');
    if (!/^\d{8}$/.test(cep)) {
      throw new Error('Digite um CEP válido com 8 números.');
    }
    mensagem.textContent = 'Buscando endereço...';
    const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    if (!resposta.ok) throw new Error('Não foi possível buscar o CEP. Tente novamente.');
    const dados = await resposta.json();
    if (dados.erro) throw new Error('CEP não encontrado. Confira os números e tente novamente.');
    document.getElementById('rua').textContent = dados.logradouro || 'Não informado';
    document.getElementById('bairro').textContent = dados.bairro || 'Não informado';
    document.getElementById('cidade').textContent = dados.localidade || 'Não informado';
    document.getElementById('estado').textContent = dados.uf || 'Não informado';
    resultado.hidden = false;
    mensagem.textContent = 'Endereço encontrado!';
  } catch (erro) {
    mensagem.className = 'erro';
    mensagem.textContent = erro instanceof TypeError || erro instanceof SyntaxError
      ? 'Não foi possível buscar o CEP. Verifique sua conexão e tente novamente.'
      : erro.message;
  } finally {
    botao.disabled = false;
  }
}

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();
  buscarCEP(document.getElementById('cep').value);
});
