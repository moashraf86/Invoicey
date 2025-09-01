<script setup lang="ts">
import { Separator } from "@/components/ui/separator"
import { ref, watch } from "vue"
import type { Invoice } from "@/lib/types"
import { formatCurrency } from "@/lib/helper"
import { Trash2, Plus } from "lucide-vue-next"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// ==============================================
// 1. DEFINE PROPS & EMITS
// ==============================================
// Props: data to be passed from parent
const props = defineProps<{
  invoice: Invoice
}>()

// Emits: events to be emitted to parent
const emit = defineEmits<{
  (e: "update:invoice", value: Invoice): void
}>()

// ==============================================
// 2. CREATE LOCAL COPY OF INVOICE
// ==============================================
//NOTE: create a local copy of the invoice to avoid mutating the original invoice object
const localInvoice = ref<Invoice>({ ...props.invoice })

// ==============================================
// 3. SYNC LOCAL INVOICE BACK TO PARENT INVOICE
// ==============================================
watch(
  localInvoice,
  (newInvoice: Invoice) => {
    // emit the updated invoice to the parent
    emit("update:invoice", newInvoice)
  },
  { deep: true },
)

// ==============================================
// 4. SYNC PARENT INVOICE TO LOCAL INVOICE
// ==============================================
watch(
  props.invoice,
  (newInvoice: Invoice) => {
    localInvoice.value = { ...newInvoice }
  },
  { deep: true },
)

// ==============================================
// 5. LINE ITEMS MANAGEMENT
// ==============================================
// 5.1. ADD LINE ITEM
const addLineItem = () => {
  const newItem: Invoice["lineItems"][number] = {
    name: "",
    quantity: 1,
    price: 0,
    total: 0,
  }
  localInvoice.value.lineItems.push(newItem)
}

// 5.2. REMOVE LINE ITEM
const removeLineItem = (index: number) => {
  if (localInvoice.value.lineItems.length > 1) {
    localInvoice.value.lineItems.splice(index, 1)
  } else {
    // if there is only one line item, clear the line item
    console.log("Cannot remove the last line item")

    localInvoice.value.lineItems = [
      {
        name: "",
        quantity: 1,
        price: 0,
        total: 0,
      },
    ]
  }
}
</script>

<template>
  <div class="space-y-4 p-2">
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
            v-model="localInvoice.invoiceNumber"
          />
        </div>
        <div class="space-y-2">
          <Label for="invoice-currency">Currency</Label>
          <Select v-model="localInvoice.currency" class="w-full">
            <SelectTrigger class="w-full">
              <SelectValue placeholder="Select Currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="EGP">EGP</SelectItem>
              <SelectItem value="AED">AED</SelectItem>
              <SelectItem value="SAR">SAR</SelectItem>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="EUR">EUR</SelectItem>
              <SelectItem value="GBP">GBP</SelectItem>
              <SelectItem value="JPY">JPY</SelectItem>
              <SelectItem value="CAD">CAD</SelectItem>
              <SelectItem value="AUD">AUD</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div class="space-y-2">
          <Label for="invoice-date">Invoice Date</Label>
          <Input id="invoice-date" type="date" v-model="localInvoice.invoiceDate" />
        </div>
        <div class="space-y-2">
          <Label for="invoice-due-date">Invoice Due Date</Label>
          <Input id="invoice-due-date" type="date" v-model="localInvoice.dueDate" />
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
            v-model="localInvoice.billFrom.name"
          />
        </div>
        <div class="space-y-2">
          <Label for="bill-from-website">Website</Label>
          <Input
            id="bill-from-website"
            type="text"
            placeholder="https://example.com"
            v-model="localInvoice.billFrom.website"
          />
        </div>
        <div class="space-y-2">
          <Label for="bill-from-address">Address</Label>
          <Input
            id="bill-from-address"
            type="text"
            placeholder="123 Main St, Anytown, USA"
            v-model="localInvoice.billFrom.address"
          />
        </div>
        <div class="space-y-2">
          <Label for="bill-from-city">City</Label>
          <Input
            id="bill-from-city"
            type="text"
            placeholder="Anytown"
            v-model="localInvoice.billFrom.city"
          />
        </div>
        <div class="space-y-2">
          <Label for="bill-from-state">State</Label>
          <Input
            id="bill-from-state"
            type="text"
            placeholder="CA"
            v-model="localInvoice.billFrom.state"
          />
        </div>
        <div class="space-y-2">
          <Label for="bill-from-zip">Zip</Label>
          <Input
            id="bill-from-zip"
            type="text"
            placeholder="12345"
            v-model="localInvoice.billFrom.zip"
          />
        </div>
        <div class="space-y-2">
          <Label for="bill-from-country">Country</Label>
          <Input
            id="bill-from-country"
            type="text"
            placeholder="USA"
            v-model="localInvoice.billFrom.country"
          />
        </div>
        <div class="space-y-2">
          <Label for="bill-from-tax-id">Tax ID</Label>
          <Input
            id="bill-from-tax-id"
            type="text"
            placeholder="00XXXXX1234X0XX"
            v-model="localInvoice.billFrom.taxId"
          />
        </div>
        <div class="space-y-2">
          <Label for="bill-from-email">Email</Label>
          <Input
            id="bill-from-email"
            type="email"
            placeholder="john.doe@example.com"
            v-model="localInvoice.billFrom.email"
          />
        </div>
        <div class="space-y-2">
          <Label for="bill-from-phone">Phone</Label>
          <Input
            id="bill-from-phone"
            type="text"
            placeholder="+0 (000) 123-4567"
            v-model="localInvoice.billFrom.phone"
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
            v-model="localInvoice.billTo.name"
          />
        </div>
        <div class="space-y-2">
          <Label for="bill-to-address">Address</Label>
          <Input
            id="bill-to-address"
            type="text"
            placeholder="456 Main St, Anytown, USA"
            v-model="localInvoice.billTo.address"
          />
        </div>
        <div class="space-y-2">
          <Label for="bill-to-city">City</Label>
          <Input
            id="bill-to-city"
            type="text"
            placeholder="Anytown"
            v-model="localInvoice.billTo.city"
          />
        </div>
        <div class="space-y-2">
          <Label for="bill-to-state">State</Label>
          <Input
            id="bill-to-state"
            type="text"
            placeholder="CA"
            v-model="localInvoice.billTo.state"
          />
        </div>
        <div class="space-y-2">
          <Label for="bill-to-zip">Zip</Label>
          <Input
            id="bill-to-zip"
            type="text"
            placeholder="12345"
            v-model="localInvoice.billTo.zip"
          />
        </div>
        <div class="space-y-2">
          <Label for="bill-to-country">Country</Label>
          <Input
            id="bill-to-country"
            type="text"
            placeholder="USA"
            v-model="localInvoice.billTo.country"
          />
        </div>
        <div class="space-y-2">
          <Label for="bill-to-email">Email</Label>
          <Input
            id="bill-to-email"
            type="email"
            placeholder="john.doe@example.com"
            v-model="localInvoice.billTo.email"
          />
        </div>
        <div class="space-y-2">
          <Label for="bill-to-phone">Phone</Label>
          <Input
            id="bill-to-phone"
            type="text"
            placeholder="+0 (000) 123-4567"
            v-model="localInvoice.billTo.phone"
          />
        </div>
      </div>
    </div>
    <Separator />

    <!-- Line Items -->
    <div class="space-y-4">
      <h2 class="text-lg font-medium">Line Items</h2>
      <div class="divide-y divide-gray-200">
        <div
          v-for="(item, index) in localInvoice.lineItems"
          :key="index"
          class="grid grid-cols-[1fr_4rem_6rem_6rem_auto] items-center gap-4 py-4 last-of-type:mb-4"
        >
          <div class="space-y-2">
            <Label for="name">Name</Label>
            <Input id="name" type="text" placeholder="Item Name" v-model="item.name" />
          </div>
          <div class="space-y-2">
            <Label for="quantity">Quantity</Label>
            <Input id="quantity" type="number" placeholder="1" v-model="item.quantity" />
          </div>
          <div class="space-y-2">
            <Label for="price">Price</Label>
            <Input id="price" type="number" placeholder="100" v-model="item.price" />
          </div>
          <div class="space-y-2">
            <Label for="total">Total</Label>
            <span class="text-sm font-medium">{{
              formatCurrency(item.total, localInvoice.currency)
            }}</span>
          </div>
          <div class="space-y-2">
            <Button
              variant="outline"
              size="icon"
              class="text-muted-foreground"
              @click="removeLineItem(index)"
            >
              <Trash2 class="w-4 h-4" />
            </Button>
          </div>
        </div>
        <!-- Add more line items -->
        <Button variant="outline" class="text-muted-foreground" @click="addLineItem">
          <Plus class="w-4 h-4 ml-2" />
          Add Line Item
        </Button>
      </div>
    </div>
    <Separator />

    <!-- Payment Details -->
    <div class="space-y-4">
      <h2 class="text-lg font-medium">Payment Details</h2>
      <div class="grid grid-cols-2 auto-cols-fr gap-4">
        <div class="space-y-2">
          <Label for="payment-details-bank-name">Bank Name</Label>
          <Input
            id="payment-details-bank-name"
            type="text"
            placeholder="National Bank of Egypt"
            v-model="localInvoice.paymentDetails.bankName"
          />
        </div>
        <div class="space-y-2">
          <Label for="payment-details-account-number">Account Number</Label>
          <Input
            id="payment-details-account-number"
            type="text"
            placeholder="1234567890"
            v-model="localInvoice.paymentDetails.accountNumber"
          />
        </div>
        <div class="space-y-2">
          <Label for="payment-details-iban">IBAN</Label>
          <Input
            id="payment-details-iban"
            type="text"
            placeholder="1234567890"
            v-model="localInvoice.paymentDetails.iban"
          />
        </div>
        <div class="space-y-2">
          <Label for="payment-details-swift-code">SWIFT Code</Label>
          <Input
            id="payment-details-swift-code"
            type="text"
            placeholder="1234567890"
            v-model="localInvoice.paymentDetails.swiftCode"
          />
        </div>
      </div>
    </div>
  </div>
</template>
