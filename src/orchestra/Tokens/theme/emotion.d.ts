declare module App {
  type ThemeColor = {
    primaryBgColor: string,
    textColor: string,
    titleColor: string,
    linkColor: string,
    accentColor: string,
    cardBgColor: string,
    cardTitleColor: string,
    discreetColor: string,
    stickerBgColor: string,
    codeBgColor: string,
    codeColor: string,
    dividerColor: string,
    footerLinkColor: string,
  }

  type Theme = { colors: ThemeColor };
}

declare module "@emotion/styled" {
  import { CreateStyled } from "@emotion/styled/types/index";

  export * from "@emotion/styled/types/index";
  const customStyled: CreateStyled<App.Theme>;
  export default customStyled;
}
