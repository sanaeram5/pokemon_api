import React,{useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import _ from 'lodash';
import {Link} from 'react-router-dom';
import { GetPokemonList } from '../actions/PokemonActions';
import ReactPaginate from 'react-paginate';

const PokemonList=(props)=>{

    const [search,setSearch]=useState("");
    const dispatch=useDispatch();
    const pokemonList = useSelector(state=> state.PokemonList);
    React.useEffect(()=>{
        fetchData(1);
    },[]);

    const fetchData=(page=1)=>{
        dispatch(GetPokemonList(page))
    }

    const showData=()=>{
        if(!_.isEmpty(pokemonList.data)){
            return(
            <div className={"list-wrapper"}>
            {pokemonList.data.map(e1 =>{
                return(
                <div className={"pokemon-item"}>
                    <p>{e1.name}</p>
                    <Link to={`/pokemon/${e1.name}`}>View</Link>
                </div>
                )
            })}
            </div>
        )
        }

        if(pokemonList.loading){
            return <p>Loading...</p>
        }
        if(pokemonList.errorMsg!==""){
            return <p>{pokemonList.errorMsg}</p>
        }
        return <p>Unable to get data</p>
    }

    return(
        <div>
            <div className={"search-wrapper"}>
                <p>Search: </p>
                <input type="text" onChange={e=>setSearch(e.target.value)}/>
                <button onClick={()=>props.history.push(`/pokemon/${search}`)}>Search</button>
            </div>
            {showData()}
            {!_.isEmpty(pokemonList.data)&&(
                <ReactPaginate
                pageCount={Math.ceil(pokemonList.count/15)}
                pageRangeDisplayed={2}
                marginPagesDisplayed={1}
                onPageChange={(data)=>fetchData(data.selected+1)}
                containerClassName={"pagination"}
                />
            )}
        </div>
    )
};

export default PokemonList;