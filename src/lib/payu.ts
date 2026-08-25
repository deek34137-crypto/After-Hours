import crypto from "crypto";

export interface PayUParams {
  txnid: string;
  amount: string; // e.g. "1299.00"
  productinfo: string;
  firstname: string;
  email: string;
  phone: string;
  surl: string;
  furl: string;
  udf1?: string;
  udf2?: string;
  udf3?: string;
  udf4?: string;
  udf5?: string;
}

export const getPayUActionUrl = (): string => {
  const env = process.env.PAYU_ENV || "test";
  return env === "prod" || env === "production"
    ? "https://secure.payu.in/_payment"
    : "https://test.payu.in/_payment";
};

/**
 * Generate PayU Request SHA-512 Hash:
 * sha512(key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||SALT)
 */
export function generatePayUHash(params: PayUParams): { hash: string; key: string; action: string } {
  const key = process.env.PAYU_MERCHANT_KEY || "dGWx70";
  const salt = process.env.PAYU_MERCHANT_SALT || "asBjWh36cWFCM75gqukfwXaAiRGYU4Oa";

  const {
    txnid,
    amount,
    productinfo,
    firstname,
    email,
    udf1 = "",
    udf2 = "",
    udf3 = "",
    udf4 = "",
    udf5 = "",
  } = params;

  // Format: key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||SALT
  const hashString = `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|${udf1}|${udf2}|${udf3}|${udf4}|${udf5}||||||${salt}`;

  const hash = crypto.createHash("sha512").update(hashString).digest("hex");
  const action = getPayUActionUrl();

  return { hash, key, action };
}

/**
 * Verify PayU Response SHA-512 Hash:
 * sha512(SALT|status||||||udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key)
 */
export function verifyPayUResponseHash(postData: Record<string, string>): boolean {
  const key = process.env.PAYU_MERCHANT_KEY || "dGWx70";
  const salt = process.env.PAYU_MERCHANT_SALT || "asBjWh36cWFCM75gqukfwXaAiRGYU4Oa";

  const {
    status = "",
    txnid = "",
    amount = "",
    productinfo = "",
    firstname = "",
    email = "",
    udf1 = "",
    udf2 = "",
    udf3 = "",
    udf4 = "",
    udf5 = "",
    hash = "",
  } = postData;

  // Format: SALT|status||||||udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key
  const hashString = `${salt}|${status}||||||${udf5}|${udf4}|${udf3}|${udf2}|${udf1}|${email}|${firstname}|${productinfo}|${amount}|${txnid}|${key}`;

  const calculatedHash = crypto.createHash("sha512").update(hashString).digest("hex");

  return calculatedHash.toLowerCase() === (hash || "").toLowerCase();
}
