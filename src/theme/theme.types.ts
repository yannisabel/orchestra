import styled, { CreateStyled } from "@emotion/styled";

type ThemeColor = {
  primaryBgColor: string,
  textColor: string,
  titleColor: string,
  linkColor: string,
  accentColor: string,
  cardBgColor: string,
  cardTitleColor: string,
  discreetColor: string,
  whiteStickerColor: string,
  codeBgColor: string,
  codeColor: string,
  dividerColor: string,
  footerLinkColor: string,
}

export type Theme = { colors: ThemeColor };
