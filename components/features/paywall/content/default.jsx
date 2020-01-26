import React from "react";
import WizardConfirmation from "./wizard-confirmation";

const memo = {
  arcSite: "elcomercio",
  order: { orderNumber: "crappy" },
  profile: {
    uuid: "111111111111111",
    firstName: "Raul",
    lastName: "Contreras",
    secondLastName: "Gonzalez",
    email: "rcontreras@rmgperustaff.com"
  },
  plan: {
    sku: "sdfasfd",
    name: "Plan Digital",
    productName: "Plan Digital",
    priceCode: "HGVJSE",
    amount: 29,
    billingFrequency: "Month",
    description: "Plan Digital cool"
  },
  origin: "",
  referer: "http://gotheheaven.god",
  payment: {
    total: 29,
    subscriptionIDs: []
  },
  printedSubscriber: false,
  freeAccess: false,
  event: false
};

export default props => {
  return <WizardConfirmation memo={memo} {...props} />;
};
