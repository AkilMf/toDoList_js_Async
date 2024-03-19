import { getTache } from "./TacheService.js";

export default class Router{
    #_routes;

    constructor(el){
        this._el = el;
        this._elActions = this._el.querySelector('[data-js-actions]');
        this._elTaches = this._el.querySelector('[data-js-taches]');
        this._elTacheDetail = document.querySelector('[data-js-tache-detail]');
        this.#_routes = [
            ['/taches/:id', getTache]
        ];

        this.init();
        this.path = location.pathname;
        this._elDetailSection = document.querySelector('[data-js-detail]');     

    }
    init(){
        this.gereHashbang();

        // event clic sur le button Afficher
        this._elTaches.addEventListener('click', function(e) {
            let elTarget = e.target;
            if (elTarget.getAttribute('data-js-action') == 'afficher'){
                let id = elTarget.closest('[data-js-tache]').dataset.jsTache;
                
                window.location = `#!/taches/${id}`;
            }
            this.scrollBeavior(this._elDetailSection)
        }.bind(this));

        // event hashChange
        window.addEventListener('hashchange', function(){
            let id = this.gereHashbang();
            if(!id) {
                this._elTacheDetail.innerHTML ='';
                history.pushState(null, null, this.path);
                
            }
            
        }.bind(this)); 
    }
    


    gereHashbang(){
        
        let hash = window.location.hash.slice(2),
            isRoute = false;
        if(hash.endsWith('/')) hash = hash.slice(0, -1);

        for (let i = 0; i < this.#_routes.length; i++) {
            let route = this.#_routes[i][0],
                isId = false;
        
            if(route.indexOf(':')>-1){
                route = route.substring(0, route.indexOf('/:'));
                isId = true;
            }
            if(hash.indexOf(route) > -1){
                let hashInArray = hash.split(route);
                if(hashInArray[1]){
                    if(isId){
                        let id = hashInArray[1].slice(1);
                        this.#_routes[i][1](id);
                        isRoute = true;
                        // A ajouter
                        return id;
                    }
                }else{
                    if(hash === this.#_routes[i][0]){
                        this.#_routes[i][1]();
                        isRoute = true;
                        return hash;
                    }
                }
            }
        }     
    }

    // behavior smooth
    scrollBeavior(elCible){
        window.scroll({
            top: elCible.getBoundingClientRect().top -50,
            behavior: "smooth"
        });

    }
}

export const { gereHashbang } = new Router();