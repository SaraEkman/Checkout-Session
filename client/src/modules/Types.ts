// types.ts
export interface Product {
  id: number;
  name: string;
  description: string;
  images: string[];
  default_price: {
    id: string;
    currency: string;
    unit_amount: number;
  };
}

export interface CartItem extends Product {
  quantity: number;
}

export interface IInputs {
 email: string;
  password: string;
  name: string;
  address: IAddress;
}

export interface IAddress {
   [key: string]: string;
  city: string;
  country: string;
  line1: string;
  postal_code: string;
}