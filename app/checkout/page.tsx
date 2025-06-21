import { CheckoutForm } from "@/components/checkout-form" // Named import

export default function CheckoutPage() {
  // Default export for the page
  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <CheckoutForm />
    </div>
  )
}
