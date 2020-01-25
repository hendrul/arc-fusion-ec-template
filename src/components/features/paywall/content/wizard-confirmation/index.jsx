/* eslint-disable no-extra-boolean-cast */
import React, { useEffect } from "react";
import { useTheme } from "@material-ui/core/styles";

import * as S from "./styled";
import Button from "../../_children/button";
import Picture from "../../../../global-components/picture";
import { useStrings } from "../../../../../libs/fusion/fusion-context";

const HOME = "/";
const NAME_REDIRECT = "paywall_last_url";

const Item = ({ label, children }) => {
  return (
    <S.Item>
      {label} <strong>{children}</strong>
    </S.Item>
  );
};

const WizardConfirmation = props => {
  const { $interpolate, ...msgs } = useStrings();
  const theme = useTheme();
  const {
    memo: {
      arcSite,
      order = {},
      profile = {},
      plan = {},
      origin,
      referer,
      payment = {},
      printedSubscriber,
      freeAccess,
      event
    },
    getCodeCxense
  } = props;

  const { orderNumber } = order;
  const { uuid, firstName, lastName, secondLastName, email } = Object.assign(
    {},
    profile,
    freeAccess
  );
  const { total: paidTotal, subscriptionIDs = [] } = payment;
  const {
    sku,
    name: planName,
    productName,
    priceCode,
    amount,
    billingFrequency,
    description
  } = plan;

  const Frecuency = {
    Month: "Mensual",
    Year: "Anual",
    OneTime: "Mensual"
  };

  const Period = {
    Month: msgs.monthlyPeriod,
    Year: msgs.yearlyPeriod,
    OneTime: ""
  };

  const handleClick = () => {};

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <S.Panel maxWidth="1060px" direction="row">
        <Picture
          width={{ xs: "0px", md: "360px" }}
          hideOnScreenSize="sm"
          srcSet={theme.images.confirmation.png}
        />
        <S.Content>
          <S.Title>
            {$interpolate(msgs.welcomeNewSubscriptor, { firstName })}
          </S.Title>

          <S.Subtitle large={!freeAccess}>
            {freeAccess ? msgs.successfulSubscription : msgs.successfulPurchase}
          </S.Subtitle>

          <S.CardSummary>
            <S.DetailTitle>
              {freeAccess
                ? msgs.subscriptionDetails.toUpperCase()
                : msgs.purchaseDetails.toUpperCase()}
            </S.DetailTitle>
            <Item label={`${msgs.planLabel.toUpperCase()}: `}>
              {(planName || "").toUpperCase()} -{" "}
              {event ? "ANUAL" : Frecuency[billingFrequency].toUpperCase()}
            </Item>
            <Item label={`${msgs.nameLabel.toUpperCase()}: `}>
              <S.Names>
                {firstName} {lastName} {secondLastName}
              </S.Names>
            </Item>
            {!freeAccess && (
              <>
                <S.Item>
                  {`${msgs.priceLabel.toUpperCase()}: `}
                  <strong>
                    {`${
                      paidTotal !== 0
                        ? msgs.currencySymbol.toUpperCase()
                        : msgs.freeAmount.toUpperCase()
                    } `}
                  </strong>
                  <strong>{`${paidTotal !== 0 ? paidTotal : ""} `}</strong>

                  {`${description.cart || ""} `}
                </S.Item>

                <S.Small>{msgs.paymentNotice}</S.Small>
              </>
            )}
          </S.CardSummary>
          {!freeAccess && (
            <S.Notice
              source={$interpolate(msgs.subscriptionNotice, { email })}
            />
          )}
          <S.WrapButton>
            <Button onClick={handleClick}>{msgs.continueButton}</Button>
          </S.WrapButton>
        </S.Content>
      </S.Panel>
    </div>
  );
};

export default WizardConfirmation;
