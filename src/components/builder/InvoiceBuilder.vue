<script setup lang="ts">
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import type { Invoice } from "@/lib/types"
import InvoiceSummary from "./InvoiceSummary.vue"
import InvoiceForm from "./InvoiceForm.vue"

// Props: data to be passed from parent
const props = defineProps<{
  invoice: Invoice
}>()

const emit = defineEmits<{
  (e: "update:invoice", value: Invoice): void
}>()
</script>

<template>
  <ScrollArea class="h-[calc(100dvh-64px)] basis-1/2 max-w-xl p-4">
    <div class="space-y-6">
      <InvoiceForm :invoice="props.invoice" @update:invoice="emit('update:invoice', $event)" />
      <Separator />
      <InvoiceSummary :invoice="props.invoice" />
    </div>
  </ScrollArea>
</template>
