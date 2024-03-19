import { Tache } from "./Tache.js";
export class TacheService{
    #_requete;

    constructor(el){
        
        this._elsActionButtons = document.querySelectorAll('[data-js-actions]');
        this._elTemplateTache =document.querySelector('[data-template-tache]');
        this._elTaches = document.querySelector('[data-js-taches]');
        this._eltemplateDetailTache = document.querySelector('[data-template-detailTache]');
        this._elDetailTache = document.querySelector('[data-js-tache-detail]');


        this.#_requete = new Request('requetes/requetesAsync.php');
        this._oOptions = { 
            method: 'POST',
            headers: { "Content-Type": "application/json" }
        };
        this.ajouteTache = this.ajouteTache.bind(this);
        this.supprimeTache = this.supprimeTache.bind(this);
        this.getTache = this.getTache.bind(this);

        this.elsTrieBtns = document.querySelector('[data-js-trier-taches]');

        this.trier();
    }

    trier($by){
        this.elsTrieBtns.addEventListener('click', function(e){
            this._elTaches.innerHTML = '';
            let elTarget = e.target,
                order = elTarget.dataset.jsTrier;
            
            let data = {
                action: 'getAllTaches',
                order: order
            };
            
            this._oOptions.body = JSON.stringify(data);
            this.appelFetch()
                .then(function(data){
                    //console.log(data)
                    for(let i=0; i< data.length; i++ ){
                        let elCloneTemplate = this._elTemplateTache.cloneNode(true);

                        for(let cle in data[i]){
                            let regex = new RegExp('{{'+ cle +'}}','g');
                            elCloneTemplate.innerHTML = elCloneTemplate.innerHTML.replace(regex, data[i][cle]);
                        }
                        let elNouvelleTache = document.importNode(elCloneTemplate.content, true);
                        this._elTaches.append(elNouvelleTache);
                        new Tache(this._elTaches.lastElementChild);
                    }
    
                }.bind(this));

               /*  .catch(function(err) {
                    console.log(`Il y a eu un problème avec l'opération fetch: ${err.message}`);
                }); */

        }.bind(this))
    }
    /**
     * ajout tache async
     * @param {HTMLElement} elForm 
     */
    ajouteTache(elForm){
        let dataTache = {
            action: 'ajouteTache',
            tache: elForm.tache.value,
            description: elForm.description.value,
            importance: elForm.importance.value
        };
        this._oOptions.body = JSON.stringify(dataTache);

        this.appelFetch()
            .then(function(data){
                elForm.reset();
                let id = data,
                    elCloneTemplate = this._elTemplateTache.cloneNode(true);
                dataTache.id = id;
                for(let cle in dataTache){
                    let regex = new RegExp('{{'+ cle +'}}','g');
                    elCloneTemplate.innerHTML = elCloneTemplate.innerHTML.replace(regex, dataTache[cle]);
                }
                let elNouvelleTache = document.importNode(elCloneTemplate.content, true);
                this._elTaches.append(elNouvelleTache);
                //console.log(this._elTaches.lastElementChild)
                new Tache(this._elTaches.lastElementChild);

            }.bind(this))
            .catch (function(err) {
                console.log(`Il y a eu un problème avec l'opération fetch: ${err.message}`);
            });
    }
    
    /**
     * Supprime Tache
     * @param {string} id 
     */
    supprimeTache(id){
        let data = {
            action: 'supprimeTache',
            id: id
        };
        this._oOptions.body = JSON.stringify(data);

        this.appelFetchTxt()
            .then(function(data){
            })
            .catch (function(err) {
                console.log(`Il y a eu un problème avec l'opération fetch: ${err.message}`);
            });
    }

    getTache(id){
        
        let data = {
            action: 'getTache',
            id: id
        };
        this._oOptions.body = JSON.stringify(data);
        this.appelFetch()
        .then(function(data){
            //console.log(data); // array
            this._elDetailTache.innerHTML = '';
            let elCloneTemplate = this._eltemplateDetailTache.cloneNode(true);
            for(let cle in data){
                let regex = new RegExp('{{'+ cle +'}}','g');
                
                elCloneTemplate.innerHTML = elCloneTemplate.innerHTML.replace(regex, data[cle]);
                if(data.description ==''){
                    data.description = 'Aucune description disponible';
                } 

            }
            let elNewDetailtache = document.importNode(elCloneTemplate.content, true);
            this._elDetailTache.append(elNewDetailtache)
            
        }.bind(this))
        .catch (function(err) {
            console.log(`Il y a eu un problème avec l'opération fetch: ${err.message}`);
        });

    }

    /**
     * Retourne la promesse de la fonction asynchrone
     * @returns 
     */
    async appelFetch(){
        try{
            let response = await fetch(this.#_requete, this._oOptions);
            if(response.ok) return response.json();
            else throw new Error('Response not OK !');
        }catch(err){
            return err.message;
        }
    }
       /**
     * Retourne la promesse de la fonction asynchrone
     * @returns 
     */
       async appelFetchTxt(){
        try{
            let response = await fetch(this.#_requete, this._oOptions);
            if(response.ok) return response.text();
            else throw new Error('Response not OK !');
        }catch(err){
            return err.message;
        }
    }
}
export const { getTache, ajouteTache, supprimeTache } = new TacheService();