const catApiKey = 'sua-chave-thecatapi'; // Insira sua chave de API da TheCatAPI
const dogApiKey = 'sua-chave-thedogapi'; // Insira sua chave de API da TheDogAPI

// Função para buscar informações sobre uma raça de gato específica
async function getCatByBreed(breedName) {
    const url = `https://api.thecatapi.com/v1/breeds/search?q=${breedName}`;

    try {
        const response = await fetch(url, {
            headers: {
                'x-api-key': catApiKey
            }
        });
        const data = await response.json();

        if (data.length > 0) {
            const breed = data[0]; // Seleciona a primeira raça que corresponde ao nome fornecido
            const imageUrl = breed.image?.url; // URL da imagem da raça do gato (caso exista)

            // Exibe a imagem e as informações da raça
            document.getElementById('cat-breed-result').innerHTML = `
                <h3>Informações sobre a Raça de Gato: ${breed.name}</h3>
                ${imageUrl ? `<img src="${imageUrl}" alt="Imagem da raça ${breed.name}" style="max-width: 300px; height: auto; border-radius: 8px; margin-top: 20px;">` : ''}
                <p><strong>Origem:</strong> ${breed.origin}</p>
                <p><strong>Temperamento:</strong> ${breed.temperament}</p>
                <p><strong>Descrição:</strong> ${breed.description}</p>
            `;
        } else {
            document.getElementById('cat-breed-result').innerHTML = 'Raça de gato não encontrada.';
        }
    } catch (error) {
        document.getElementById('cat-breed-result').innerHTML = 'Erro ao consultar informações sobre o gato.';
    }
}

// Função de busca da raça de gato
function searchCatBreed() {
    const breedName = document.getElementById('breed-name').value.trim().toLowerCase();

    // Tente buscar o nome da raça em inglês se o nome em português não funcionar
    const breedMapping = {
        "persa": "persian",
        "siamês": "siamese",
        "maine coon": "maine coon",
        "abissínio": "abyssinian",
        "ragdoll": "ragdoll",
        "sphynx": "sphynx",
        // Adicione mais mapeamentos conforme necessário
    };

    const breedNameInEnglish = breedMapping[breedName] || breedName; // Verifica se há um mapeamento, senão usa o nome digitado

    if (breedNameInEnglish) {
        getCatByBreed(breedNameInEnglish); // Chama a função para obter informações sobre a raça
    } else {
        alert('Por favor, insira o nome de uma raça válida.');
    }
}

// Função para buscar informações sobre uma raça de cachorro específica
async function getDogByBreed(breedName) {
    const url = `https://api.thedogapi.com/v1/breeds/search?q=${breedName}`;

    try {
        const response = await fetch(url, {
            headers: {
                'x-api-key': dogApiKey
            }
        });
        const data = await response.json();

        if (data.length > 0) {
            const breed = data[0]; // Seleciona a primeira raça que corresponde ao nome fornecido
            const imageUrl = breed.image?.url; // URL da imagem da raça do cachorro (caso exista)

            // Exibe a imagem e as informações da raça
            document.getElementById('dog-breed-result').innerHTML = `
                <h3>Informações sobre a Raça de Cachorro: ${breed.name}</h3>
                ${imageUrl ? `<img src="${imageUrl}" alt="Imagem da raça ${breed.name}" style="max-width: 300px; height: auto; border-radius: 8px; margin-top: 20px;">` : ''}
                <p><strong>Temperamento:</strong> ${breed.temperament}</p>
                <p><strong>Descrição:</strong> ${breed.description}</p>
            `;
        } else {
            document.getElementById('dog-breed-result').innerHTML = 'Raça de cachorro não encontrada.';
        }
    } catch (error) {
        document.getElementById('dog-breed-result').innerHTML = 'Erro ao consultar informações sobre o cachorro.';
    }
}

// Função de busca da raça de cachorro
function searchDogBreed() {
    const breedName = document.getElementById('dog-breed-name').value.trim().toLowerCase();

    if (breedName) {
        getDogByBreed(breedName); // Chama a função para obter informações sobre a raça
    } else {
        alert('Por favor, insira o nome de uma raça válida.');
    }
}

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
