export default {
  paywall: {
    title: "Suscripciones Digitales | El Comercio",
    description:
      "Noticias de Perú y el mundo en Elcomercio.pe. Noticias de actualidad, política, deportes, gastronomía, economía y espectáculos.",

    /**
     * Las rutas se definen como plantillas "mustachejs" y estas se resuelven utilizando
     * la libreria templayed que es una implementacion ligera de mustache. Recomiendo
     * crear una funcion utilitaria que añada las siguientes variables implicitas
     *    - contextPath: Path del contexto de publicacion de fusion
     *    - isProd:      Verdadero si se esta en produccion
     *    - hasParams:   Verdadero si se pasan parametros extra
     *
     * Ejemplo:  resolverUrl( '{{contextPath}}/{{param1}}', { param1: 'somePath' } );  // return: '/pf/somePath'
     */
    // prettier-ignore
    urls: {
      // PATHS
      eventsRegexp:                      `eventos\\/(\\w+)`,
      corporateSuscription:              `{{contextPath}}/suscripcionesdigitales/empresa/{{^isProd}}?_website=elcomercio&outputType=paywall{{/isProd}}`,
      faqs:                              `{{contextPath}}/suscripcionesdigitales/faqs/{{^isProd}}?_website=elcomercio&outputType=paywall{{/isProd}}`,
      digitalSubscriptions:              `{{contextPath}}/suscripcionesdigitales/{{#isEvent}}eventos/{{event}}/{{/isEvent}}{{#isCheckingSubscriptor}}{{documentType}}/{{documentNumber}}/{{attemptToken}}/{{/isCheckingSubscriptor}}{{^isProd}}?_website=elcomercio&outputType=paywall{{/isProd}}`,
      digitalSubscriptionsHome:          `{{contextPath}}/suscripciones/{{^isProd}}?_website=elcomercio&outputType=paywall{{/isProd}}`,

      // URLS
      canonical:                         `https://elcomercio.pe/suscripcionesdigitales/`,
      image:                             `https://elcomercio.pe/pf/resources/dist/elcomercio/images/logo_fb.jpg?d=158`,
      reviewVideo:                       `https://pub.minoticia.pe/elcomercio/el_comercio.mp4`,
      clickToCall:                       `https://c2c.kontactame.com/call/?id=161`,
      pwaDomain:                         `https://pwa{{^isProd}}.dev{{/isProd}}.elcomercio.pe`,
      originApi:                         `https://api{{^isProd}}-sandbox{{/isProd}}.elcomercio.pe`,
      originIdentitySdk:                 `https://arc-subs-sdk.s3.amazonaws.com/{{#isProd}}prod{{/isProd}}{{^isProd}}sandbox{{/isProd}}/sdk-identity.min.js?v=1`,
      originSalesSdk:                    `https://arc-subs-sdk.s3.amazonaws.com/{{#isProd}}prod{{/isProd}}{{^isProd}}sandbox{{/isProd}}/sdk-sales.min.js`,
      originPayuSdk:                     `https://d2g037f9e082nm.cloudfront.net/creativos/payu-sdk/payu-sdk.js`,
      originPayuTags:                    `https://maf.pagosonline.net/ws/fp/tags.js?id={{deviceSessionId}}80200`,
      originSubscriptionCorpApi:         `https://{{^isProd}}dev{{/isProd}}paywall.comerciosuscripciones.pe/api/subs-corporativa/`,
      originSubscriptionOnlineToken:     `https://{{^isProd}}dev{{/isProd}}paywall.comerciosuscripciones.pe/api/subscription-online/token/`,
      originSubscriptions:               `https://{{^isProd}}dev{{/isProd}}paywall.comerciosuscripciones.pe/api/subscriber/validation/elcomercio/{{#hasParams}}?{{/hasParams}}{{#isCheckingSubscriptor}}doctype={{documentType}}&docnumber={{documentNumber}}&token={{attemptToken}}{{/isCheckingSubscriptor}}{{#isEvent}}{{#isCheckingSubscriptor}}&{{/isCheckingSubscriptor}}event={{event}}{{/isEvent}}`,
      originSubscriptionsBundles:        `https://{{^isProd}}dev{{/isProd}}paywall.comerciosuscripciones.pe/api/subscriber/validation/elcomercio/bundle/`,
      originSubsPrinted:                 `{{#isProd}}https://suscripciones.elcomercio.pe/payment/9/101/{{/isProd}}
                                          {{^isProd}}http://pre.suscripciones.elcomercio.pe/payment/9/101/{{/isProd}}`,
      originSubsDigitalPrinted:          `{{#isProd}}https://suscripciones.elcomercio.pe/payment/10/103/{{/isProd}}
                                          {{^isProd}}http://pre.suscripciones.elcomercio.pe/payment/10/103/{{/isProd}}`,
      privacyPolicy:                     `https://elcomercio.pe/politicas-privacidad/`,
      disclaimer:                        `http://ecomedia.pe/libro/registrar/elcomercio/`,
      terms:                             `https://suscripciones.elcomercio.pe/terminos/`,
      originSubsOnline:                  `https://suscripciones.elcomercio.pe/?ref=Boton_suscrip_imp`,
      contactEmailRef:                   `mailto:suscripciones@comercio.com.pe`,
      contactPhoneRef:                   `tel:+5113115100`,
      androidAppDownload:                `https://play.google.com/store/apps/details?id=com.gec.elcomercio&referrer=email_footer`,
      iosAppDownload:                    `https://apps.apple.com/es/app/el-comercio-peru/id793178800?ct=email_footer`,
      facebook:                          `https://www.facebook.com/elcomercio.pe`,
      twitter:                           `https://twitter.com/elcomercio_peru`,
      instagram:                         `https://www.instagram.com/elcomercio/?hl=es`,
    },
    // prettier-ignore
    images: {
      icon:                              `{{contextPath}}/resources/dist/elcomercio/images/favicon.png`,
      apple_icon:                        `{{contextPath}}/resources/dist/elcomercio/images/apple-touch-icon.png`,
      apple_icon_76:                     `{{contextPath}}/resources/dist/elcomercio/images/apple-touch-icon-76x76.png`,
      apple_icon_120:                    `{{contextPath}}/resources/dist/elcomercio/images/apple-touch-icon-120x120.png`,
      apple_icon_144:                    `{{contextPath}}/resources/dist/elcomercio/images/apple-touch-icon-144x144.png`,
      apple_icon_152:                    `{{contextPath}}/resources/dist/elcomercio/images/apple-touch-icon-152x152.png`,
      apple_icon_180:                    `{{contextPath}}/resources/dist/elcomercio/images/apple-touch-icon-180x180.png`,
      lector:                            `{{contextPath}}/resources/dist/elcomercio/images/img_lector.png`,
      corporativo:                       `{{contextPath}}/resources/dist/elcomercio/images/img_corporativo.png`,
      confirmation:                      `{{contextPath}}/resources/dist/elcomercio/images/img_confirmation.png`,
      support:                           `{{contextPath}}/resources/dist/elcomercio/images/img_soporte.png`,
      backgroundx1:                      `{{contextPath}}/resources/dist/elcomercio/images/bg_planes_10.jpg`,
      backgroundReview:                  `{{contextPath}}/resources/dist/elcomercio/images/bg_video.jpg`,
      reviewPoster:                      `{{contextPath}}/resources/dist/elcomercio/images/review_poster.jpg`,
    }
  }
};
