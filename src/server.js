import { StaticRouter, matchPath } from 'react-router-dom';

import App from './App';
import React from 'react';
import express from 'express';
import { renderToString } from 'react-dom/server';
import routes from './routes';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);
const server = express();

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', (req, res) => {
    // This data fetching technique came from a gist by @ryanflorence
    // @see https://gist.github.com/ryanflorence/efbe562332d4f1cc9331202669763741

    // First we iterate through our top level routes
    // looking for matches against the current url.
    const matches = routes.map((route, index) => {
      let match = matchPath(req.path, route.path, route);

      // We then look for static getInitialData function on each top level component
      if (match) {
        match.params = req.query;
        const obj = {
          route,
          match,
          promise: route.component.getInitialData
            ? route.component.getInitialData({req, res, match})
            : Promise.resolve(null),
        };
        return obj;
      }
      return null;
    });

    if (matches.length === 0) {
      res.status(404).send('Not Found');
    }

    // Now we pull out all the promises we found into an array.
    const promises = matches.map(match => (match ? match.promise : null));

    // We block rendering until all promises have resolved
    Promise.all(promises)
      .then(data => {
        const context = {};

        // Pass our routes and data array to our App component
        const markup = renderToString(
          <StaticRouter context={context} location={req.url}>
            <App routes={routes} initialData={data} />
          </StaticRouter>
        );

        if (context.url) {
          res.redirect(context.url);
        } else {
          res.status(context.statusCode || 200).send(
            `
            <!doctype html>
            <html data-wf-page="5b1fc0491b176010ff23d49d" data-wf-site="5b1fc0491b17603cc223d49c">
               <head>
                  <meta charset="utf-8">
                  <title>Venta/alquiler propiedades Rosario | Zitro inmobiliaria</title>
                  <meta content="Compraventas, Alquileres, Tasaciones, Emprendimientos, Desarrollos inmobiliarios, Asesoramiento inmobiliario integral | Av. Eva Perón 8615 |  PB 03 | Rosario | Cel. (0341) 640 6327" name="description">
                  <meta content="Venta/alquiler propiedades Rosario | Zitro inmobiliaria" property="og:title">
                  <meta content="Compraventas, Alquileres, Tasaciones, Emprendimientos, Desarrollos inmobiliarios, Asesoramiento inmobiliario integral | Av. Eva Perón 8615 |  PB 03 | Rosario | Cel. (0341) 640 6327" property="og:description">
                  <meta content="summary" name="twitter:card">
                  <meta content="width=device-width, initial-scale=1" name="viewport">
                  <meta content="Webflow" name="generator">
                  <link href="css/normalize.css" rel="stylesheet" type="text/css">
                  <link href="css/webflow.css" rel="stylesheet" type="text/css">
                  <link href="css/zitro.webflow.css" rel="stylesheet" type="text/css">
                  <script src="https://ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js" type="text/javascript"></script>
                  <script type="text/javascript">WebFont.load({  google: {    families: ["Montserrat:100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic","Oswald:200,300,400,500,600,700"]  }});</script>
                  <!-- [if lt IE 9]><script src="https://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv.min.js" type="text/javascript"></script><![endif] -->
                  <script type="text/javascript">!function(o,c){var n=c.documentElement,t=" w-mod-";n.className+=t+"js",("ontouchstart"in o||o.DocumentTouch&&c instanceof DocumentTouch)&&(n.className+=t+"touch")}(window,document);</script>
                  <link href="https://daks2k3a4ib2z.cloudfront.net/img/favicon.ico" rel="shortcut icon" type="image/x-icon">
                  <link href="https://daks2k3a4ib2z.cloudfront.net/img/webclip.png" rel="apple-touch-icon">
                  ${assets.client.css
                  ? `
                  <link rel="stylesheet" href="${assets.client.css}">
                  `
                  : ''}
                  <style>
                    .w-col {
                    }
                  </style>
                  <script src="${assets.client.js}" defer></script>
               </head>
               <body class="body">
                  <div data-w-id="cd093772-4edd-29cb-9962-0192ac4363ca" class="div-block-18">
                     <div data-collapse="medium" data-animation="default" data-duration="400" class="navbar-4 w-nav">
                        <a href="index.html" class="brand-4 w-nav-brand"><img src="images/logoFinalChico.png" class="image-8"></a>
                        <nav role="navigation" class="nav-menu-3 w-nav-menu"><a href="/home" class="navlink5 w-nav-link w--current">inicio</a><a href="/propiedades" class="navlink5 w-nav-link">propiedades</a><a href="/servicios" class="navlink5 w-nav-link">servicios</a><a href="/empresa" class="navlink5 w-nav-link">empresa</a><a href="/contacto" class="navlink5 w-nav-link">contacto</a></nav>
                        <div class="w-nav-button">
                           <div class="w-icon-nav-menu"></div>
                        </div>
                     </div>
                  </div>
                  <div id="roott">${markup}</div>
                  <div class="footer">
                     <div class="w-row">
                        <div class="w-col w-col-4">
                           <div>
                              <img src="images/logoFinalChico.png" class="logofooter">
                              <div class="wrapperdatos">
                                 <div class="divdatosidebar">
                                    <div class="div-block-2">
                                       <div class="txtsidebar">Av. Eva Perón 8615 |  PB 03 | Rosario</div>
                                    </div>
                                    <img src="images/localizacion.png" class="imgiconsidebar">
                                 </div>
                                 <div class="divdatosidebar fijo">
                                    <div class="div-block-2"><a href="tel:03414865571" class="txtsidebar">0341 486 5571</a></div>
                                    <img src="images/phone.png" class="imgiconsidebar">
                                 </div>
                                 <div class="divdatosidebar">
                                    <div class="div-block-2"><a href="tel:03416406327" class="txtsidebar">0341 640 6327</a></div>
                                    <img src="images/cellPhone.png" class="imgiconsidebar">
                                 </div>
                                 <div class="divdatosidebar">
                                    <div class="div-block-2"><a href="mailto:info@zitroinmobiliaria.com?subject=Han%20enviado%20un%20mail%20desde%20el%20sitio" class="txtsidebar">info@zitroinmobiliaria.com</a></div>
                                    <img src="images/mail.png" class="imgiconsidebar">
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div class="w-col w-col-4">
                           <div class="txtwalter">Walter Alonso<br>Corredor inmobiliario<br>Matrícula 1298</div>
                           <div class="html-embed w-embed w-script">
                              <!--  AddToAny BEGIN  -->
                              <div class="a2a_kit a2a_kit_size_32 a2a_default_style">
                                 <a class="a2a_dd" href="https://www.addtoany.com/share"></a>
                                 <a class="a2a_button_facebook"></a>
                                 <a class="a2a_button_twitter"></a>
                                 <a class="a2a_button_google_plus"></a>
                                 <a class="a2a_button_whatsapp"></a>
                              </div>
                              <script async="" src="https://static.addtoany.com/menu/page.js"></script>
                              <!--  AddToAny END  -->
                           </div>
                           <a href="contacto.html" class="link w-button">Contáctenos</a>
                        </div>
                        <div class="w-col w-col-4">
                           <div class="div-block-3"><a href="index.html" class="linkfooter w--current">INICIO</a><a href="propiedades.html" class="linkfooter">PROPIEDADES</a><a href="servicios.html" class="linkfooter">SERVICIOS</a><a href="empresa.html" class="linkfooter">EMPRESA</a><a href="contacto.html" class="linkfooter">CONTACTO</a></div>
                        </div>
                     </div>
                  </div>
                  <script>window._INITIAL_DATA_ = ${JSON.stringify(data)};</script>
                  <script src="https://code.jquery.com/jquery-3.3.1.min.js" type="text/javascript" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
                  <script src="js/webflow.js" type="text/javascript"></script>
               </body>
            </html>
            `
          );
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ error: error.message, stack: error.stack });
      });
  });

export default server;
