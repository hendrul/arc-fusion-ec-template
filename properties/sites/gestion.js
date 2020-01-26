export default {
  paywall: {
    title: "Suscripciones Digitales | Gestión",
    description:
      "Suscríbete al Plan Digital y accede a contenido exclusivo ilimitadamente desde todos tus dispositivos.Gestión El diario de Economía y Negocios.",
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
      corporateSuscription:              `{{contextPath}}/suscripcionesdigitales/empresa/?ref=HomeSuscripciones{{^isProd}}&_website=gestion&outputType=paywall{{/isProd}}`,
      faqs:                              `{{contextPath}}/suscripcionesdigitales/faqs/{{^isProd}}?_website=gestion&outputType=paywall{{/isProd}}`,
      digitalSubscriptions:              `{{contextPath}}/suscripcionesdigitales/{{#isEvent}}eventos/{{event}}/{{/isEvent}}{{#isCheckingSubscriptor}}{{documentType}}/{{documentNumber}}/{{attemptToken}}/{{/isCheckingSubscriptor}}{{^isProd}}?_website=gestion&outputType=paywall{{/isProd}}`,
      digitalSubscriptionsHome:          `{{contextPath}}/suscripciones/{{^isProd}}?_website=gestion&outputType=paywall{{/isProd}}`,

      // URLS
      canonical:                         `https://gestion.pe/suscripcionesdigitales/`,
      image:                             `https://gestion.pe/pf/resources/dist/gestion/images/logo_fb.jpg?d=158`,
      clickToCall:                       `https://c2c.kontactame.com/call/?id=162`,
      pwaDomain:                         `https://pwa{{^isProd}}.dev{{/isProd}}.gestion.pe`,
      originApi:                         `https://api{{^isProd}}-sandbox{{/isProd}}.gestion.pe`,
      originIdentitySdk:                 `https://arc-subs-sdk.s3.amazonaws.com/{{#isProd}}prod{{/isProd}}{{^isProd}}sandbox{{/isProd}}/sdk-identity.min.js?v=1`,
      originSalesSdk:                    `https://arc-subs-sdk.s3.amazonaws.com/{{#isProd}}prod{{/isProd}}{{^isProd}}sandbox{{/isProd}}/sdk-sales.min.js`,
      originPayuSdk:                     `https://d2g037f9e082nm.cloudfront.net/creativos/payu-sdk/payu-sdk.js`,
      originPayuTags:                    `https://maf.pagosonline.net/ws/fp/tags.js?id={{deviceSessionId}}80200`,
      originSubscriptionCorpApi:         `https://{{^isProd}}dev{{/isProd}}paywall.comerciosuscripciones.pe/api/subs-corporativa/`,
      originSubscriptionOnlineToken:     `https://{{^isProd}}dev{{/isProd}}paywall.comerciosuscripciones.pe/api/subscription-online/token/`,
      originSubscriptions:               `https://{{^isProd}}dev{{/isProd}}paywall.comerciosuscripciones.pe/api/subscriber/validation/gestion/{{#hasParams}}?{{/hasParams}}{{#isCheckingSubscriptor}}doctype={{documentType}}&docnumber={{documentNumber}}&token={{attemptToken}}{{/isCheckingSubscriptor}}{{#isEvent}}{{#isCheckingSubscriptor}}&{{/isCheckingSubscriptor}}event={{event}}{{/isEvent}}`,
      originSubscriptionsBundles:        `https://{{^isProd}}dev{{/isProd}}paywall.comerciosuscripciones.pe/api/subscriber/validation/gestion/bundle/`,
      originSubsPrinted:                 `{{#isProd}}https://suscripciones.gestion.pe/payment/7/96/{{/isProd}}
                                          {{^isProd}}http://pre.suscripciones.gestion.pe/payment/7/96/{{/isProd}}`,
      originSubsDigitalPrinted:          `{{#isProd}}https://suscripciones.gestion.pe/payment/8/98/{{/isProd}}
                                          {{^isProd}}http://pre.suscripciones.gestion.pe/payment/8/97/{{/isProd}}`,
      privacyPolicy:                     `https://gestion.pe/politica-de-privacidad`,
      disclaimer:                        `http://ecomedia.pe/libro/registrar/gestion/`,
      terms:                             `https://suscripciones.gestion.pe/terminos/`,
      originSubsOnline:                  `https://suscripciones.gestion.pe/`,
      contactEmailRef:                   `mailto:suscriptores@diariogestion.com.pe`,
      contactPhoneRef:                   `tel:+5113115100`,
      androidAppDownload:                `https://play.google.com/store/apps/details?id=com.eeec.gestion&referrer=email_footer`,
      iosAppDownload:                    `https://apps.apple.com/es/app/gestion/id991224096?ct=email_footer`,
      facebook:                          `https://www.facebook.com/Gestionpe`,
      twitter:                           `https://twitter.com/gestionpe`,
      instagram:                         `https://www.instagram.com/diariogestion/?hl=es`,
    },
    // prettier-ignore
    images: {
      icon:                              `{{contextPath}}/resources/dist/gestion/images/favicon.png`,
      apple_icon:                        `{{contextPath}}/resources/dist/gestion/images/apple-touch-icon.png`,
      apple_icon_76:                     `{{contextPath}}/resources/dist/gestion/images/apple-touch-icon-76x76.png`,
      apple_icon_120:                    `{{contextPath}}/resources/dist/gestion/images/apple-touch-icon-120x120.png`,
      apple_icon_144:                    `{{contextPath}}/resources/dist/gestion/images/apple-touch-icon-144x144.png`,
      apple_icon_152:                    `{{contextPath}}/resources/dist/gestion/images/apple-touch-icon-152x152.png`,
      apple_icon_180:                    `{{contextPath}}/resources/dist/gestion/images/apple-touch-icon-180x180.png`,
      lector:                            `{{contextPath}}/resources/dist/gestion/images/img_lector.png`,
      corporativo:                       `{{contextPath}}/resources/dist/gestion/images/img_corporativo.png`,
      confirmation:                      `{{contextPath}}/resources/dist/gestion/images/img_confirmation.png`,
      support:                           `{{contextPath}}/resources/dist/gestion/images/img_soporte.png`,
      backgroundx1:                      `{{contextPath}}/resources/dist/gestion/images/bg_planes_10.jpg`
    }
  }
};
