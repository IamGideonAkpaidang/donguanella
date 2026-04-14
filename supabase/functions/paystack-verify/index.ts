const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const PAYSTACK_SECRET_KEY = Deno.env.get('PAYSTACK_SECRET_KEY')
    if (!PAYSTACK_SECRET_KEY) {
      throw new Error('PAYSTACK_SECRET_KEY is not configured')
    }

    const { reference } = await req.json()

    if (!reference) {
      return new Response(
        JSON.stringify({ error: 'Missing reference' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Verify with Paystack
    const response = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      },
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(`Paystack verify error [${response.status}]: ${JSON.stringify(data)}`)
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    if (data.data?.status === 'success') {
      // Update payment status
      await supabase
        .from('payments')
        .update({
          status: 'success',
          paid_at: new Date().toISOString(),
          metadata: data.data,
        })
        .eq('paystack_reference', reference)

      // Get payment to find enrollment
      const { data: payment } = await supabase
        .from('payments')
        .select('enrollment_id')
        .eq('paystack_reference', reference)
        .single()

      // Activate enrollment
      if (payment?.enrollment_id) {
        await supabase
          .from('enrollments')
          .update({ status: 'active' })
          .eq('id', payment.enrollment_id)
      }

      return new Response(
        JSON.stringify({ verified: true, message: 'Payment verified and enrollment activated' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    } else {
      // Payment not successful
      await supabase
        .from('payments')
        .update({ status: 'failed', metadata: data.data })
        .eq('paystack_reference', reference)

      return new Response(
        JSON.stringify({ verified: false, message: `Payment status: ${data.data?.status}` }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
  } catch (error: unknown) {
    console.error('Paystack verify error:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
