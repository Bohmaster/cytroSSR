import React from 'react';
import withSSR from '../components/withSSR';
import axios from 'axios';
import Lightbox from 'react-image-lightbox';
import GoogleMapReact from 'google-map-react';

// import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app

const AnyReactComponent = ({ text }) => <div style={{
                          width: 15,
                          height: 15,
                          backgroundColor: 'red'
                        }}>{text}</div>;

class PropDetalle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photoIndex: 0,
      isOpen: false,
      lat: 0,
      lng: 0
    };
  }

  // This works similarly to Next.js's `getInitialProps`
  static getInitialData({ req, res, match }) {
    return new Promise((resolve, reject) => {
      const propId = match.params.propId;
      console.log('HEY', propId);
      axios.get('http://zitroinmobilaria.com:3005/api/Propiedads/' + propId, {
        params: {
          include: 'contacto'
        }
      })
        .then(prop => {
          const makeAddress = () => {
            let res = prop.data.direccion.split(" ");

            let geoAddr = `address=${res[res.length-1]}`;

            for (let i = 0; i < res.length - 1; i++) {
              geoAddr += `+${res[i]}`
            }
 
            let location = prop.data.localidad.split(' ');

            for (let i = 0; i < location.length; i++) {
              i === 0 ? geoAddr += `, ${location[i]}` :
                geoAddr += `+${location[i]}`
            }

            geoAddr += ', Argentina';
            
            console.log('merca', geoAddr);
            return geoAddr;
          }
          axios.get('http://zitroinmobilaria.com:3005/api/Contactos/' + prop.data.contactoId)
            .then(ctc => {
              prop.data.contacto = ctc.data;
              axios.get(`https://maps.googleapis.com/maps/api/geocode/json?${makeAddress()}&key=AIzaSyDCPoPkBr7xqz0YNxeNi94n-YhrtAH5ID8`)
                .then((res) => {
                  const lat = res.data.results[0].geometry.location.lat;
                  const lng = res.data.results[0].geometry.location.lng;
                  prop.data.lat = lat;
                  prop.data.lng = lng;
                  console.log('prop', prop.data);
                  resolve({
                    propiedad: prop.data
                  })
                })
                .catch(err => {
                  console.log('err', err)
                })  
            })
        })
    });
  }

  componentDidMount() {
    
  }

  getTheFuckingAddress() {
    let addr = this.props.propiedad.direccion.split(" ");
    
  }

  getTheFuckingPhotos() {
    let array = [];

    for (let i = 0; i < 6; i++) {
      if (this.props.propiedad['foto_' + (i+1)]) {
        console.log('photo', this.props.propiedad['foto_' + (i+1)])
        if (i === 0) {
          array.push('http://zitroinmobilaria.com:3005/api/containers/thumbs/download/' + this.props.propiedad['foto_' + (i+1)])
        } else {
          array.push('http://zitroinmobilaria.com:3005/api/containers/images/download/' + this.props.propiedad['foto_' + (i+1)])
        }
      } else {
        console.log('orto', this.props.propiedad['foto_' + (i+1)])
      }
    }
    
    return array;
  }

  render() {
    const { propiedad } = this.props;
    const { photoIndex, isOpen } = this.state;

    const images = this.getTheFuckingPhotos();

    return (
      <div className="section-3">
        <div className="div-block-6" style={{ backgroundImage: "url(" + 'http://zitroinmobilaria.com:3005/api/containers/thumbs/download/' + propiedad['foto_1'] + ")" }}>
          <div data-w-id="1cc02ff7-1130-7824-be9b-ebfe0c6277d3" style={{ opacity: '0.45', WebkitTransform: 'translateX(0) translateY(0PX) translateZ(0) scaleX(1) scaleY(1) scaleZ(1) rotateX(0) rotateY(0) rotateZ(0) skewX(0) skewY(0)', MozTransform: 'translateX(0) translateY(0PX) translateZ(0) scaleX(1) scaleY(1) scaleZ(1) rotateX(0) rotateY(0) rotateZ(0) skewX(0) skewY(0)', msTransform: 'translateX(0) translateY(0PX) translateZ(0) scaleX(1) scaleY(1) scaleZ(1) rotateX(0) rotateY(0) rotateZ(0) skewX(0) skewY(0)', transform: 'translateX(0) translateY(0PX) translateZ(0) scaleX(1) scaleY(1) scaleZ(1) rotateX(0) rotateY(0) rotateZ(0) skewX(0) skewY(0)' }} className="div-block-17" />
        </div>
        <div className="div-block-8">
          <h1 className="heading-5">{`${propiedad.tipoPropiedad} - ${propiedad.dormitorios} - ${propiedad.localidad} - ${propiedad.direccion}`}</h1>
        </div>
        <div className="div-block-7">
          <div className="row w-row">
            <div className="column-6 w-col w-col-9">
              <div className="row-2 w-row">
                <div className="w-col w-col-6">
                  <div className="map" id="gmap">
                  <div style={{ height: '100%', width: '100%' }}>
                    <GoogleMapReact
                      bootstrapURLKeys={{key: 'AIzaSyDG1dTFB530yxf1pDyUkf0or67f0-IK4yY'}}
                      defaultCenter={{
                          lat: propiedad.lat,
                          lng: propiedad.lng
                      }}
                      defaultZoom={16}
                    >
                      <AnyReactComponent
                        lat={propiedad.lat}
                        lng={propiedad.lng}
                      />
                    </GoogleMapReact>
                  </div>
                  </div>
                </div>
                <div className="w-col w-col-6">
                  <div className="datospropiedad">
                    <div className="titulo">caracteristicas</div>
                    <div className="itempropiedad">Código de refernecia: 0001</div>
                    <div className="divitem">
                      <div className="txtpropiedad _2">Código de referencia: </div>
                      <div className="txtpropiedad _2 negrita">{propiedad.codigoReferencia}</div>
                    </div>
                    <div className="divitem">
                      <div className="txtpropiedad _2 azul">Apta crédito:</div>
                      <div className="txtpropiedad _2 negrita">{propiedad.aptaCredito}</div>
                    </div>
                    <div className="divitem">
                      <div className="txtpropiedad _2" az>Piso:<br /></div>
                      <div className="txtpropiedad _2 negrita">{propiedad.piso}</div>
                    </div>
                    <div className="divitem">
                      <div className="txtpropiedad _2">Acceso:<br /></div>
                      <div className="txtpropiedad _2 negrita">{propiedad.acceso}</div>
                    </div>
                    <div className="divitem">
                      <div className="txtpropiedad _2">Cochera: <br /></div>
                      <div className="txtpropiedad _2 negrita">{propiedad.cochera}</div>
                    </div>
                    <div className="divitem">
                      <div className="txtpropiedad _2">Baños: <br /></div>
                      <div className="txtpropiedad _2 negrita">{propiedad.banios}</div>
                    </div>
                    <div className="divitem">
                      <div className="txtpropiedad _2">Antiguedad:<br /></div>
                      <div className="txtpropiedad _2 negrita">{propiedad.antiguedad}</div>
                    </div>
                    <div className="divitem">
                      <div className="txtpropiedad _2">Plantas: <br /></div>
                      <div className="txtpropiedad _2 negrita">{propiedad.plantas}</div>
                    </div>
                    <div className="divitem">
                      <div className="txtpropiedad _2">Sup. terreno:<br /></div>
                      <div className="txtpropiedad _2 negrita">{propiedad.supTerreno}</div>
                    </div>
                    <div className="divitem">
                      <div className="txtpropiedad _2">Sup. cubierta:<br /></div>
                      <div className="txtpropiedad _2 negrita">{propiedad.supCubierta}</div>
                    </div>
                    <div className="divitem">
                      <div className="txtpropiedad _2">Sup. semicubierta:<br /></div>
                      <div className="txtpropiedad _2 negrita">{propiedad.supSemiCubierta}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="div-block-9">
                <div className="text-block-4">PRECIO:</div>
                <div className="text-block-5">{propiedad.precio}</div>
              </div>
              <div className="descripcionpropiedad">
                <div className="titulo">Descripción del inmueble</div>
                <p className="txtpropiedad _2 parr">
                  {propiedad.descripcion}
                </p>
              </div><a href="#" className="lightbox-link w-inline-block w-lightbox">
                <img src={'http://zitroinmobilaria.com:3005/api/containers/thumbs/download/' + propiedad['foto_1']} sizes="(max-width: 479px) 99vw, (max-width: 767px) 98vw, (max-width: 991px) 72vw, 64vw" className="image-6" />
                <div data-w-id="895b7f29-a015-a1e1-4dcf-7958f7f1b4b7" className="div-block-11">
                  <div data-w-id="80a4786e-a09e-c446-6e7f-a970df2cf208" className="text-block-6" onClick={() => this.setState({ isOpen: true })}>
                    Hacer click para ir a galería de imágenes
                  </div>
                  {isOpen && (
                    <Lightbox
                      mainSrc={images[photoIndex]}
                      nextSrc={images[(photoIndex + 1) % images.length]}
                      prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                      onCloseRequest={() => this.setState({ isOpen: false })}
                      onMovePrevRequest={() =>
                        this.setState({
                          photoIndex: (photoIndex + images.length - 1) % images.length,
                        })
                      }
                      onMoveNextRequest={() =>
                        this.setState({
                          photoIndex: (photoIndex + 1) % images.length,
                        })
                      }
                    />
                  )}
                </div>
              </a>
              <div className="titulo">consultenos</div>
              <div className="otronavbar"><a href="#" className="brand-2 w-nav-brand"><img src="images/logoFinalChico.png" className="image-3" /></a>
                <div data-collapse="medium" data-animation="default" data-duration={400} className="navbar-2 w-nav">
                  <nav role="navigation" className="nav-menu-2 w-clearfix w-nav-menu"><a href="contacto.html" target="_blank" className="navlink3 w-nav-link">contacto</a><a href="empresa.html" target="_blank" className="navlink3 w-nav-link">empresa</a><a href="servicios.html" target="_blank" className="navlink3 w-nav-link">servicios</a><a href="propiedades.html" target="_blank" className="navlink3 w-nav-link">propiedades</a><a href="index.html" target="_blank" className="navlink3 w-nav-link">inicio</a></nav>
                  <div className="menu-button w-nav-button">
                    <div className="w-icon-nav-menu" />
                  </div>
                </div>
              </div>
              <div className="row-3 w-row">
                <div className="w-col w-col-6">
                  <div className="div-block-16">
                    <div className="divitem">
                      <div className="txtpropiedad _2 blanco">Contacto:</div>
                      <div className="txtpropiedad _2 negrita blanco">{propiedad.contacto.nombre}</div>
                    </div>
                    <div className="divitem">
                      <div className="txtpropiedad _2 blanco">Mail:</div>
                      <div className="txtpropiedad _2 negrita blanco">{propiedad.contacto.email}</div>
                    </div>
                    <div className="divitem">
                      <div className="txtpropiedad _2 blanco">Teléfono:</div>
                      <div className="txtpropiedad _2 negrita blanco">{propiedad.contacto.telefono}</div>
                    </div>
                  </div>
                  <div className="sharepropiedad w-clearfix">
                    <div className="text-block-7">Compartir publicación de la propiedad</div>
                    <div className="html-embed dos w-embed w-script">
                      {/*  AddToAny BEGIN  */}
                      <div className="a2a_kit a2a_kit_size_32 a2a_default_style">
                        <a className="a2a_dd" href="https://www.addtoany.com/share" />
                        <a className="a2a_button_facebook" />
                        <a className="a2a_button_twitter" />
                        <a className="a2a_button_google_plus" />
                        <a className="a2a_button_whatsapp" />
                      </div>
                      {/*  AddToAny END  */}
                    </div>
                  </div>
                </div>
                <div className="w-col w-col-6">
                  <div className="w-form">
                    <form id="email-form" name="email-form" data-name="Email Form"><input type="text" className="inputform w-input" maxLength={256} name="name" data-name="Name" placeholder="Nombre" id="name" /><input type="text" className="inputform w-input" maxLength={256} name="email" data-name="Email" placeholder="Email" id="email" required /><input type="text" className="inputform w-input" maxLength={256} name="telefono" data-name="telefono" placeholder="Teléfono" id="telefono" /><textarea id="field" name="field" placeholder="Consulta (no es nescesario especificar datos de la propiedad, se utiliza el código de ref)" maxLength={5000} required className="inputform w-input" defaultValue={""} />
                      <div className="divitem">
                        <div className="txtpropiedad _2">Código de referencia:</div>
                        <div className="txtpropiedad _2 negrita">{propiedad.codigoReferencia}</div>
                      </div>
                      <div className="div-block-10" /><input type="submit" defaultValue="ENVIAR" data-wait="Please wait..." className="submit-button w-button" /></form>
                    <div className="w-form-done">
                      <div>Thank you! Your submission has been received!</div>
                    </div>
                    <div className="w-form-fail">
                      <div>Oops! Something went wrong while submitting the form.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="column w-col w-col-3">
              <div className="text-block-3">Otras propiedades relacionadas</div>
              {/* <div className="divpropiedad"><img src="images/propiedad.jpg" srcSet="images/propiedad-p-500.jpeg 500w, images/propiedad.jpg 800w" sizes="(max-width: 479px) 99vw, (max-width: 767px) 98vw, (max-width: 991px) 22vw, 21vw" className="imgpropiedad" />
                <div className="divvendida"><img src="images/vendida_1.png" className="imgvendida" /></div>
                <div className="divdatospropiedad">
                  <h2 className="heading-4">Rosario Casa &nbsp;2 dormitorios</h2>
                  <div className="txtpropiedad">Av. Pellegrini 1343<br />xxxxx</div>
                </div>
                <div className="divaptocredito">Apta Crédito</div>
              </div>
              <div className="divpropiedad"><img src="images/propiedad.jpg" srcSet="images/propiedad-p-500.jpeg 500w, images/propiedad.jpg 800w" sizes="(max-width: 479px) 99vw, (max-width: 767px) 98vw, (max-width: 991px) 22vw, 21vw" className="imgpropiedad" />
                <div className="divvendida"><img src="images/vendida_1.png" className="imgvendida" /></div>
                <div className="divdatospropiedad">
                  <h2 className="heading-4">Rosario Casa &nbsp;2 dormitorios</h2>
                  <div className="txtpropiedad">Av. Pellegrini 1343<br />xxxxx</div>
                </div>
                <div className="divaptocredito">Apta Crédito</div>
              </div>
              <div className="divpropiedad"><img src="images/propiedad.jpg" srcSet="images/propiedad-p-500.jpeg 500w, images/propiedad.jpg 800w" sizes="(max-width: 479px) 99vw, (max-width: 767px) 98vw, (max-width: 991px) 22vw, 21vw" className="imgpropiedad" />
                <div className="divvendida"><img src="images/vendida_1.png" className="imgvendida" /></div>
                <div className="divdatospropiedad">
                  <h2 className="heading-4">Rosario Casa &nbsp;2 dormitorios</h2>
                  <div className="txtpropiedad">Av. Pellegrini 1343<br />xxxxx</div>
                </div>
                <div className="divaptocredito">Apta Crédito</div>
              </div> */}
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default withSSR(PropDetalle);
