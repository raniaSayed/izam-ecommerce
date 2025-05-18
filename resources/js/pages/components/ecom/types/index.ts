export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  stock: number;
}


export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

// export interface FilterState {
//   priceRange: [number, number];
//   categories: Record<Category | 'All', boolean>;
// }
