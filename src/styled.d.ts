import 'styled-components';
import { Theme } from '@/theme/type';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
