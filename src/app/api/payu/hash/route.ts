import { NextRequest, NextResponse } from "next/server";
import { generatePayUHash, PayUParams } from "@/lib/payu";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      amount,
      productinfo = "AFTER HOURS Streetwear Order",
      firstname = "Customer",
      email = "orders@afterhours.com",
      phone = "9999999999",
      udf1 = "",
      udf2 = "",
      udf3 = "",
      udf4 = "",
      udf5 = "",
    } = body;

    if (!amount) {
      return NextResponse.json({ error: "Amount is required" }, { status: 400 });
    }

    // Format amount as two decimals, e.g. "1299.00"
    const formattedAmount = Number(amount).toFixed(2);

    // Generate unique transaction ID
    const txnid = `AH_${Date.now()}_${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    // Callback URLs
    const origin = req.nextUrl.origin || "https://after-hourscollection.vercel.app";
    const surl = `${origin}/api/payu/response`;
    const furl = `${origin}/api/payu/response`;

    const payuParams: PayUParams = {
      txnid,
      amount: formattedAmount,
      productinfo: productinfo.substring(0, 100),
      firstname: firstname.substring(0, 50),
      email: email.substring(0, 50),
      phone: phone.substring(0, 15),
      surl,
      furl,
      udf1,
      udf2,
      udf3,
      udf4,
      udf5,
    };

    const { hash, key, action } = generatePayUHash(payuParams);

    return NextResponse.json({
      success: true,
      key,
      txnid,
      amount: formattedAmount,
      productinfo: payuParams.productinfo,
      firstname: payuParams.firstname,
      email: payuParams.email,
      phone: payuParams.phone,
      surl,
      furl,
      hash,
      action,
      udf1,
      udf2,
    });
  } catch (error: any) {
    console.error("PayU hash generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate PayU payment hash" },
      { status: 500 }
    );
  }
}
