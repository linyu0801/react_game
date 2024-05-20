import defaultTheme from './default';
import { Theme } from './type';

type ThemeType = Record<string, Theme>;
const themes: ThemeType = { default: defaultTheme };

export default themes;
