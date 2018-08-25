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
        <div className="div-block-12 empre">
          <div className="div-block-13 empresa">
            <h1 className="heading-6">nuestra empresa</h1>
          </div>
        </div>
        <div className="div-block-14">
          <h2 className="h2empresa">Somos una empresa joven, que responde a las nuevas necesidades de mercado en constante crecimiento.</h2>
          <p className="parrempresa">Nuestro compromiso es ofrecer a nuestros clientes un asesoramiento inmobiliario integral y altamente profesional, así como la máxima confiabilidad, seguridad y reserva .</p>
          <div className="row-5 w-row">
            <div className="column-7 w-col w-col-6">
              <div className="divstaff"><img src="images/diegoOrtiz.jpg" className="image-7" />
                <div className="div-block-15">
                  <h3 className="h3staff">Diego Ortiz</h3>
                  <div className="txtstaff">Director</div>
                </div>
              </div>
            </div>
            <div className="w-col w-col-6">
              <div className="divstaff"><img src="images/gelyMeretta.jpg" className="image-7" />
                <div className="div-block-15">
                  <h3 className="h3staff">Gely Meretta<br /></h3>
                  <div className="txtstaff">Asociada</div>
                </div>
              </div>
            </div>
          </div>
          <div className="row-5 w-row">
            <div className="column-8 w-col w-col-6" />
            <div className="w-col w-col-6" />
          </div>
        </div>
      </div>
    );
  }
}

export default withSSR(About);
