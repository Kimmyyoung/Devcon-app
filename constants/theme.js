import DMRegular from "../assets/fonts/DMSans-Regular.ttf";
import DMBold from "../assets/fonts/DMSans-Bold.ttf";
import DMMedium from "../assets/fonts/DMSans-Medium.ttf";

const COLORS = {
  primary: "#192655",
  secondary: "#3876BF",
  tertiary: "#E1AA74",

  gray: "#83829A",
  gray2: "#C1C0C8",

  white: "#F3F4F8",
  lightWhite: "#FAFAFC",
};

const FONT = {
  regular: "DMRegular",
  medium: "DMMedium",
  bold: "DMBold",
};

const SIZES = {
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
};

const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};

export { COLORS, FONT, SIZES, SHADOWS };
