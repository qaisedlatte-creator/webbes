// Minimal ambient types for @cashfreepayments/cashfree-js — the package ships
// no .d.ts of its own (dist/script.js only). Shape follows the documented
// checkout() options/result: https://www.cashfree.com/docs/payments/online/web/redirect
declare module '@cashfreepayments/cashfree-js' {
  export interface CashfreeCheckoutOptions {
    paymentSessionId: string
    redirectTarget?: '_self' | '_blank' | '_top' | '_modal' | HTMLElement
    appearance?: { width?: string; height?: string }
  }

  export interface CashfreeCheckoutResult {
    error?: { message?: string; [key: string]: unknown }
    redirect?: boolean
    paymentDetails?: { paymentMessage?: string; [key: string]: unknown }
  }

  export interface Cashfree {
    checkout(options: CashfreeCheckoutOptions): Promise<CashfreeCheckoutResult>
  }

  export function load(options: { mode: 'sandbox' | 'production' }): Promise<Cashfree>
}
