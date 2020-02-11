import React from "react";

import DefaultLayout from "../../../../components/layouts/default";
import ContentFeature from "../../../../components/features/sample-featurepack/content/default";

window.fusionMock = {
  name: "sample-featurepack"
};

function Page() {
  return (
    <DefaultLayout>
      <div />
      <ContentFeature />
      <div />
    </DefaultLayout>
  );
}

export default Page;
