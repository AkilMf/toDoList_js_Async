import { Validation } from "./Validation.js";
import { ajouteTache } from "./TacheService.js";
export class Formulaire {
    constructor(el) {
        this._el = el;
        
        this._elBouton = this._el.querySelector('[data-js-btn]');
        
        this.init();
    }

    /**
     * Initialise les comportements
     */
    init() {
        this._elBouton.addEventListener('click', function(e) {
            e.preventDefault();

            /* Si valide */
            let valideForm = new Validation(this._el);
            if (valideForm._estValide == true) {
        
                ajouteTache(this._el);
            }
        }.bind(this));
    }    
}