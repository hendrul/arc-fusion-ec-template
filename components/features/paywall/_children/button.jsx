import styled, { css } from "styled-components";

const Button = styled.button`
  ${({ theme }) => css`
    width: 100%;
    ${({ maxWidth }) =>
      maxWidth &&
      css`
        max-width: ${maxWidth};
      `}
    justify-content: center;
    background-color: ${theme.palette.secondary.main};
    color: ${theme.palette.secondary.contrastText};
    border-radius: 5px;
    font-size: 14px;
    line-height: 46px;
    border: 0;
    font-weight: 700;
    outline: 0;
    cursor: pointer;
    &:hover,
    &:focus {
      background-color: ${theme.palette.darken(
        theme.palette.secondary.main,
        theme.palette.tonalOffset
      )};
      color: ${theme.palette.secondary.contrastText};
    }
    &:disabled {
      background-color: ${theme.palette.fade(
        theme.palette.action.disabled,
        theme.palette.tonalOffset / 2
      )};
      color: ${theme.palette.action.disabled};
      cursor: initial;
    }
    ${theme.breakpoints.down("xs")} {
      width: 100%;
    }
  `}
`;

export default Button;
