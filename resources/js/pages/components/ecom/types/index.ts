export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image_url: string;
  quantity: number;
  selectedQuantity: number;
}


export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  selectedQuantity: number;
}

// export interface FilterState {
//   priceRange: [number, number];
//   categories: Record<Category | 'All', boolean>;
// }
