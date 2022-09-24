import styled, { CreateStyled } from "@emotion/styled";

export type Theme = {
  color: {
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
}

// @ts-expect-error
export default styled as CreateStyled<Theme>