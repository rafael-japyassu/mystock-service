export interface IProductRequest {
  id?: string;
  name: string;
  description: string;
  category_id: string;
  price: number;
  stock: number;
}

export interface IProductFilterRequest {
  name: string | undefined;
  description: string | undefined;
  category_id: string | undefined;
}

export interface IProductFilterPaginationRequest {
  name: string | undefined;
  description: string | undefined;
  category_id: string | undefined;
  page: number;
  size: number;
}
