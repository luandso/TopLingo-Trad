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
