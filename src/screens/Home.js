import React from 'react';
import withSSR from '../components/withSSR';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  // This works similarly to Next.js's `getInitialProps`
  static getInitialData() {
    return new Promise((resolve, reject) => {
      axios.get('http://zitroinmobilaria.com:3005/api/Propiedads')
        .then(props => {
          resolve({
            propiedades: props.data
          })
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

  formatCols = (array) => {
    let newArray = [];

    for (let i = 0; i < array.length; i += 2) {
        let innerArray = [];
        innerArray.push(array[i], array[i+1]);
        newArray.push(innerArray);
    }
    return newArray;
  }

  makeSearchUrl = () => {
    return `?tipoOperacion=${this.state.searchFilters.operacion}&localidad=${this.state.searchFilters.localidad}&tipoPropiedad=${this.state.searchFilters.propiedad}&dormitorios=${this.state.searchFilters.dormitorios}`
  }

  render() {
    const { propiedades } = this.props;
    console.log(propiedades);
    return (
      <div>
        <div data-w-id="6b656407-aeb2-e1b1-35b4-0885e0bcc1aa">
          <div data-delay={5000} data-animation="cross" className="slider w-slider" data-autoplay={1} data-easing="ease-in" data-nav-spacing={5} data-duration={1000} data-infinite={1}>
            <div className="sobreslider">
              <h1 className="heading">ZITRO INMOBILIARIA</h1>
              <div className="social"><a href="#" className="linksocial w-inline-block"><img src="images/face.png" alt="icono Facebook" className="imgicon" /></a><a href="#" className="linksocial w-inline-block"><img src="images/twitter.png" alt="icono twitter" className="imgicon" /></a><a href="#" className="linksocial w-inline-block"><img src="images/google.png" alt="icono Google" className="imgicon" /></a></div>
            </div>
            <div className="mask w-slider-mask">
              <div className="slide _1 w-slide" style={{backgroundImage: `url("http://zitroinmobilaria.com:3005/api/containers/thumbs/download/${propiedades[0]['foto_1']}")`}}>
                <a href="#" className="linkslider w-inline-block">
                  <div className="sobreslide">
                    <h2 className="txtslide">Terrazas al green<br />Exclusivos departamentos</h2>
                  </div>
                </a>
              </div>
              <div className="slide _2 w-slide" style={{backgroundImage: propiedades[0] ? `url("http://zitroinmobilaria.com:3005/api/containers/thumbs/download/${propiedades[1]['foto_1']}")`: null}}>
                <a href="#" className="linkslider w-inline-block">
                  <div className="sobreslide">
                    <h2 className="txtslide">Terrazas al green<br />Departamento 2 dormitorios</h2>
                  </div>
                </a>
              </div>
            </div>
            <div className="left-arrow w-slider-arrow-left">
              <div className="w-icon-slider-left" />
            </div>
            <div className="right-arrow w-slider-arrow-right">
              <div className="w-icon-slider-right" />
            </div>
            <div className="w-slider-nav w-shadow" />
          </div>
        </div>
        <div data-w-id="406668e7-ec8c-c6b0-2988-2cb3588e25e2" className="divnavbar">
          <div data-collapse="medium" data-animation="default" data-duration={400} className="navbar w-nav"><a href="#" className="brand w-nav-brand"><img src="images/logoFinalChico.png" /></a>
            <nav role="navigation" className="nav-menu w-nav-menu"><a href="index.html" className="navlink w-nav-link w--current">Inicio</a><a href="propiedades.html" className="navlink w-nav-link">Propiedades</a><a href="servicios.html" className="navlink w-nav-link">SERVICIOS</a><a href="empresa.html" className="navlink w-nav-link">EMPRESA</a><a href="contacto.html" className="navlink ctacto w-nav-link">Contacto</a></nav>
            <div className="w-nav-button">
              <div className="w-icon-nav-menu" />
            </div>
          </div>
          <div className="div-block" />
          <div className="wrapperdatos">
            <div className="divdatosidebar">
              <div className="div-block-2">
                <div className="txtsidebar">Av. Pte. Perón 8615| PB-03 | Rosario</div>
              </div><img src="images/localizacion.png" className="imgiconsidebar" /></div>
            <div className="divdatosidebar fijo">
              <div className="div-block-2"><a className="txtsidebar">0341 4525755</a></div><img src="images/phone.png" className="imgiconsidebar" /></div>
            <div className="divdatosidebar">
              <div className="div-block-2"><a href="#" className="txtsidebar">0341 640-6327</a></div><img src="images/cellPhone.png" className="imgiconsidebar" /></div>
            <div className="divdatosidebar">
              <div className="div-block-2"><a className="txtsidebar">info@zitroinmobiliaria.com</a></div><img src="images/mail.png" className="imgiconsidebar" /></div>
          </div>
        </div>
        <div data-w-id="d0a952cd-75b7-781f-9e52-3ddc6da731d6" className="section">
          <div className="buscadorinicio">
            <div className="text-block-8">Buscador de propiedades</div>
            <div className="buscador inicio">
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
                          <option value>Elije una...</option>
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
                            <option value="1 Dormitorios">1 Dormitorio</option>
                            <option value="2 Dormitorios">2 Dormitorios</option>
                            <option value="3 Dormitorios">3 Dormitorios</option>
                            <option value="4 Dormitorios">4 Dormitorios o màs</option>
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
          </div>
          <div className="divrubros">
            <div className="w-row">
              <div className="w-col w-col-6">
                <div className="divrubro">
                  <h2 className="h2rubro">Compraventas</h2>
                  <h2 className="h2rubro">Alquileres</h2>
                  <h2 className="h2rubro">Tasaciones</h2>
                </div>
              </div>
              <div className="w-col w-col-6">
                <div className="divrubro">
                  <h2 className="h2rubro">Emprendimientos</h2>
                  <h2 className="h2rubro">Desarrollos inmobiliarios</h2>
                  <h2 className="h2rubro">Asesoramiento inmobiliario integral<br /></h2>
                </div>
              </div>
            </div>
          </div>
          <div className="divdestaca">
            <div className="titluloseccion">Propiedades destacadas</div>
            {
              this.formatCols(propiedades).map((props, idx) => (
                <div data-w-id="32e76d31-814a-dd90-7bb8-23e2e15c390f" style={{ opacity: 0 }} className="rowdestaca w-row" key={idx}>
                  { props[0] && 
                  <div className="w-col w-col-6">
                  <a href={'/propiedad?propId=' + props[0].id} class="propdestaca w-inline-block">

                    <img src={'http://zitroinmobilaria.com:3005/api/containers/mercas/download/' + props[0]['foto_1_thumb']} />
                      <div className="datosdestaca">
                        <h2 className="heading-2">{props[0].tipoPropiedad + ' ' + props[0].dormitorios}</h2>
                        <div className="txtdestaca">{props[0].direccion + ' ' + props[0].localidad}><br />
                        </div>
                      </div>
                      {
                            props[0].vendidaOalquilada === "vendida" && (
                              <div className="vendida">
                                <img src="images/vendida_2.png" className="image-2" style={{display: 'block'}}/>
                              </div>
                            )
                          }
                      {
                        props[0].aptaCredito === "true" && (
                          <div className="divaptocredito">Apta Crédito</div>
                        )
                      }
                        </a>

                  </div>
                }
                { props[1] && <div className="w-col w-col-6">
                    <div className="detalledestaca">
                      <div className="txtdestaca">
                        <a href={'/propiedad?propId=' + props[1].id} class="propdestaca w-inline-block">
                          <img src={'http://zitroinmobilaria.com:3005/api/containers/mercas/download/' + props[1]['foto_1_thumb']} />
                          <div className="datosdestaca">
                          <h2 className="heading-2">{props[1].tipoPropiedad + ' ' + props[1].dormitorios}</h2>
                          <div className="txtdestaca">{props[1].direccion + ' ' + props[1].localidad}<br /></div>
                          {
                            props[1].vendidaOalquilada === "vendida" && (
                              <div className="vendida" style={{display: 'block'}}>
                                <img src="images/vendida.png" className="image-2" />
                              </div>
                            )
                          }
                      {
                        props[1].aptaCredito === "true" && (
                          <div className="divaptocredito">Apta Crédito</div>
                        )
                      }</div></a>
                          </div>
                    </div>
                  </div>
                }
                </div>
              ))
            }
            <a href="/propiedades" className="vermasprop w-button">ver todas las propiedades</a></div>
        </div>
      </div>
    );
  }
}

export default withSSR(Home);
