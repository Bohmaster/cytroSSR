import React from 'react';
import withSSR from '../components/withSSR';

class About extends React.Component {
  // This works similarly to Next.js's `getInitialProps`
  static getInitialData({ match, req, res }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          article: `
This text is ALSO server rendered if and only if it's the initial render.
          `,
          currentRoute: match.pathname,
        });
      }, 500);
    });
  }

  render() {
    const { isLoading, article, error } = this.props;
    return (
      <div className="servicios">
      <div className="div-block-12">
        <div className="div-block-13">
          <h1 className="heading-6">Nuestros servicios</h1>
        </div>
      </div>
      <div className="row-4 w-row">
        <div className="column-2 w-col w-col-6">
          <div className="divservicio">
            <h2 className="h2servicio">Compraventas<br /></h2>
            <p className="parrservicio">Asesoramiento permanente y seguimiento de las operaciones.</p>
          </div>
        </div>
        <div className="column-3 w-col w-col-6">
          <div className="divservicio">
            <h2 className="h2servicio">Alquileres<br /></h2>
            <p className="parrservicio">Pago puntual de alquileres e impuestos sobre los inmuebles dados en administración. Verificación previa de riesgo y antecedentes de locatarios.</p>
          </div>
        </div>
      </div>
      <div className="row-4 w-row">
        <div className="column-2 w-col w-col-6">
          <div className="divservicio">
            <h2 className="h2servicio">Tasaciones<br /></h2>
            <p className="parrservicio">Reales y efectuadas en base a un conocimiento pleno del mercado inmobiliario sobre inmuebles en general, terrenos, etc.</p>
          </div>
        </div>
        <div className="column-3 w-col w-col-6">
          <div className="divservicio">
            <h2 className="h2servicio">Emprendimientos<br /></h2>
            <p className="parrservicio">Orientación y asesoramiento sobre inversiones relacionadas con los mismos.</p>
          </div>
        </div>
      </div>
      <div className="row-4 w-row">
        <div className="column-2 w-col w-col-6">
          <div className="divservicio">
            <h2 className="h2servicio">Desarrollos inmobiliarios<br /></h2>
            <p className="parrservicio">Orientación y asesoramiento sobre inversiones relacionadas con los mismos.</p>
          </div>
        </div>
        <div className="column-3 w-col w-col-6">
          <div className="divservicio">
            <h2 className="h2servicio">Asesoramiento inmobiliario integral<br /></h2>
            <p className="parrservicio">Contamos con asesoramiento de abogados y arquitectos para darle un servicio integral en todas las instancias del proceso. Hemos logrado formar un sólido equipo de trabajo de diferentes áreas para orientarlo y acompañarlo en sus operaciones inmobiliarias.</p>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default withSSR(About);
