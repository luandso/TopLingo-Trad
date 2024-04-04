const flags = {
    "Português": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/1200px-Flag_of_Brazil.svg.png",
    "Inglês": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/1200px-Flag_of_the_United_States.svg.png",
    "Espanhol": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Spain.svg/1200px-Flag_of_Spain.svg.png",
};

function showLanguageOptions(selectId) {
    var selectElement = document.querySelector("." + selectId);
    var flagElement;
    if (selectId === "selectFrom") {
        flagElement = document.querySelector("#flagFrom"); 
    } else if (selectId === "selectTo") {
        flagElement = document.querySelector("#flagTo"); 
    }

    if (selectElement.options.length === 0) {
        var options = Object.keys(flags);
        options.forEach(function(option) {
            var optionElement = document.createElement("option");
            optionElement.text = option;
            selectElement.add(optionElement);
        });
    }

    selectElement.addEventListener("change", function() {
        var selectedOption = selectElement.options[selectElement.selectedIndex].text;
        flagElement.src = flags[selectedOption];
    });

    if (selectElement.selectedIndex === -1) {
        selectElement.selectedIndex = 0;
    }
    var initialOption = selectElement.options[selectElement.selectedIndex].text;
    flagElement.src = flags[initialOption];
}

showLanguageOptions("selectFrom");
showLanguageOptions("selectTo");
