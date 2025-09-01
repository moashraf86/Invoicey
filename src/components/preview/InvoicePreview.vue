<script setup lang="ts">
import { formatCurrency } from "@/lib/helper"
import type { Invoice } from "@/lib/types"
import { formatDate } from "@vueuse/core"
import { computed } from "vue"

// PAGE SIZE A4
const pageSize = {
  width: 210,
  height: 297,
}

const MM_TO_PX = 3.78

const props = defineProps<{
  invoice: Invoice
}>()

const total = computed(() => props.invoice.total)
</script>

<template>
  <div class="flex-1 relative h-full">
    <div
      class="mx-auto bg-muted/80 p-8 shadow-lg absolute top-0 left-0 right-0 bottom-0 -translate-y-1/7 flex flex-col"
      :style="{
        width: `${pageSize.width * MM_TO_PX}px`,
        height: `${pageSize.height * MM_TO_PX}px`,
        scale: 0.6,
      }"
    >
      <!-- Header Section -->
      <div class="flex justify-between items-start mb-8">
        <div class="space-y-1">
          <h1 class="text-2xl font-bold text-gray-900">
            {{ props.invoice.billFrom.name }}
          </h1>
          <p class="text-gray-600">{{ props.invoice.billFrom.website }}</p>
          <p class="text-gray-600">{{ props.invoice.billFrom.email }}</p>
          <p class="text-gray-600">{{ props.invoice.billFrom.phone }}</p>
        </div>
        <div class="text-right space-y-1">
          <p class="text-gray-600">
            {{ props.invoice.billFrom.address }}
          </p>
          <p class="text-gray-600">
            {{ props.invoice.billFrom.city }}, {{ props.invoice.billFrom.state }},
            {{ props.invoice.billFrom.country }} - {{ props.invoice.billFrom.zip }}
          </p>
          <p class="text-gray-600">TAX ID {{ props.invoice.billFrom.taxId }}</p>
        </div>
      </div>

      <!-- Invoice Details Section -->
      <div class="border border-gray-200 rounded-lg p-6 mb-6 flex-grow relative bg-white">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <!-- Billed To -->
          <div>
            <p class="text-gray-600 mb-2">Billed to,</p>
            <div class="space-y-1">
              <p class="font-semibold text-gray-900">{{ props.invoice.billTo.name }}</p>
              <p class="text-gray-600">{{ props.invoice.billTo.address }}</p>
              <p class="text-gray-600">
                {{ props.invoice.billTo.city }}, {{ props.invoice.billTo.country }} -
                {{ props.invoice.billTo.zip }}
              </p>
              <p class="text-gray-600">{{ props.invoice.billTo.email }}</p>
              <p class="text-gray-600">{{ props.invoice.billTo.phone }}</p>
            </div>
          </div>

          <!-- Invoice Info -->
          <div>
            <div class="space-y-4">
              <div>
                <p class="text-gray-600 mb-1">Invoice number</p>
                <p class="font-semibold text-gray-900">{{ props.invoice.invoiceNumber }}</p>
              </div>
              <div>
                <p class="text-gray-600 mb-1">Invoice Date</p>
                <p class="font-semibold text-gray-900">
                  {{ formatDate(new Date(props.invoice.invoiceDate), "MM/DD/YYYY") }}
                </p>
              </div>
            </div>
          </div>

          <!-- Amount & Dates -->
          <div class="text-right space-y-4">
            <div>
              <p class="text-gray-600 mb-1">Invoice of ({{ props.invoice.currency }})</p>
              <p class="text-3xl font-bold text-orange-500">
                {{ formatCurrency(props.invoice.total, props.invoice.currency) }}
              </p>
            </div>
            <div>
              <p class="text-gray-600 mb-1">Due Date</p>
              <p class="font-semibold text-gray-900">
                {{ formatDate(new Date(props.invoice.dueDate), "MM/DD/YYYY") }}
              </p>
            </div>
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
                v-for="(item, index) in props.invoice.lineItems"
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
            <div class="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>{{ formatCurrency(total, props.invoice.currency) }}</span>
            </div>
          </div>
        </div>
        <!-- Bank Details -->
        <div class="space-y-2 mt-6">
          <p class="font-semibold">Payment Details</p>
          <p class="text-gray-600">Bank Name: {{ props.invoice.paymentDetails.bankName }}</p>
          <p class="text-gray-600">
            Account Number: {{ props.invoice.paymentDetails.accountNumber }}
          </p>
          <p class="text-gray-600">IBAN: {{ props.invoice.paymentDetails.iban }}</p>
          <p class="text-gray-600">SWIFT Code: {{ props.invoice.paymentDetails.swiftCode }}</p>
        </div>
      </div>
      <!-- Footer -->
      <div class="space-y-4">
        <div class="pt-2">
          <h3 class="font-semibold mb-2">Thank you for the business.</h3>
          <p class="text-gray-600">Please pay within 15 days of receiving this invoice.</p>
        </div>
      </div>
    </div>
  </div>
</template>
