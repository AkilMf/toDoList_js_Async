import { gereHashbang } from "./Router.js";
import { supprimeTache } from "./TacheService.js";

export class Tache {
    constructor(el) {
        this._el = el;
        this._elActions = this._el.querySelector('[data-js-actions]');
        this._id = this._el.dataset.jsTache;
        this._detailSection = document.querySelector('[data-js-tache-detail]');
        
        this.init();
    }


    /**
     * Initialise les comportements
     */
    init() {
        this._elActions.addEventListener('click', function(e) {
            if (e.target.dataset.jsAction == 'supprimer'){
                supprimeTache(this._id);
                this._el.remove();
                // remove son detail s il est affiché
                if(this.getDetailTacheId() == this._id){
                    this._detailSection.innerHTML = '';
                }
                //if(gereHashbang() == this._id)
                console.log(gereHashbang())
            }
        }.bind(this));
    }
    /**
     * 
     * @returns id Detail tache affiché
     */
    getDetailTacheId(){
        if(this._detailSection.firstElementChild){
            let id = this._detailSection.firstElementChild.value;
            return id;
        }
    }

}