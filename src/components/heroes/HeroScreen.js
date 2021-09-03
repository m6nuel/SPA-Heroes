import React, { useMemo } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { getHeroeById } from '../../selectors/getHeroeById';


export const HeroScreen = ({ history }) => {

    const { heroeId } = useParams();

    const hero = useMemo(() => getHeroeById( heroeId ), [heroeId])
    // const hero = getHeroeById( heroeId );

    if ( !hero ) {
        return <Redirect to="/"/>;
    }

    const {
        superhero,
        publisher,
        alter_ego,
        first_appearance,
        characters
    } = hero

    const handleReturn = () => {

        if ( history.length >=2 ) {
            history.push('/');
        } else {
            history.goBack();
        }
    }

    document.documentElement.style.setProperty('--animate-duration', '4s');

    return (
        <div className="row mt-5" >
            <h3 className="animate__animated animate__fadeInLeft" style={{color:'red'}}>I R O N I N D U S T R I A L</h3>

            <div className="col-5">
                <img
                    src={`../assets/heroes/${ heroeId}.jpg`}
                    alt={ superhero }
                    className="img-tumbnail animate__animated animate__fadeInLeft"
                />
            </div>

            <div className="col-7">
                <h3> { superhero } </h3>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"> <b>Alter ego: </b> { alter_ego } </li>
                    <li className="list-group-item"> <b>publisher:  </b> { publisher } </li>
                    <li className="list-group-item"> <b>Primera Aparicion: </b> { first_appearance } </li>
                </ul>

                <h5> Caracter </h5>
                <p> { characters } </p>

                <button 
                    className="btn btn-outline-primary"
                    onClick={ handleReturn }
                >
                    Return
                </button>
            </div>
        </div>
    )
}
