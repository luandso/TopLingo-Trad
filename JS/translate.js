const selectFrom = document.querySelector(".selectFrom");
const selectTo = document.querySelector(".selectTo");
const textareaFrom = document.querySelector("#textareaFrom");
const textareaTo = document.querySelector("#textareaTo");
const btnTranslate = document.querySelector("#btnTranslate");

const countries = {
    "pt-BR": "Português",
    "es-ES": "Espanhol",
    "en-US": "Inglês"
};

function createSelectOptions(selectElement, selectedValue) {
    for (let country in countries) {
    const option = document.createElement("option");
        option.value = country;
        option.textContent = countries[country];
        if (country === selectedValue) {
            option.selected = true;
        }
        selectElement.appendChild(option);
    }
}

createSelectOptions(selectFrom, "pt-BR");
createSelectOptions(selectTo, "en-US");

function loadTranslation() {
    if (textareaFrom.value) {
        fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(textareaFrom.value)}&langpair=${selectFrom.value}|${selectTo.value}`)
         .then((res) => {
                if (!res.ok) {
                    throw new Error('Erro ao carregar a tradução. Por favor, tente novamente mais tarde.');
                }
                return res.json();
            })
      .then((data) => {
                if (data.responseData && data.responseData.translatedText) {
                    textareaTo.value = data.responseData.translatedText;
                } else {
                    console.error("Erro ao traduzir:", data);
                    textareaTo.value = "Erro ao traduzir. Por favor, tente novamente mais tarde.";
                }
            })
            .catch((error) => {
                console.error("Erro ao traduzir:", error);
                textareaTo.value = "Erro ao traduzir. Por favor, tente novamente mais tarde.";
            });
    } else {
        textareaTo.value = "";
    }
}



btnTranslate.addEventListener("click", loadTranslation);

//Teste para reconhecimento de voz

document.addEventListener('DOMContentLoaded', function() {
    const microphone = document.getElementById('microphone');
    const headset = document.getElementById('headset');

    // Verificar se o navegador suporta reconhecimento de voz
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

        microphone.addEventListener('click', function() {
            // Configurar o reconhecimento de voz
            recognition.lang = 'pt-BR'; // Define o idioma para português brasileiro
            recognition.interimResults = false; // Define se deve ou não retornar resultados intermediários
            recognition.maxAlternatives = 1; // Define o número máximo de alternativas que o reconhecimento pode retornar

            // Iniciar o reconhecimento de voz
            recognition.start();

            // Evento de resultado do reconhecimento de voz
            recognition.onresult = function(event) {
                const transcript = event.results[0][0].transcript; // Obter o texto reconhecido
                document.getElementById('textareaFrom').value = transcript; // Colocar o texto reconhecido na caixa de texto
            }
        });

        headset.addEventListener('click', function() {
            // Aqui você pode adicionar a lógica para reproduzir o áudio, se desejado
            alert('Reproduzindo áudio...');
        });
    } else {
        // Caso o navegador não suporte reconhecimento de voz, exibir uma mensagem de erro ou fornecer uma alternativa
        alert('Seu navegador não suporta reconhecimento de voz.');
    }
});
