import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const PAYSTACK_SECRET_KEY = Deno.env.get('PAYSTACK_SECRET_KEY')
    if (!PAYSTACK_SECRET_KEY) {
      throw new Error('PAYSTACK_SECRET_KEY is not configured')
    }

    // ---- Authenticate caller ----
    const authHeader = req.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }
    const token = authHeader.replace('Bearer ', '')

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY')!
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

    const supabaseAuth = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    })
    const { data: userData, error: userErr } = await supabaseAuth.auth.getUser(token)
    if (userErr || !userData?.user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }
    const user = userData.user

    const { reference, callback_url } = await req.json()
    if (!reference || typeof reference !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Missing required field: reference' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // ---- Look up payment record server-side; ignore caller-supplied amount/email ----
    const supabaseAdmin = createClient(supabaseUrl, serviceKey)
    const { data: payment, error: payErr } = await supabaseAdmin
      .from('payments')
      .select('id, user_id, course_id, amount, currency, enrollment_id, status')
      .eq('paystack_reference', reference)
      .single()

    if (payErr || !payment) {
      return new Response(JSON.stringify({ error: 'Payment record not found' }), {
        status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }
    if (payment.user_id !== user.id) {
      return new Response(JSON.stringify({ error: 'Forbidden' }), {
        status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }
    if (payment.status === 'success') {
      return new Response(JSON.stringify({ error: 'Payment already completed' }), {
        status: 409, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const { data: course } = await supabaseAdmin
      .from('courses')
      .select('title')
      .eq('id', payment.course_id)
      .single()

    const amountKobo = Math.round(Number(payment.amount) * 100)

    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user.email,
        amount: amountKobo,
        reference,
        metadata: {
          course_id: payment.course_id,
          enrollment_id: payment.enrollment_id,
          user_id: user.id,
          course_title: course?.title,
        },
        callback_url: callback_url || undefined,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(`Paystack API error [${response.status}]: ${JSON.stringify(data)}`)
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error: unknown) {
    console.error('Paystack initialize error:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
