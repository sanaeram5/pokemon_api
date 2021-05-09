import { act } from "react-dom/test-utils";

const DefaultState={
    loading:false,
    data:{},
    errorMsg:""
};

const PokemonMultipleReducer=(state=DefaultState,action)=>{
    switch(action.type){
        case "POKEMON_MULTIPLE_LOADING":
            return{
                ...state,
                loading:true,
                errorMsg:""
            };
        case "POKEMON_LIST_SUCCESS":
            return{
                ...state,
                loading:false,
                data:{
                    ...state.data,
                    [action.pokemonName]:action.payload
                },
                errorMsg:"",
            };  
        case "POKEMON_LIST_FAIL":
            return{
                ...state,
                loading:false,
                errorMsg:"unable to get pokemon"
            }; 
        default:
            return state
    }
};

export default PokemonMultipleReducer;