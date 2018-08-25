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
      <div>
        <div className="contacto">
          <h1 className="h1contacto">Contáctese con nosotros</h1>
          <h2 className="h2ctacto">Nos comunicaremos con usted a la brevedad</h2>
        </div>
        <div className="section-4">
          <div className="row-6 w-row">
            <div className="w-col w-col-6">
              <div className="div-block-19"><img src="images/localizacion.png" className="image-9" />
                <div className="datoctacto">Av. Eva Perón 8615 | &nbsp;PB 03 | Rosario<br /></div>
              </div>
              <div className="div-block-19 fijo2"><img src="images/phone.png" className="image-9" /><a href="tel:03414865571" className="datoctacto">0341 486 5571</a></div>
              <div className="div-block-19"><img src="images/cellPhone.png" className="image-9" /><a href="tel:03416406327" className="datoctacto">0341 640 6327</a></div>
              <div className="div-block-19"><img src="images/mail.png" className="image-9" /><a href="mailto:info@zitroinmobiliaria.com" className="datoctacto">info@zitroinmobiliaria.com</a></div>
            </div>
            <div className="w-col w-col-6">
              <div className="form-block w-form">
                <form id="email-form" name="email-form" data-name="Email Form" className="form w-clearfix"><input type="text" className="txtfieldcontacto w-input" maxLength={256} name="name" data-name="Name" placeholder="Nombre" id="name" /><input type="email" className="txtfieldcontacto w-input" maxLength={256} name="email" data-name="Email" placeholder="Email" id="email" required /><input type="text" className="txtfieldcontacto w-input" maxLength={256} name="email-2" data-name="Email 2" placeholder="Teléfono" id="email-2" /><textarea id="field" name="field" placeholder="Mensaje" maxLength={5000} required className="txtfieldcontacto w-input" defaultValue={""} /><input type="submit" defaultValue="enviar" data-wait="Please wait..." className="enviarctacto w-button" /></form>
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
        <div className="w-embed w-iframe"><iframe src="https://www.google.com/maps/d/embed?mid=1CbNXTq5feAyJDPG0GZLQ3xiYCKsZVV1F&hl=es" width="100%" height={480} /></div>
      </div>
    );
  }
}

export default withSSR(About);
