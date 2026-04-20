import { Product } from './product';

export type AuthStackParamList = {
  Splash: undefined;
  Onboarding1: undefined;
  Onboarding2: undefined;
  Login: undefined;
  Register: undefined;
  Verification: { email: string };
  ForgotPassword: undefined;
  Congratulations: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  ProductList: { category?: string };
};

export type BottomTabParamList = {
  HomeStack: undefined;
  Notifications: undefined;
  Cart: undefined;
  Favorites: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  Checkout: undefined;
  Location: undefined;
  Receipt: { orderData?: any };
  ProductDetail: { product: Product };
};
