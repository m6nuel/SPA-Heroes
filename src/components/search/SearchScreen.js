import React, { useMemo } from 'react';
import queryString from 'query-string';


import { useLocation } from 'react-router-dom';
// import { heroes } from '../../data/heroes'
import { HeroCard } from '../heroes/HeroCard';
import { useForm } from '../hooks/useForm';
import { getHeroesbyName } from '../../selectors/getHeroesbyName';

export const SearchScreen = ({ history }) => {
    
    const location = useLocation();

    const { q='' } = queryString.parse( location.search );

    const [ formValues, handleInputChange ] = useForm( {
        searchText: q
    } );
    
    const { searchText } = formValues;

    const heroesFiltered = useMemo(() => getHeroesbyName( q ), [q]);

    const handleSearch = (e) => {
        e.preventDefault();
        history.push(`?q=${searchText}`);
 
    }

    return (
        <div>
            <h3>Search Screen</h3>
            <hr/>

            <div className="row">
                <div className="col-5">
                    <h4>Search Form</h4>
                    <hr/>

                    <form onSubmit={ handleSearch }>
                        <input
                            type="text"
                            placeholder="find your hero"
                            className="form-control"
                            name="searchText"
                            autoComplete="off"
                            value={ searchText }
                            onChange={ handleInputChange }
                        />

                        <button
                            type="submit"
                            className="btn m-1 btn-block btn-outline-primary"
                            // onClick={  }  
                        >
                            Search
                        </button>
                    </form>
                </div>

                <div className="col-7">
                    <h4>Results</h4>
                    <hr/>

                    {
                        (q === '')
                            &&
                            <div className="alert alert-info">
                                search a hero
                            </div>
                    }

                    {
                        (q !== '' && heroesFiltered.length === 0)
                            &&
                            <div className="alert alert-danger">
                                no hay heroes con ese nombre { q }
                            </div>
                    }

                    {
                        heroesFiltered.map( hero => (
                            <HeroCard 
                                key={ hero.id }
                                { ...hero }
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
