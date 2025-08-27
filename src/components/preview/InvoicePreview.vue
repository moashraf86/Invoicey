<script setup lang="ts">
import { formatCurrency } from "@/lib/helper"
import type { Invoice } from "@/lib/types"
import { formatDate } from "@vueuse/core"
import { ref, computed } from "vue"

// PAGE SIZE A4
const pageSize = {
  width: 210,
  height: 297,
}

const MM_TO_PX = 3.78

// Sample data matching your provided structure
const defaultInvoice: Invoice = {
  invoiceNumber: "INV-0002",
  reference: "INV-0002",
  currency: "USD",
  invoiceDate: new Date("2025-08-27").toISOString().split("T")[0],
  dueDate: new Date("2025-08-27").toISOString().split("T")[0],
  billFrom: {
    name: "Mohamed Ashraf",
    address: "123 Main St",
    city: "Anytown",
    state: "CA",
    country: "USA",
    zip: "12345",
  },
  billTo: {
    name: "John Doe",
    address: "456 Main St",
    city: "Anytown",
    state: "CA",
    country: "USA",
    zip: "12345",
  },
  lineItems: [
    { name: "Item 1", quantity: 5, price: 100, total: 500 },
    { name: "Item 2", quantity: 10, price: 200, total: 2000 },
  ],
  total: 2500,
  subtotal: 2500,
  tax: 250,
}

// Use in-memory storage instead of localStorage for Claude.ai compatibility
const invoice = ref<Invoice>(defaultInvoice)

const subtotal = computed(() => {
  return invoice.value.lineItems.reduce((sum, item) => sum + item.total, 0)
})

const tax = computed(() => {
  return subtotal.value * 0.1 // 10% tax
})

const total = computed(() => {
  return subtotal.value + tax.value
})
</script>

<template>
  <div class="flex-1">
    <div
      class="mx-auto bg-white p-8 shadow-lg"
      :style="{
        width: `${pageSize.width * MM_TO_PX}px`,
        height: `${pageSize.height * MM_TO_PX}px`,
        scale: 0.5,
      }"
    >
      <!-- Header Section -->
      <div class="flex justify-between items-start mb-8">
        <div class="space-y-1">
          <h1 class="text-2xl font-bold text-gray-900">
            {{ invoice.billFrom.name }} {{ invoice.billFrom.name ? "" : "Mohamed Ashraf" }}
          </h1>
          <p class="text-gray-600">www.website.com</p>
          <p class="text-gray-600">hello@email.com</p>
          <p class="text-gray-600">+91 00000 00000</p>
        </div>
        <div class="text-right space-y-1">
          <p class="text-gray-600">Business address</p>
          <p class="text-gray-600">
            {{ invoice.billFrom.city }}, {{ invoice.billFrom.state }},
            {{ invoice.billFrom.country }} - {{ invoice.billFrom.zip }}
          </p>
          <p class="text-gray-600">TAX ID 00XXXXX1234X0XX</p>
        </div>
      </div>

      <!-- Invoice Details Section -->
      <div class="border border-gray-200 rounded-lg p-6 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <!-- Billed To -->
          <div>
            <p class="text-gray-600 mb-2">Billed to,</p>
            <div class="space-y-1">
              <p class="font-semibold text-gray-900">{{ invoice.billTo.name }}</p>
              <p class="text-gray-600">{{ invoice.billTo.address }}</p>
              <p class="text-gray-600">
                {{ invoice.billTo.city }}, {{ invoice.billTo.country }} - {{ invoice.billTo.zip }}
              </p>
              <p class="text-gray-600">+0 (000) 123-4567</p>
            </div>
          </div>

          <!-- Invoice Info -->
          <div>
            <div class="space-y-4">
              <div>
                <p class="text-gray-600 mb-1">Invoice number</p>
                <p class="font-semibold text-gray-900">{{ invoice.invoiceNumber }}</p>
              </div>
              <div>
                <p class="text-gray-600 mb-1">Reference</p>
                <p class="font-semibold text-gray-900">INV-057</p>
              </div>
            </div>
          </div>

          <!-- Amount & Dates -->
          <div class="text-right">
            <div class="mb-4">
              <p class="text-gray-600 mb-1">Invoice of ({{ invoice.currency }})</p>
              <p class="text-3xl font-bold text-orange-500">
                {{ formatCurrency(invoice.total, invoice.currency) }}
              </p>
            </div>
            <div class="space-y-2">
              <div>
                <p class="text-gray-600 mb-1">Invoice date</p>
                <p class="font-semibold text-gray-900">
                  {{ formatDate(new Date(invoice.invoiceDate), "MM/DD/YYYY") }}
                </p>
              </div>
              <div>
                <p class="text-gray-600 mb-1">Due date</p>
                <p class="font-semibold text-gray-900">
                  {{ formatDate(new Date(invoice.dueDate), "MM/DD/YYYY") }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Subject -->
        <div class="grid grid-cols-2 gap-6 mb-6">
          <div>
            <p class="text-gray-600 mb-1">Subject</p>
            <p class="font-semibold text-gray-900">Design System</p>
          </div>
        </div>

        <!-- Line Items Table -->
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-gray-200">
                <th class="text-left py-3 text-gray-600 font-medium">ITEM DETAIL</th>
                <th class="text-center py-3 text-gray-600 font-medium">QTY</th>
                <th class="text-right py-3 text-gray-600 font-medium">RATE</th>
                <th class="text-right py-3 text-gray-600 font-medium">AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in invoice.lineItems"
                :key="index"
                class="border-b border-gray-100"
              >
                <td class="py-4">
                  <div>
                    <p class="font-semibold text-gray-900">{{ item.name }}</p>
                    <p class="text-gray-600 text-sm">Item description</p>
                  </div>
                </td>
                <td class="py-4 text-center">{{ item.quantity }}</td>
                <td class="py-4 text-right">{{ item.price }}</td>
                <td class="py-4 text-right">{{ item.total }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Totals Section -->
        <div class="flex justify-end mt-6">
          <div class="w-64 space-y-2">
            <div class="flex justify-between">
              <span class="text-gray-600">Subtotal</span>
              <span class="font-semibold">{{ subtotal }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Tax (10%)</span>
              <span class="font-semibold">{{ tax }}</span>
            </div>
            <hr class="my-2" />
            <div class="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>{{ total }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="space-y-4">
        <p class="font-semibold">Thanks for the business.</p>

        <div class="pt-4">
          <h3 class="font-semibold mb-2">Terms & Conditions</h3>
          <p class="text-gray-600">Please pay within 15 days of receiving this invoice.</p>
        </div>
      </div>
    </div>
  </div>
</template>
