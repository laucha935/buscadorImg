import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Buscador from './components/Buscador';
import Resultado from './components/Resultado';

class App extends Component {

  state = {
    termino: '',
    imagenes: [],
    pagina:''
  }

  paginaAnterior = () => {
    //leer el estado de la pagina actual
      let pagina = this.state.pagina;
    //Leer si la pagina es 1, ya no ir hacia atras
       if(pagina ===1) return null;
    //Resta uno a la pagina actual
       pagina -=1;
    //Agregar el cambio al state
       this.setState({
         pagina
       }, () =>{
         this.consultarApi();
       });
  }

  paginaSiguiente= () => {
    //Leer el state de la pagina actual
      let pagina = this.state.pagina;
    //Sumar uno a la página actual
       pagina++;
    //Agregar el cambio al state
       this.setState({
         pagina
       },() => {
         this.consultarApi();
       });
  }

  consultarApi = () => {
    const termino = this.state.termino;
    const pagina = this.state.pagina;
    const url = `https://pixabay.com/api/?key=14407206-4f17bd009726f8a94cf78aec0&q=${termino}&per_page=30&page=${pagina}`;

    fetch(url)
    .then(respuesta => respuesta.json())
    .then (resultado => this.setState({imagenes : resultado.hits}))

  }


  

  datosBusqueda = (termino) => {
    this.setState({
      termino:termino,
      pagina:1
    }, () => {
      this.consultarApi();
    })
  }

  render() {
  return (
    <div className="App container">
      <div className="jumbotron">
         <p className="lead text-center">
            Buscador de Imágenes</p>
         <Buscador datosBusqueda={this.datosBusqueda}></Buscador>
         <Resultado imagenes={this.state.imagenes}
                    paginaAnterior={this.paginaAnterior}
                    paginaSiguiente={this.paginaSiguiente}
         ></Resultado>

      </div>
      
    </div>
  );
}

}
export default App;
