export type Invoice = {
  invoiceNumber: string
  reference: string
  currency: string
  invoiceDate: string
  dueDate: string
  billFrom: {
    name: string
    address: string
    city: string
    state: string
    zip: string
    country: string
  }
  billTo: {
    name: string
    address: string
    city: string
    state: string
    zip: string
    country: string
  }
  lineItems: {
    name: string
    quantity: number
    price: number
    total: number
  }[]
  total: number
  subtotal: number
  tax: number
}
