<script setup lang="ts">
import { Button } from "@/components/ui/button"
import { Download, Send } from "lucide-vue-next"

defineOptions({ name: "HeaderComp" })
</script>

<template>
  <header class="flex items-center justify-between p-4 border-b h-16">
    <h1 class="text-2xl font-bold uppercase font-mono">Invoicey</h1>
    <div class="flex items-center gap-2">
      <Button variant="outline"> <Download class="mr-2" /> Download PDF</Button>
      <Button> <Send class="mr-2" /> Send Invoice</Button>
    </div>
  </header>
</template>
