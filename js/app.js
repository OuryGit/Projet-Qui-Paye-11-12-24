const { createApp, reactive, computed} = Vue;


const DEFAULT_STATE = {
    state:true,
    inputName:'',
    names:[],
    error:'',
    showError: false,
    result:''
}
createApp({
    setup(){
        const data = reactive(DEFAULT_STATE)

        // computed
        const isReady = computed(()=>
            {
                return data.names.length > 1;
            })
        //Methodes
        const addNameToList = ()=> {
            const userName = data.inputName;

            if(validate(userName)){
                data.names.push(userName);
                data.inputName = '';
                data.showError = false
            }else{
                data.showError = true
            }
           

        }

        //fonction pour la validation
        const validate = (value)=>{
            data.error = '';
            if(value === ''){
                data.error = 'Désolé, pas de nom vide';
                return false
            }
                    // Convertir le nom saisi et les noms existants en minuscules pour la comparaison
            if (data.names.some(name => name.toLowerCase() === value.toLowerCase())) {
                data.error = 'Désolé, le nom doit être unique';
                return false;
            }
            return true
        }
        // fonction pour supprimer le nom
        const removeName = (index) =>{
            data.names.splice(index,1)
        }

        const getRandomName = ()=>{
            // trouve indice du looser de façon aleatoire dans le array names
            let indice = Math.floor(Math.random() * data.names.length);

            return data.names[indice];
        }
      // Fonction pour générer un résultat aléatoire tout en évitant de répéter le dernier résultat
        const generateResult = () => {
            // Génère un nom aléatoire initialement
            let rand = getRandomName();
            
            // Si un résultat précédent existe, vérifie qu'il ne soit pas identique au nouveau
            if (data.result !== '') {
                // Continue de générer un nouveau nom tant qu'il est identique au résultat précédent
                while (rand === data.result) {
                    rand = getRandomName();
                }
            }
            
            // Assigne le nouveau nom aléatoire à data.result
            data.result = rand;
        }

        const ShowResults = ()=>{
            generateResult()
            data.state = false;

        }

        const resetApp = ()=>{
            data.state=true;
            data.inputName='';
            data.names=[];
            data.error='';
            data.showError= false;
            data.result='';
        }
        const getNewResult = ()=>{
            generateResult();
        }
    return{
        data,
        addNameToList,
        removeName,
        isReady,
        ShowResults,
        resetApp,
        getNewResult
    }
    }
}).mount('#app')
