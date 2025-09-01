<script setup lang="ts">
import Header from "@/components/layout/Header.vue"
import InvoiceBuilder from "@/components/builder/InvoiceBuilder.vue"
import InvoicePreview from "@/components/preview/InvoicePreview.vue"
import type { Invoice } from "@/lib/types"
import { watch } from "vue"
import { useStorage } from "@vueuse/core"

//==============================================
// 1. DEFINE DEFAULT INVOICE DATA (FALLBACK)
//==============================================
const defaultInvoice: Invoice = {
  invoiceNumber: "INV-0001",
  currency: "EGP",
  invoiceDate: new Date().toISOString().split("T")[0],
  dueDate: new Date().toISOString().split("T")[0],
  billFrom: {
    name: "Mohamed Ashraf",
    website: "https://example.com",
    address: "123 Main St",
    email: "john.doe@example.com",
    phone: "+0 (000) 123-4567",
    taxId: "00XXXXX1234X0XX",
    city: "Anytown",
    state: "CA",
    zip: "12345",
    country: "USA",
  },
  billTo: {
    name: "John Doe",
    address: "456 Main St",
    email: "john.doe@example.com",
    phone: "+0 (000) 123-4567",
    city: "Anytown",
    state: "CA",
    zip: "12345",
    country: "USA",
  },
  lineItems: [
    {
      name: "Item 1",
      quantity: 1,
      price: 100,
      total: 100,
    },
    {
      name: "Item 2",
      quantity: 1,
      price: 200,
      total: 200,
    },
  ],
  paymentDetails: {
    bankName: "National Bank of Egypt",
    accountNumber: "1234567890",
    iban: "1234567890",
    swiftCode: "1234567890",
  },
  total: 300,
}

// ==============================================
// 2.CREATE REACTIVE STATE
// ==============================================
const invoice = useStorage<Invoice>("invoice", defaultInvoice)

// ==============================================
// 4.  CALCULATE TOTAL AUTOMATICALLY
// ==============================================
const calculateTotals = (lineItems: Invoice["lineItems"]) => {
  // calculate total for each item and update the invoice object
  lineItems.forEach((item) => {
    item.total = item.price * item.quantity
  })
  // calculate total for the invoice
  invoice.value.total = lineItems.reduce((acc, item) => acc + item.total, 0)
}

// ==============================================
// 6. WATCH FOR CHANGES IN INVOICE
// ==============================================
watch(
  invoice,
  (newInvoice: Invoice) => {
    // re-calculate totals
    calculateTotals(newInvoice.lineItems)
  },
  { deep: true, immediate: false },
)

// ==============================================
// 8. HANDLE INVOICE UPDATE (FROM CHILD COMPONENTS)
// ==============================================
const handleInvoiceUpdate = (newInvoice: Invoice) => {
  console.log("invoice updated", newInvoice)

  invoice.value = newInvoice
}
</script>

<template>
  <div>
    <Header />
    <main class="flex gap-4 divide-x divide-gray-200 h-[calc(100dvh-64px)]">
      <InvoiceBuilder :invoice="invoice" @update:invoice="handleInvoiceUpdate" />
      <InvoicePreview :invoice="invoice" />
    </main>
  </div>
</template>
