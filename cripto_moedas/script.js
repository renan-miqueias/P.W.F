function getByID(id) {
    return document.getElementById(id);
}

let botaoConsultar = getByID('botaoConsultar');
let botaoLimpar = getByID('botaoLimpar');
let botaoInverter = getByID('botaoInverter');

botaoConsultar.addEventListener('click', consultarPreco);
botaoLimpar.addEventListener('click', limparCampos);
botaoInverter.addEventListener('click', inverterMoedas);

async function consultarPreco() {
    let moedaBase = getByID('moedaBase').value.toUpperCase(); // Moeda base (ex.: BTC)
    let moedaConversao = getByID('moedaConversao').value.toUpperCase(); // Moeda de conversão (ex.: USDT)
    let resultado = getByID('resultado');
    
    // Validação de campos vazios
    if (!moedaBase || !moedaConversao) {
        resultado.innerHTML = 'Por favor, preencha os campos de moeda base e moeda de conversão.';
        return;
    }
    
    let url = `https://api.binance.com/api/v3/ticker/price?symbol=${moedaBase}${moedaConversao}`;
    
    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status} - ${response.statusText}`);
        }
        let json = await response.json();
        resultado.innerHTML = `
            <p><strong>Par de Moedas:</strong> ${json.symbol}</p>
            <p><strong>Preço:</strong> ${parseFloat(json.price).toFixed(2)} ${moedaConversao}</p>`;
    } catch (error) {
        resultado.innerHTML = 'Erro: ' + error.message;
    }
}

function limparCampos() {
    getByID('moedaBase').value = '';
    getByID('moedaConversao').value = '';
    getByID('resultado').innerHTML = '';
}

function inverterMoedas() {
    let moedaBase = getByID('moedaBase').value;
    let moedaConversao = getByID('moedaConversao').value;
    getByID('moedaBase').value = moedaConversao;
    getByID('moedaConversao').value = moedaBase;
}
