import Link from 'react-router-dom/Link';
import React from 'react';
import Route from 'react-router-dom/Route';
import UserDetail from './UserDetail';
import HttpStatus from '../components/HttpStatus';
import withSSR from '../components/withSSR';
import axios from 'axios';

class Users extends React.Component {
  static getInitialData({ req, res, match }) {
    console.log('ASDADSA', match.params)
    let where = {};

    for (let key in match.params) {
      match.params[key] !== '' ? where[key] = match.params[key] : null
    }

    return new Promise((resolve, reject) => {
      axios.get('http://zitroinmobiliaria.com:3005/api/Propiedads', {
        params: {
          filter: {
            where
          }
        }
      })
        .then(prop => {
          ('ASD', prop)
          resolve({
            resultados: prop.data
          })
        })
        .catch(err => {
          console.log(err, 'error')
        })
    });
  }

  state = {
    searchFilters: {
     operacion: '',
     localidad: '',
     propiedad: '',
     dormitorios: ''
    }
  }

  onLocationChange = (event) => {
    console.log(event.target.value);
    this.setState({
      searchFilters: {
        ...this.state.searchFilters,
        localidad: event.target.value
      }
    }, () => console.log(this.state))
  }

  onPropertyChange = (event) => {
    this.setState({
      searchFilters: {
        ...this.state.searchFilters,
        propiedad: event.target.value
      }
    }, () => console.log(this.state))
    console.log(event.target.value);
  }

  onTypeChange = (event) => {
    console.log(event.target.value);
    this.setState({
      searchFilters: {
        ...this.state.searchFilters,
        operacion: event.target.value
      }
    }, () => console.log(this.state))
  }

  onDormChange = (event) => {
    this.setState({
      searchFilters: {
        ...this.state.searchFilters,
        dormitorios: event.target.value
      }
    }, () => console.log(this.state))
    console.log(event.target.value);

  }
   
  makeSearchUrl = () => {
    return `?tipoOperacion=${this.state.searchFilters.operacion}&localidad=${this.state.searchFilters.localidad}&tipoPropiedad=${this.state.searchFilters.propiedad}&dormitorios=${this.state.searchFilters.dormitorios}`
  }

  formatCols = (array) => {
    let newArray = [];

    if (array) {
      for (let i = 0; i < array.length; i += 3) {
        let innerArray = [];
        innerArray.push(array[i], array[i+1], array[i+2]);
        newArray.push(innerArray);
      }
    }
    return newArray;
  }

  render() {
    const { isLoading, resultados, error } = this.props;

    return (
      <div>
        <div className="buscador" style={{marginTop: 60}}>
        <div className="w-form">
                <form>
                  <div className="div-block-4">
                    <div className="radiobuttonbuscador w-radio">
                      <input type="radio" onChange={this.onTypeChange} id="venta" name="tipoDeOperacion" defaultValue="venta" required className="w-radio-input" />
                      <label htmlFor="venta" className="w-form-label">Venta</label></div>
                    <div className="radiobuttonbuscador w-radio">
                      <input type="radio" onChange={this.onTypeChange} id="alquiler" name="tipoDeOperacion" defaultValue="alquiler" required className="w-radio-input" />
                      <label htmlFor="alquiler" className="w-form-label">Alquiler</label></div>
                  </div>
                  <div className="w-row">
                  <div className="w-col w-col-3 w-col-medium-6">
                      <div>
                        <div className="txtbuscador">Localidad</div>
                        <select onChange={this.onLocationChange} id="field-5" name="field-5" className="inputbuscador w-select">
                          <option value>Elije uno</option>
                          <option value="Rosario">Rosario</option>
                          <option value="Funes">Funes</option>
                          <option value="Roldan">Roldan</option>
                          <option value="Otros">Otros</option>
                        </select>
                      </div>
                    </div>
                    <div className="w-col w-col-3 w-col-medium-6">
                      <div>
                        <div className="txtbuscador">Tipo de propiedad</div>
                          <select onChange={this.onPropertyChange} id="field-5" name="field-5" className="inputbuscador w-select">
                            <option value>Elije una...</option>
                            <option value="Casa">Casa</option>
                            <option value="Departamento">Departamento</option>
                            <option value="Terreno">Terreno</option>
                            <option value="Barrio privado">Barrio privado</option>
                            <option value="Barrio abierto">Barrio abierto</option>
                            <option value="Local/Oficina">Local/Oficina</option>
                            <option value="Campo">Campo</option>
                            <option value="Galpon">Galpon</option>
                            <option value="Cochera">Cochera</option>
                          </select>
                        </div>
                    </div>
                    <div className="w-col w-col-3 w-col-medium-6">
                      <div>
                        <div className="txtbuscador">Dormitorios</div>
                          <select onChange={this.onDormChange} id="field-5" name="field-5" className="inputbuscador w-select">
                            <option value>Elije uno...</option>
                            <option value="Monoambiente">Monoambiente</option>
                            <option value="1 Dormitorio">1 Dormitorio</option>
                            <option value="2 Dormitorio">2 Dormitorios</option>
                            <option value="3 Dormitorio">3 Dormitorios</option>
                            <option value="4 Dormitorio">4 Dormitorios o màs</option>
                          </select></div>
                    </div>                  
        
                    <div className="w-col w-col-3 w-col-medium-6">
                      <div>
                        <div className="txtbuscador">Búsqueda directa</div>
                          <input type="text" className="inputnroreferencia w-input" maxLength={256} name="field-6" placeholder="Código de referencia" id="field-6" /></div>
                    </div>
                  </div>
                    <a href={'/buscar' + this.makeSearchUrl()}>
                      <input className="botonbuscar w-button" defaultValue="Buscar"/>
                    </a>
                  </form>
              </div>
              <div className="wrapperbuscador"><img src="images/buscador.png" className="image-4" />
                <div className="text-block-2">Buscador de propiedades</div>
                <div className="text-block-2 salir">Salir</div>
              </div>
            </div>
        <div className="section-2">
        <div className="div-block-5">
        </div>
        
        {
          this.formatCols(this.filterVendidas()).map((propiedades, idx) => {
            return (
            <div className="rowpropiedades w-row" key={idx}>
              { propiedades[0] && <div className="w-col w-col-4 w-col-small-small-stack">
                <div className="divpropiedad">
                <a href={'/propiedad?propId=' + propiedades[0].id} className="link-block w-inline-block">
                <img src={'http://zitroinmobiliaria.com:3005/api/containers/mercas/download/' + propiedades[0]['foto_1_thumb']}  />
                <div className="divvendida">
                  {
                    propiedades[0].vendidaOalquilada === 'vendida' && <img src="images/vendida_2.png" className="imgvendida" />
                  }
                  {
                    propiedades[0].vendidaOalquilada === 'alquilada' && <img src="images/alquilada.png" className="imgalquilada" />

                  }
                  {
                    propiedades[0].vendidaOalquilada === 'reservada' && <img src="images/reservada.png" className="imgreservada" />
                  }
                </div>
                <div className="divdatospropiedad">
                <h2 className="heading-4">{propiedades[0].tipoPropiedad + ' ' + propiedades[0].dormitorios}</h2>
                <div className="txtpropiedad">{propiedades[0].direccion + ' ' + propiedades[0].localidad}</div>
                </div><div className="divaptocredito">Apta Crédito</div></a></div>
              </div>
              }
              { propiedades[1] && <div className="w-col w-col-4 w-col-small-small-stack">
                <div className="divpropiedad">
                <a href={'/propiedad?propId=' + propiedades[1].id} className="link-block w-inline-block"><img src={'http://zitroinmobiliaria.com:3005/api/containers/mercas/download/' + propiedades[1]['foto_1_thumb']}  />
                <div className="divvendida">
                {
                    propiedades[1].vendidaOalquilada === 'vendida' && <img src="images/vendida_2.png" className="imgvendida" />
                  }
                  {
                    propiedades[1].vendidaOalquilada === 'alquilada' && <img src="images/alquilada.png" className="imgalquilada" />

                  }
                  {
                    propiedades[1].vendidaOalquilada === 'reservada' && <img src="images/reservada.png" className="imgreservada" />
                  }
                </div>
                <div className="divdatospropiedad">
                <h2 className="heading-4">{propiedades[1].tipoPropiedad + ' ' + propiedades[1].dormitorios}</h2>
                <div className="txtpropiedad">{propiedades[1].direccion + ' ' + propiedades[1].localidad}</div>
                </div><div className="divaptocredito">Apta Crédito
                </div></a></div>
              </div>
              }
              
              { propiedades[2] && <div className="w-col w-col-4 w-col-small-small-stack">
                <div className="divpropiedad">
                <a href={'/propiedad?propId=' + propiedades[2].id} className="link-block w-inline-block"><img src={'http://zitroinmobiliaria.com:3005/api/containers/mercas/download/' + propiedades[2]['foto_1_thumb']}  />
                <div className="divvendida">
                {
                    propiedades[2].vendidaOalquilada === 'vendida' && <img src="images/vendida_2.png" className="imgvendida" />
                  }
                  {
                    propiedades[2].vendidaOalquilada === 'alquilada' && <img src="images/alquilada.png" className="imgalquilada" />

                  }
                  {
                    propiedades[2].vendidaOalquilada === 'reservada' && <img src="images/reservada.png" className="imgreservada" />
                  }
                </div>
                <div className="divdatospropiedad">
                <h2 className="heading-4">{propiedades[2].tipoPropiedad + ' ' + propiedades[2].dormitorios}</h2>
                <div className="txtpropiedad">{propiedades[2].direccion + ' ' + propiedades[2].localidad}</div>
                </div><div className="divaptocredito">Apta Crédito
                </div></a></div>
               </div>}

            </div>
          )})
        }

        <div className="div-block-5">
        </div>
      </div>
        
      </div>
    )

  }
}

export default withSSR(Users);
