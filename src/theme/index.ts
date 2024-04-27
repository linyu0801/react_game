import defaultTheme from './default';

type Theme = {
  color: string;
  background: string;
  chess: {
    normal: string;
    hover: string;
    active: string;
  };
  button: {
    normal: string;
    hover: string;
    active: string;
  };
};

type ThemeType = Record<string, Theme>;
const themes: ThemeType = { default: defaultTheme };

export default themes;
