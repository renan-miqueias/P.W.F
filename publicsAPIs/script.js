const dogApiKey = 'sua-chave-thedogapi'; // Insira sua chave de API da TheDogAPI
const catApiKey = 'sua-chave-thecatapi'; // Insira sua chave de API da TheCatAPI

// Função para obter uma imagem aleatória de cachorro
async function getRandomDog() {
    const url = 'https://dog.ceo/api/breeds/image/random';

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === 'success') {
            const dogImage = data.message;
            document.getElementById('random-dog-result').innerHTML = `
                <h3>Imagem de Cachorro Aleatório</h3>
                <img src="${dogImage}" alt="Cachorro Aleatório">
            `;
        } else {
            throw new Error('Erro ao obter a imagem do cachorro');
        }
    } catch (error) {
        document.getElementById('random-dog-result').innerHTML = 'Erro ao consultar imagem de cachorro.';
    }
}

// Função para obter informações aleatórias sobre gato
async function getRandomCat() {
    const url = 'https://api.thecatapi.com/v1/breeds';

    try {
        const response = await fetch(url, {
            headers: {
                'x-api-key': catApiKey
            }
        });
        const data = await response.json();

        if (data.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.length); // Seleção aleatória
            const breed = data[randomIndex]; // Seleção aleatória da raça

            document.getElementById('random-cat-result').innerHTML = `
                <h3>Raça Aleatória de Gato</h3>
                <p><strong>Nome:</strong> ${breed.name}</p>
                <p><strong>Origem:</strong> ${breed.origin}</p>
                <p><strong>Temperamento:</strong> ${breed.temperament}</p>
            `;
        } else {
            throw new Error('Erro ao obter informações da raça do gato');
        }
    } catch (error) {
        document.getElementById('random-cat-result').innerHTML = 'Erro ao consultar informações sobre gatos.';
    }
}
