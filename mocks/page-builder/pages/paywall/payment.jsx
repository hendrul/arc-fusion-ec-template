import React from "react";

import PaywallLayout from "../../../../components/layouts/paywall";
import PaywallPayment from "../../../../components/features/paywall/content/default";

window.fusionMock = {
  name: "paywall"
};

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

function Page() {
  return (
    <PaywallLayout>
      <div />
      <PaywallPayment memo={memo} />
      <div />
    </PaywallLayout>
  );
}

export default Page;
