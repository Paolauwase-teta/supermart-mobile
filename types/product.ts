export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  rating?: number;
  deliveryTime?: string;
  ingredients?: string[];
}
