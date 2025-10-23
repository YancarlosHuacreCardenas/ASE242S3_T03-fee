export interface Product {
  product_id?: number
  name: string
  description: string
  price: number
  category: string
  is_available: boolean
  image_url?: string
  launch_date?: string
  prep_time?: string
  is_featured: boolean
  nutritional_info?: any
}
