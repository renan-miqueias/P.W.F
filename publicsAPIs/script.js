const dogApiKey = 'sua-chave-thedogapi'; // Insira sua chave de API da TheDogAPI
const catApiKey = 'sua-chave-thecatapi'; // Insira sua chave de API da TheCatAPI

// Função para obter uma imagem aleatória de cachorro
async function getRandomDog() {
    const url = `https://dog.ceo/api/breeds/image/random`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.status === 'success') {
            const dogImage = data.message;
            document.getElementById('random-dog-result').innerHTML = `<img src="${dogImage}" alt="Cachorro Aleatório">`;
        }
    } catch (error) {
        document.getElementById('random-dog-result').innerHTML = 'Erro ao consultar imagem de cachorro.';
    }
}

// Função para obter uma raça aleatória de gato com algumas informações
async function getRandomCat() {
    const url = `https://api.thecatapi.com/v1/breeds`;
    
    try {
        const response = await fetch(url, {
            headers: {
                'x-api-key': catApiKey
            }
        });
        const data = await response.json();
        
        if (data.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.length);
            const breed = data[randomIndex];
            
            const imgResponse = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breed.id}`, {
                headers: {
                    'x-api-key': catApiKey
                }
            });
            const imgData = await imgResponse.json();
            
            const catImage = imgData.length > 0 ? imgData[0].url : '';
            
            document.getElementById('random-cat-result').innerHTML = `
                <h3>${breed.name}</h3>
                <p><strong>Origem:</strong> ${breed.origin}</p>
                <p><strong>Temperamento:</strong> ${breed.temperament}</p>
                ${catImage ? `<img src="${catImage}" alt="${breed.name}" width="300">` : ''}
            `;
        }
    } catch (error) {
        document.getElementById('random-cat-result').innerHTML = 'Erro ao consultar informações sobre gatos.';
    }
}
