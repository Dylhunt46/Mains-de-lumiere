const moisCourant = document.getElementById('mois-courant');
const joursSemaine = document.getElementById('jours-semaine');
const grilleCalendrier = document.getElementById('grille-calendrier');

const nomsMois = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
const nomsJours = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

let dateActuelle = new Date();

// Récupérer les éléments de sélection de la date
const selectMois = document.getElementById('select-mois');
const selectAnnee = document.getElementById('select-annee');

// Fonction pour remplir les listes déroulantes avec les mois et les années
function remplirSelectDate() {
    const dateActuelle = new Date();
    const anneeActuelle = dateActuelle.getFullYear();
    const moisActuel = dateActuelle.getMonth();

    // Remplir la liste déroulante des mois
    nomsMois.forEach((mois, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.text = mois;

        // Désactiver les mois antérieurs au mois actuel pour l'année en cours
        if (index < moisActuel && anneeActuelle === new Date().getFullYear()) {
            option.disabled = true;
        }

        selectMois.appendChild(option);
    });

    // Remplir la liste déroulante des années (5 années avant et après l'année actuelle)
    for (let i = anneeActuelle; i <= anneeActuelle + 5; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.text = i;

        // Désactiver les années antérieures à l'année actuelle
        if (i < anneeActuelle) {
            option.disabled = true;
        }

        selectAnnee.appendChild(option);
    }

    // Sélectionner le mois et l'année actuels par défaut
    selectMois.value = moisActuel;
    selectAnnee.value = anneeActuelle;
}

// Appeler la fonction pour remplir les listes déroulantes au chargement de la page
remplirSelectDate();

// Ajouter des gestionnaires d'événements pour les changements de sélection
selectMois.addEventListener('change', () => {
    const mois = parseInt(selectMois.value);
    const annee = parseInt(selectAnnee.value);
    dateActuelle = new Date(annee, mois, 1);
    afficherCalendrier(dateActuelle);
});

selectAnnee.addEventListener('change', () => {
    const mois = parseInt(selectMois.value);
    const annee = parseInt(selectAnnee.value);
    dateActuelle = new Date(annee, mois, 1);
    afficherCalendrier(dateActuelle);
});

function afficherCalendrier(date) {
    const premierJour = new Date(date.getFullYear(), date.getMonth(), 1);
    const dernierJour = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    moisCourant.textContent = nomsMois[date.getMonth()] + " " + date.getFullYear();

    joursSemaine.innerHTML = "";
    nomsJours.forEach(jour => {
        const div = document.createElement('div');
        div.textContent = jour;
        joursSemaine.appendChild(div);
    });

    grilleCalendrier.innerHTML = "";
    let jourCourant = 1;
    let caseVide = premierJour.getDay() === 0 ? 6 : premierJour.getDay() - 1;

    for (let i = 0; i < 6; i++) {
        let ligne = document.createElement('div');
        ligne.classList.add('ligne-calendrier');
        let ligneNonVide = false; // Variable pour suivre si la ligne contient des jours

        for (let j = 0; j < 7; j++) {
            const div = document.createElement('div');
            if (i === 0 && j < caseVide) {
                div.textContent = "";
            } else if (jourCourant > dernierJour.getDate()) {
                div.textContent = "";
            } else {
                div.textContent = jourCourant;
                ligneNonVide = true; // La ligne contient au moins un jour
                if (estJourReserve(date.getFullYear(), date.getMonth(), jourCourant)) {
                    div.classList.add('jour-reserve');
                } else {
                    div.classList.add('jour-disponible');
                    div.addEventListener('click', () => {
                        alert("Rendez-vous le " + jourCourant + " " + nomsMois[date.getMonth()] + " " + date.getFullYear());
                    });
                }
                jourCourant++;
            }
            ligne.appendChild(div);
        }

        if (ligneNonVide) { // Ajouter la ligne seulement si elle n'est pas vide
            grilleCalendrier.appendChild(ligne);
        }
    }
}

function estJourReserve(annee, mois, jour) {
    // Logique pour déterminer si un jour est réservé (ex: appel à une base de données)
    // Pour l'exemple, les 10 premiers jours de chaque mois sont réservés
    return jour <= 10;
}

afficherCalendrier(dateActuelle);