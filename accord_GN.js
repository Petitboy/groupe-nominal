/*************
*  Variables *
*************/

const affichage_phrase = document.getElementById('affichage_phrase');
const input_bases1 = document.getElementById('input_bases1');
const input_bases2 = document.getElementById('input_bases2');
const input_bases3 = document.getElementById('input_bases3');

var mots_places = [];
var mots_places1 = [];
var mots_places2 = [];
var mots_places3 = [];

var mots_a_placer1 = [];
var mots_a_placer2 = [];
var mots_a_placer3 = [];

var base1 = [];
var base2 = [];
var base3 = [];

function effacerMotsPlacer () {
	mots_placer = [];
	mots_placer1 = [];
	mots_placer2 = [];
	mots_placer3 = [];
	}

function effacerMotsAPlacer () {
	mots_a_placer1 = [];
	mots_a_placer2 = [];
	mots_a_placer3 = [];
	}

function effacerBases () {
	base1 = [];
	base2 = [];
	base3 = [];
	}
	
function effacerInputBases () {
	input_bases1.innerHTML = "";
	input_bases2.innerHTML = "";
	input_bases3.innerHTML = "";
	}

var GNMF1 = ["le", "la", "un", "une", "ma", "ton"];
var GNMF2 = ["lit", "rue", "chat", "poule", "papa", "maman"];
var GNSP1 = ["le", "un", "les", "des", "mon", "mes", "ton", "tes"];
var GNSP2 = ["chat", "chats", "lits", "lit", "rat", "rats", "cochon", "cochons"];
var GNGN1 = ["le", "la", "un", "une", "les", "des", "mes", "tes"];
var GNGN2 = ["chat", "chats", "poule", "poules", "rues", "rue", "lits", "lit"];
var GNAG = ["petit", "petite", "jolie", "joli", "grand", "grande", "bon", "bonne"];
var GNAN = ["petit", "petits", "jolis", "joli", "grand", "grands", "bon", "bons"];

/*****************
 * CREATION HTML *
 ****************/
 
function createNewInput (base, motsAPlacer, inputBase) {
	switch (base) {		
		case base1:
			shuffle(base1, motsAPlacer);
			break;
		case base2:
			shuffle(base2, motsAPlacer);
			break;
		case base3:
			shuffle(base3, motsAPlacer);
			break;
		}
	for (let i=0; i<motsAPlacer.length; i++) {
		var newDivMot = document.createElement('div');
		var newInput = document.createElement('input');
		newInput.type = 'checkbox';
		newInput.id = base[i];
		var newLabel = document.createElement('label');
		newLabel.htmlFor = base[i];
		newLabel.appendChild(document.createTextNode(motsAPlacer[i]));
		newDivMot.appendChild(newInput);
		newDivMot.appendChild(newLabel);
		var newDivBox = document.createElement('div');
		newDivBox.id = 'box';
		newDivBox.appendChild(newDivMot);
		inputBase.appendChild(newDivBox);		
	}
	motsAPlacer.splice(0, motsAPlacer.length);
}

/*************
 * SELECTION *
 ************/
function selectSons(baseID) {
	for (let i=0; i<baseID.length; i++) {
		const x = document.getElementById(baseID[i]).addEventListener('change', ($event) => {
			if ($event.target.checked) {
				mots_places.push(baseID[i]);
				afficher_les_mots(mots_places);
				} else {
					const index = mots_places.indexOf(baseID[i]);
					mots_places.splice(index, 1);				
					afficher_les_mots(mots_places);
			}
		});
	}
}

const selectionNiveau = document.getElementById('niveau').addEventListener('change', ($event) => {
			switch ($event.target.value) {
			case 'progression':
					effacer();
					effacerBases();
					effacerInputBases();
					affichage_phrase.textContent = " ";
					break;
			case 'GNMF':
					effacer();
					effacerBases();
					effacerInputBases ();
					affichage_phrase.textContent = " ";
					base1 = GNMF1;
					base2 = GNMF2;
					createNewInput(base1, mots_a_placer1, input_bases1);
					createNewInput(base2, mots_a_placer2, input_bases2);
					selectSons(base1);
					selectSons(base2);
					break;
			case 'GNSP':
					effacer();
					effacerBases();
					effacerInputBases ();
					affichage_phrase.textContent = " ";
					base1 = GNSP1;
					base2 = GNSP2;
					createNewInput(base1, mots_a_placer1, input_bases1);
					createNewInput(base2, mots_a_placer2, input_bases2);
					selectSons(base1);
					selectSons(base2);
					break;
			case 'GNGN':
					effacer();
					effacerBases();
					input_bases1.innerHTML = "";
					input_bases2.innerHTML = "";
					affichage_phrase.textContent = " ";
					base1 = GNGN1;
					base2 = GNGN2;
					createNewInput(base1, mots_a_placer1, input_bases1);
					createNewInput(base2, mots_a_placer2, input_bases2);
					selectSons(base1);
					selectSons(base2);
					break;
			case 'GNAG':
					effacer();
					effacerBases();
					input_bases1.innerHTML = "";
					input_bases2.innerHTML = "";
					input_bases3.innerHTML = "";
					affichage_phrase.textContent = " ";
					base1 = GNMF1;
					base2 = GNMF2;
					base3 = GNAG;
					createNewInput(base1, mots_a_placer1, input_bases1);
					createNewInput(base2, mots_a_placer2, input_bases2);
					createNewInput(base3, mots_a_placer3, input_bases3);
					selectSons(base1);
					selectSons(base2);
					selectSons(base3);
					break;
			case 'GNAN':
					effacer();
					effacerBases();
					effacerInputBases ();
					affichage_phrase.textContent = " ";
					base1 = GNSP1;
					base2 = GNSP2;
					base3 = GNAN;
					createNewInput(base1, mots_a_placer1, input_bases1);
					createNewInput(base2, mots_a_placer2, input_bases2);
					createNewInput(base3, mots_a_placer3, input_bases3);
					selectSons(base1);
					selectSons(base2);
					selectSons(base3);
					break;
			}
		});

/********************
 * MISE A ZERO html *
 *******************/

function mise_a_zero() {
	effacerBases();
	effacerInputBases();
	effacerMotsAPlacer();
	effacerMotsPlacer();
	affichage_phrase.textContent = "";	
	}

/************
 * AFFICHER *
 ***********/
	
function afficher_les_mots(mots_places) {		
	affichage_phrase.textContent = " ";
	for (compteur=0; compteur <mots_places.length; compteur +=1) {
		affichage_phrase.textContent += mots_places[compteur] + " ";}
	}

/************
 * MELANGER *
 ***********/

function shuffle(array1, array2) {
	var currentIndex = array1.length;
	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		array2.push(array1[randomIndex]);
		const index = array1.indexOf(array1[randomIndex]);
		array1.splice(index, 1);
		}
		array1.push(...array2);
		return array2;
	}

/***********
 * EFFACER *
 **********/
 
function effacer() {
	var clist = document.getElementsByTagName("input");
	for (var i = 0; i < clist.length; i++) { clist[i].checked = false; }
	affichage_phrase.textContent = " ";
	mots_places.splice(0, mots_places.length);
	mots_places1.splice(0, mots_places1.length);
	mots_places2.splice(0, mots_places2.length);
	mots_places3.splice(0, mots_places3.length);
	effacerInputBases();
	createNewInput(base1, mots_a_placer1, input_bases1);
	createNewInput(base2, mots_a_placer2, input_bases2);
	createNewInput(base3, mots_a_placer3, input_bases3);
	selectSons(base1);
	selectSons(base2);
	selectSons(base3);
	
}


