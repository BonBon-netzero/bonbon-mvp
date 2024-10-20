import { extendTheme } from "@chakra-ui/react";

export const customTheme = extendTheme({
  colors: {
    neutral: {
      1: "#141416",
      2: "#23262F",
      3: "#353945",
      4: "#777E90",
      5: "#B1B5C3",
      6: "#E6E8EC",
      7: "#F4F5F6",
      8: "#FFFFFF",
    },
    primary: {
      1: "#C7EB00",
      2: "#3A2CA9",
    },
    gray: {
      50: "#FEFEFE",
      600: "#828295",
      900: "#2D2D38",
    },
    error: {
      1: "#EA4545",
    },
  },
  styles: {
    global: {
      body: {
        bg: "primary.2",
      },
    },
  },
  textStyles: {
    body: {
      fontSize: "16px",
      lineHeight: "24px",
      fontWeight: "normal",
    },
    bodyBold: {
      fontSize: "16px",
      lineHeight: "24px",
      fontWeight: 700,
    },
    caption: {
      fontSize: "14px",
      lineHeight: "24px",
      fontWeight: "normal",
    },
    captionBold: {
      fontSize: "14px",
      lineHeight: "24px",
      fontWeight: 700,
    },
    large: {
      fontSize: "18px",
      lineHeight: "24px",
      fontWeight: "normal",
    },
    largeBold: {
      fontSize: "18px",
      lineHeight: "24px",
      fontWeight: 700,
    },
    h5: {
      fontSize: "20px",
      lineHeight: "30px",
      fontWeight: 700,
    },
    h4: {
      fontSize: "24px",
      lineHeight: "36px",
      fontWeight: 700,
    },
  },
  components: {
    Button: {
      variants: {
        primary: {
          height: "48px",
          background: "primary.1",
          borderWidth: "1px 3px 3px 1px",
          borderStyle: "solid",
          borderColor: "neutral.1",
          borderRadius: "16px",
        },
        normal: {
          background: "neutral.8",
          borderWidth: "1px 3px 3px 1px",
          borderStyle: "solid",
          borderColor: "neutral.1",
          borderRadius: "8px",
        },
      },
    },
    Card: {
      variants: {
        cardWhite: {
          container: {
            bg: "neutral.8",
            borderWidth: "1px 3px 3px 1px",
            borderStyle: "solid",
            borderColor: "neutral.1",
            borderRadius: "8px",
          },
        },
        cardPrimary: {
          container: {
            bg: "primary.1",
            borderWidth: "1px 3px 3px 1px",
            borderStyle: "solid",
            borderColor: "neutral.1",
            borderRadius: "8px",
          },
        },
        cardRed: {
          container: {
            bg: "error.1",
            borderWidth: "1px 3px 3px 1px",
            borderStyle: "solid",
            borderColor: "neutral.1",
            borderRadius: "8px",
          },
        },
      },
    },
    Input: {
      variants: {
        normal: {
          bg: "neutral.8",
        },
      },
    },
    Textarea: {
      variants: {
        normal: {
          bg: "neutral.8",
        },
      },
    },
  },
});
