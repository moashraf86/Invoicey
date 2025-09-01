<script setup lang="ts">
import { formatCurrency } from "@/lib/helper"
import type { Invoice } from "@/lib/types"

const props = defineProps<{
  invoice: Invoice
}>()
</script>

<template>
  <div class="space-y-4 p-2">
    <h2 class="text-lg font-medium">Summary</h2>
    <div class="grid gap-4 text-start">
      <div class="flex justify-between">
        <span class="text-sm text-muted-foreground">Total Amount</span>
        <span class="text-sm font-medium">{{
          formatCurrency(props.invoice.total, props.invoice.currency)
        }}</span>
      </div>
    </div>
  </div>
</template>
