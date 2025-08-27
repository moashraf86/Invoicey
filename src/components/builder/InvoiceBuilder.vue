<script setup lang="ts">
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-vue-next"
import { onMounted, ref, watch, computed } from "vue"
import type { Invoice } from "@/lib/types"
import { formatCurrency } from "@/lib/helper"

// TODO: Add local state for invoice data
const invoice = ref<Invoice>({
  invoiceNumber: "INV-0001",
  reference: "INV-0001",
  currency: "USD",
  invoiceDate: new Date().toISOString().split("T")[0],
  dueDate: new Date().toISOString().split("T")[0],
  billFrom: {
    name: "Mohamed Ashraf",
    address: "123 Main St",
    city: "Anytown",
    state: "CA",
    zip: "12345",
    country: "USA",
  },
  billTo: {
    name: "John Doe",
    address: "456 Main St",
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
  ],
  total: 100,
  subtotal: 100,
  tax: 10,
})

// TODO: Save invoice to local storage
const saveInvoice = (newInvoice: Invoice) => {
  console.log("Saving invoice", newInvoice)
  localStorage.setItem("invoice", JSON.stringify(newInvoice))
}
// TODO: Watch for changes and save to local storage
watch(
  invoice,
  (newInvoice) => {
    saveInvoice(newInvoice)
  },
  { deep: true },
)

// TODO: Load invoice from local storage
const loadInvoice = () => {
  const savedInvoice = localStorage.getItem("invoice")
  if (savedInvoice) {
    invoice.value = JSON.parse(savedInvoice)
  }
}

onMounted(() => {
  loadInvoice()
})

// TODO: Calculate total
const calculateItemTotal = computed(() => {
  return invoice.value.lineItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
})

// TODO: Calculate Subtotal for all items
const calculateSubtotal = computed(() => {
  return invoice.value.lineItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
})

// TODO: Calculate Tax
const calculateTax = computed(() => {
  return invoice.value.subtotal * 0.1 // 10% tax
})

// TODO: Calculate Total
const calculateTotal = computed(() => {
  return invoice.value.subtotal + invoice.value.tax
})
</script>

<template>
  <ScrollArea class="h-[calc(100dvh-64px)] basis-1/2 max-w-xl p-4">
    <div class="space-y-4">
      <!-- Invoice Details -->
      <div class="space-y-4">
        <h2 class="text-lg font-medium col-span-2">Invoice Details</h2>
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <Label for="invoice-number">Invoice Number</Label>
            <Input
              id="invoice-number"
              type="text"
              placeholder="INV-0001"
              v-model="invoice.invoiceNumber"
            />
          </div>
          <div class="space-y-2">
            <Label for="invoice-currency">Currency</Label>
            <Input id="invoice-currency" type="text" placeholder="USD" v-model="invoice.currency" />
          </div>
          <div class="space-y-2">
            <Label for="invoice-date">Invoice Date</Label>
            <Input id="invoice-date" type="date" v-model="invoice.invoiceDate" />
          </div>
          <div class="space-y-2">
            <Label for="invoice-due-date">Invoice Due Date</Label>
            <Input id="invoice-due-date" type="date" v-model="invoice.dueDate" />
          </div>
        </div>
      </div>
      <Separator />

      <!-- Bill From -->
      <div class="space-y-4">
        <h2 class="text-lg font-medium">Bill From</h2>
        <div class="grid grid-cols-2 auto-cols-fr gap-4">
          <div class="space-y-2">
            <Label for="bill-from-name">Name</Label>
            <Input
              id="bill-from-name"
              type="text"
              placeholder="John Doe"
              v-model="invoice.billFrom.name"
            />
          </div>
          <div class="space-y-2">
            <Label for="bill-from-address">Address</Label>
            <Input
              id="bill-from-address"
              type="text"
              placeholder="123 Main St, Anytown, USA"
              v-model="invoice.billFrom.address"
            />
          </div>
          <div class="space-y-2">
            <Label for="bill-from-city">City</Label>
            <Input
              id="bill-from-city"
              type="text"
              placeholder="Anytown"
              v-model="invoice.billFrom.city"
            />
          </div>
          <div class="space-y-2">
            <Label for="bill-from-state">State</Label>
            <Input
              id="bill-from-state"
              type="text"
              placeholder="CA"
              v-model="invoice.billFrom.state"
            />
          </div>
          <div class="space-y-2">
            <Label for="bill-from-zip">Zip</Label>
            <Input
              id="bill-from-zip"
              type="text"
              placeholder="12345"
              v-model="invoice.billFrom.zip"
            />
          </div>
          <div class="space-y-2">
            <Label for="bill-from-country">Country</Label>
            <Input
              id="bill-from-country"
              type="text"
              placeholder="USA"
              v-model="invoice.billFrom.country"
            />
          </div>
        </div>
      </div>
      <Separator />

      <!-- Bill To -->
      <div class="space-y-4">
        <h2 class="text-lg font-medium">Bill To</h2>
        <div class="grid grid-cols-2 auto-cols-fr gap-4">
          <div class="space-y-2">
            <Label for="bill-to-name">Name</Label>
            <Input
              id="bill-to-name"
              type="text"
              placeholder="Jane Doe"
              v-model="invoice.billTo.name"
            />
          </div>
          <div class="space-y-2">
            <Label for="bill-to-address">Address</Label>
            <Input
              id="bill-to-address"
              type="text"
              placeholder="456 Main St, Anytown, USA"
              v-model="invoice.billTo.address"
            />
          </div>
          <div class="space-y-2">
            <Label for="bill-to-city">City</Label>
            <Input
              id="bill-to-city"
              type="text"
              placeholder="Anytown"
              v-model="invoice.billTo.city"
            />
          </div>
          <div class="space-y-2">
            <Label for="bill-to-state">State</Label>
            <Input id="bill-to-state" type="text" placeholder="CA" v-model="invoice.billTo.state" />
          </div>
          <div class="space-y-2">
            <Label for="bill-to-zip">Zip</Label>
            <Input id="bill-to-zip" type="text" placeholder="12345" v-model="invoice.billTo.zip" />
          </div>
          <div class="space-y-2">
            <Label for="bill-to-country">Country</Label>
            <Input
              id="bill-to-country"
              type="text"
              placeholder="USA"
              v-model="invoice.billTo.country"
            />
          </div>
        </div>
      </div>
      <Separator />

      <!-- Line Items -->
      <div class="space-y-4">
        <h2 class="text-lg font-medium">Line Items</h2>
        <div class="space-y-3">
          <div class="grid grid-cols-[1fr_6rem_8rem_8rem_auto] items-center gap-4">
            <div class="space-y-2">
              <Label for="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Item Name"
                v-model="invoice.lineItems[0].name"
              />
            </div>
            <div class="space-y-2">
              <Label for="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                placeholder="1"
                v-model="invoice.lineItems[0].quantity"
              />
            </div>
            <div class="space-y-2">
              <Label for="price">Price</Label>
              <Input
                id="price"
                type="number"
                placeholder="100"
                v-model="invoice.lineItems[0].price"
              />
            </div>
            <div class="space-y-2">
              <Label for="total">Total</Label>
              <span class="text-sm font-medium">{{
                formatCurrency(calculateItemTotal, invoice.currency)
              }}</span>
            </div>
            <div class="space-y-2">
              <Label for="total" class="invisible">Delete</Label>
              <Button variant="outline" size="icon" class="text-muted-foreground">
                <Trash2 class="w-4 h-4" />
              </Button>
            </div>
          </div>
          <!-- Add more line items -->
          <Button variant="outline" class="text-muted-foreground">
            <Plus class="w-4 h-4 ml-2" />
            Add Line Item
          </Button>
        </div>
      </div>
      <Separator />

      <!-- Summary -->
      <div class="space-y-4">
        <h2 class="text-lg font-medium">Summary</h2>
        <div class="grid gap-4 text-start">
          <div class="flex justify-between">
            <span class="text-sm text-muted-foreground">Subtotal</span>
            <span class="text-sm font-medium">{{
              formatCurrency(calculateSubtotal, invoice.currency)
            }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm text-muted-foreground">Tax</span>
            <span class="text-sm font-medium">{{
              formatCurrency(calculateTax, invoice.currency)
            }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm text-muted-foreground">Total</span>
            <!-- sync with preview -->
            <span class="text-sm font-medium">{{
              formatCurrency(calculateTotal, invoice.currency)
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </ScrollArea>
</template>
