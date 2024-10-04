import { extendTheme } from "@chakra-ui/react";

export const customTheme = extendTheme({
  colors: {
    neutral: {
      1: "#141416",
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
      },
    },
    Card: {
      variants: {
        cardWhite: {
          background: "neutral.8",
          borderWidth: "1px 3px 3px 1px",
          borderStyle: "solid",
          borderColor: "neutral.1",
          borderRadius: "8px",
        },
      },
    },
  },
});
