"use server";

import { letterHtml } from "./email";

export type ContactState = { status: "idle" | "sent" | "error" | "fallback"; message?: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Sends the contact form to Jess through Resend.
 * Needs RESEND_API_KEY and CONTACT_TO_EMAIL (see .env.example).
 * Without them it returns "fallback" and the form offers an email link instead.
 */
export async function sendMessage(_prev: ContactState, form: FormData): Promise<ContactState> {
  const get = (k: string) => String(form.get(k) ?? "").trim().slice(0, 4000);
  const name = get("name");
  const brand = get("brand");
  const email = get("email");
  const message = get("message");

  if (get("website")) return { status: "sent" }; // spam trap
  if (!name || !email || !message) return { status: "error", message: "Please add your name, email and a short message." };
  if (!EMAIL.test(email)) return { status: "error", message: "That email doesn't look quite right." };

  // The doll look they styled in "Jess's Dress-Up" (optional), sent as a picture attachment
  const lookName = get("lookName");
  const lookItems = get("lookItems");
  const lookImage = String(form.get("lookImage") ?? "");
  const jpeg = /^data:image\/jpeg;base64,([A-Za-z0-9+/=]+)$/.exec(lookImage);
  const attachment = jpeg && jpeg[1].length < 1_500_000 ? [{ filename: "styled-look.jpg", content: jpeg[1], content_id: "styled-look" }] : undefined;
  const lookText = lookName ? `\n\n— They styled your paper doll —\n${lookName}${lookItems ? `: ${lookItems}` : ""}${attachment ? "\n(picture attached)" : ""}` : "";

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!key || !to) return { status: "fallback" };

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
        to: [to],
        reply_to: email,
        subject: `💌 A letter from ${name}${brand ? ` at ${brand}` : ""}${lookName ? " (+ a styled look ♡)" : ""}`,
        html: letterHtml({ name, brand, email, message, lookName, lookItems, lookCid: attachment ? "styled-look" : undefined }),
        text: `Name: ${name}\nBrand: ${brand || "-"}\nEmail: ${email}\n\n${message}${lookText}`,
        attachments: attachment,
      }),
    });
    if (!res.ok) throw new Error(String(res.status));
    return { status: "sent" };
  } catch {
    return { status: "error", message: "That didn't send. Please use the email button below." };
  }
}
