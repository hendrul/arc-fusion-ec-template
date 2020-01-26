import React from "react";
import Button from "@material-ui/core/Button";

import CheckImg from "./check-img";
import { Text, Flex } from "../../../global-components/std-components";
import { useStrings } from "../../../../libs/fusion-extension";

const Thanks = props => {
  const msgs = useStrings();
  const { returnHref = "" } = props;

  return (
    <Flex
      flexDirection="column"
      width="100%"
      height="auto"
      minHeight="540px"
      maxWidth="230px"
      margin="0 auto"
    >
      <CheckImg />
      <Text
        fontFamily="'Open Sans'"
        variant="h4"
        textAlign="center"
        background="white"
      >
        {msgs.thanks}
      </Text>
      <Text variant="body1">{msgs.messageSendNotification}</Text>
      <Button href={returnHref} color="secondary">
        {msgs.returnTo}
      </Button>
    </Flex>
  );
};
export default Thanks;
