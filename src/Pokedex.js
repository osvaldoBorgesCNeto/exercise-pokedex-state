import React from 'react';
import Pokemon from './Pokemon';
import Button from './Button';

class Pokedex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: 0,
      filterType: 'all',
		}
		
		this.changePokemon = this.changePokemon.bind(this);
		this.filterTypePokemon = this.filterTypePokemon.bind(this);
		this.allPokemons = this.allPokemons.bind(this);
  }

  changePokemon(numberPokemon) {
		this.setState((estadoAnterior, _props) => ({ filter: estadoAnterior.filter + 1 }));
    if ((this.state.filter + 1) >= numberPokemon) {
      this.setState((estadoAnterior, _props) => ({ filter: estadoAnterior.filter = 0 }));
    }
  }

  filterTypePokemon(type) {
		this.setState({ filterType: type, filter: 0 });
		this.allPokemons();
	}
	
	allPokemons() {
		const { pokemons } = this.props;
		const { filterType } = this.state;

		return pokemons.filter(pokemon => {
			if (filterType === 'all') return true;
			return pokemon.type === filterType;
		}) 
	}

  render() {
		const allPokemons = this.allPokemons();
		const pokemon = allPokemons[this.state.filter];
		const { pokemons } = this.props;
		const pokeTypes = pokemons.reduce((acc, curr) => acc.includes(curr.type) ? acc : [ ...acc, curr.type], []);

		return (
			<div className="pokedex">
				<Pokemon pokemon={pokemon} key={pokemon.id}/>
				<div className="pokedex">
					<Button onClick={() => this.filterTypePokemon('all')} text={'All'}/>
					{pokeTypes.map(pokemon => <Button onClick={() => this.filterTypePokemon(pokemon)} key={pokemon} text={pokemon}/>)}
      	</div>
        <Button onClick={() => this.changePokemon(allPokemons.length)} disabled={ allPokemons.length <= 1 } text={'Proximo'}/>
			</div>
		);
	}
}

export default Pokedex;