import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(req: NextRequest) {
  const { amount } = await req.json();

  if (!amount || isNaN(amount)) {
    return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
  }

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  });

  const payment_capture = 1;
  const currency = 'INR';

  const options = {
    amount: amount * 100, // convert to paise
    currency,
    receipt: `splitflow_rcpt_${Date.now()}`,
    payment_capture,
  };

  try {
    const order = await razorpay.orders.create(options);
    return NextResponse.json(order);
  } catch (err) {
    console.error('❌ Razorpay order creation error:', err);
    return NextResponse.json({ error: 'Failed to create Razorpay order' }, { status: 500 });
  }
}
