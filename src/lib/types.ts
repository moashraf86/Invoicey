export type Invoice = {
  invoiceNumber: string
  currency: string
  invoiceDate: string
  dueDate: string
  billFrom: {
    name: string
    website: string
    address: string
    city: string
    state: string
    zip: string
    country: string
    email: string
    phone: string
    taxId: string
  }
  billTo: {
    name: string
    address: string
    city: string
    state: string
    zip: string
    country: string
    email: string
    phone: string
  }
  lineItems: {
    name: string
    quantity: number
    price: number
    total: number
  }[]
  paymentDetails: {
    bankName: string
    accountNumber: string
    iban: string
    swiftCode: string
  }
  total: number
}
