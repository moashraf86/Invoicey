<script setup lang="ts">
import Header from "@/components/layout/Header.vue"
import InvoiceBuilder from "@/components/builder/InvoiceBuilder.vue"
import InvoicePreview from "@/components/preview/InvoicePreview.vue"
</script>

<template>
  <div>
    <Header />
    <main class="flex gap-4 divide-x divide-gray-200 h-[calc(100dvh-64px)]">
      <InvoiceBuilder />
      <InvoicePreview />
    </main>
  </div>
</template>
