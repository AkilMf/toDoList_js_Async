import { classesMapping } from './classMapping.js';
import { Formulaire } from './Formulaire.js';
import { Tache } from './Tache.js';


(function() {
	
	let elComponents = document.querySelectorAll('[data-js-component]');

	for (let i = 0; i < elComponents.length; i++) {

		let datasetComponent = elComponents[i].dataset.jsComponent, 			// => string
			elComponent = elComponents[i];

		for (let key in classesMapping) {
			if (datasetComponent == key) new classesMapping[datasetComponent](elComponent);
		}
	}

	let elsForm = document.querySelectorAll('[data-js-formulaire]');
	for (let i = 0; i < elsForm.length; i++) {
		new Formulaire(elsForm[i]);
		
	}

	let elsTache = document.querySelectorAll('[data-js-tache]');
	for (let i = 0; i < elsTache.length; i++) {
		new Tache(elsTache[i]);
		
	}
	
})();