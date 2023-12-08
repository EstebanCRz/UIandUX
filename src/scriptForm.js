var cptSubmitButton;
var cptCancelButton;
var goingUp = false;

function validerFormulaire() {
    var requiredFields = document.querySelectorAll('#nom, #prenom, #email, #message, #telephone, #adresse, #ville, #codePostal');

    for (var i = 0; i < requiredFields.length; i++) {
        if (requiredFields[i].value.trim() === '') {
            return false;
        }
    }

    return true;
}

window.onload = function () {
    var themeSelect = document.getElementById('theme');
    var selectedTheme = localStorage.getItem('selectedTheme');
    if (selectedTheme) {
        themeSelect.value = selectedTheme;
    }
    changerTheme(selectedTheme);

    document.getElementById('submitButton').addEventListener('click', function (event) {
        if (validerFormulaire()) {
            window.location.href = 'result.html';
        } else {
            event.preventDefault();
            alert("Veuillez remplir les champs correctement");
        }
    });

    if (document.getElementById('theme').value === 'styleEpilepsie.css') {
        setInterval(changerCouleurFond, 100);
    }
    cptCancelButton = 0;
    cptSubmitButton = 0;
    document.getElementById('submitButton').addEventListener('mouseenter', function () {
        deplacerBouton(this);
    });
    document.getElementById('cancelButton').addEventListener('mouseenter', function () {
        deplacerBouton(this);
    });


    document.getElementById('messageButton').addEventListener('click', function () {
            envoyerMessage();
        }
    );

    document.getElementById('reduceChatButton').addEventListener('click', function () {
        toggleChat();
    });

    document.getElementById('increaseChatButton').addEventListener('click', function () {
        goingUp = true;
        increaseChat();
    });

    document.getElementById('messageCancelButton').addEventListener('click', function () {
        setChatSize();
    });

    document.getElementById('theme').addEventListener('change', function () {
        changerTheme(this.value);
        location.reload();
    });

    document.querySelectorAll('input[type="checkbox"]').forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            if (this.checked) {
                cocherCaseAleatoire(this);
            }
        });
    });
}

function changerCouleurFond() {
    var elements = document.querySelectorAll('*');
    elements.forEach(function (element) {
        //seulement si l'élément n'a pas la classe unchanged
        if (!element.classList.contains('unchanged')) {
            var couleurRouge = Math.floor(Math.random() * 256);
            var couleurVerte = Math.floor(Math.random() * 256);
            var couleurBleue = Math.floor(Math.random() * 256);

            var nouvelleCouleur = 'rgb(' + couleurRouge + ',' + couleurVerte + ',' + couleurBleue + ')';
            element.style.backgroundColor = nouvelleCouleur;
            var couleurRouge = Math.floor(Math.random() * 256);
            var couleurVerte = Math.floor(Math.random() * 256);
            var couleurBleue = Math.floor(Math.random() * 256);

            var nouvelleCouleur = 'rgb(' + couleurRouge + ',' + couleurVerte + ',' + couleurBleue + ')';
            element.style.color = nouvelleCouleur;
        }
    });
}

function changerTheme(theme) {
    localStorage.setItem('selectedTheme', theme);
    document.getElementById('cssLink').setAttribute('href', theme);
}

function cocherCaseAleatoire(caseActuelle) {
    if (document.getElementById('theme').value === 'styleNormal.css') {
        return;
    }
    var cases = document.querySelectorAll('input[type="checkbox"]');

    var casesNonCochees = Array.from(cases).filter(function (checkbox) {
        return !checkbox.checked;
    });

    var caseAleatoire = casesNonCochees[Math.floor(Math.random() * casesNonCochees.length)];
    while (caseActuelle === caseAleatoire) {
        caseAleatoire = casesNonCochees[Math.floor(Math.random() * casesNonCochees.length)];
    }

    caseActuelle.checked = !caseActuelle.checked;
    caseAleatoire.checked = !caseAleatoire.checked;
}

function setChatSize() {
    //function that sets the height of the messages div to -500px one time
    var messagesDiv = document.getElementById('messages');
    messagesDiv.style.height = random(0, 700) + 'px';
    goingUp = false;
}

function increaseChat() {
    //function that increases the height height of the messages div by 1 px every 50 ms
    var messagesDiv = document.getElementById('messages');
    var hauteurActuelleStr = window.getComputedStyle(messagesDiv).height;
    var hauteurActuelle = parseInt(hauteurActuelleStr.replace('px', ''), 10);
    var hauteurMax = 2000;
    var interval = setInterval(function () {
        if (goingUp) {
            hauteurActuelle++;
            messagesDiv.style.height = hauteurActuelle + 'px';
        } else {
            clearInterval(interval);
        }
    }, 80);

}

function genererValeurAleatoire(labels) {
    var indexAleatoire = Math.floor(Math.random() * labels.length);
    return labels[indexAleatoire];
}

function appliquerValeursAleatoires() {
    //si la value de la liste deroualante est styleNormal, on return
    if (document.getElementById('theme').value === 'styleNormal.css') {
        return;
    }
    var labels = ["Nom", "Prénom", "Email", "Message", "Envoyer", "Annuler", "Téléphone", "Adresse", "Ville", "Code postal", "Age", "-18", "18-30", "+30"];

    // Sélectionnez tous les labels et les champs de saisie dans le formulaire
    var elements = document.querySelectorAll('label, button');

    // Parcourez les éléments et appliquez des valeurs aléatoires aux labels
    elements.forEach(function (element) {
        if (!element.classList.contains('unchanged')) {
            element.textContent = genererValeurAleatoire(labels);
        }
    });
}

// Appelez la fonction pour appliquer les valeurs aléatoires lorsque la page est chargée
window.addEventListener('load', appliquerValeursAleatoires);


function random(min, max) {
    // Math.random() génère un nombre entre 0 (inclus) et 1 (exclus)
    // En multipliant par la différence entre max et min, on obtient une valeur dans la plage spécifiée
    // En ajoutant min, on décale la plage vers le haut
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function deplacerBouton(button) {
    if (document.getElementById('theme').value === 'styleNormal.css') {
        return;
    }
    if (button === document.getElementById('submitButton')) {
        if (cptSubmitButton > 5) {
            cptSubmitButton = 0;
            return;
        } else {
            cptSubmitButton++
        }
    } else if (button === document.getElementById('cancelButton')) {
        if (cptCancelButton > 5) {
            cptCancelButton = 0;
            return;
        } else {
            cptCancelButton++
        }
    }


    var width = random(50, 200);
    var height = random(20, 100);
    button.style.width = width + 'px';
    button.style.height = height + 'px';

    var x = random(0, window.innerWidth - button.clientWidth);
    var y = random(0, window.innerHeight - button.clientHeight);
    button.style.position = 'absolute';
    button.style.left = x + 'px';
    button.style.top = y + 'px';

}

function toggleChat() {
    var messagesDiv = document.getElementById('messages');

    var hauteurActuelleStr = window.getComputedStyle(messagesDiv).height;

    var hauteurActuelle = parseInt(hauteurActuelleStr.replace('px', ''), 10);

    hauteurActuelle += 25;

    messagesDiv.style.height = hauteurActuelle + 'px';
}


function envoyerMessage() {
    var messageInput = document.getElementById('messageInput');
    var messagesContainer = document.getElementById('messages');

    if (messageInput.value.trim() !== '') {
        var message = document.createElement('div');
        message.className = 'message';
        message.textContent = messageInput.value;
        messagesContainer.appendChild(message);

        messageInput.value = '';

        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}
