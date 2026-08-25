import { NextRequest, NextResponse } from "next/server";
import { verifyPayUResponseHash } from "@/lib/payu";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const data: Record<string, string> = {};

    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    const status = data.status || "";
    const txnid = data.txnid || "";
    const amount = data.amount || "";
    const mihpayid = data.mihpayid || "";
    const mode = data.mode || "UPI";
    const error_Message = data.error_Message || "";

    const isValid = verifyPayUResponseHash(data);

    const origin = req.nextUrl.origin || "https://after-hourscollection.vercel.app";

    if (status.toLowerCase() === "success") {
      const successUrl = new URL(`${origin}/order-success`);
      successUrl.searchParams.set("txnid", txnid);
      successUrl.searchParams.set("amount", amount);
      successUrl.searchParams.set("payment_id", mihpayid);
      successUrl.searchParams.set("mode", mode);
      successUrl.searchParams.set("status", "success");

      return NextResponse.redirect(successUrl.toString(), 303);
    } else {
      const failUrl = new URL(`${origin}/order-failed`);
      failUrl.searchParams.set("txnid", txnid);
      failUrl.searchParams.set("amount", amount);
      failUrl.searchParams.set("reason", error_Message || "Transaction failed or cancelled");
      failUrl.searchParams.set("status", status);

      return NextResponse.redirect(failUrl.toString(), 303);
    }
  } catch (error) {
    console.error("PayU response handler error:", error);
    const origin = req.nextUrl.origin || "https://after-hourscollection.vercel.app";
    return NextResponse.redirect(`${origin}/order-failed?reason=Server%20Error`, 303);
  }
}
