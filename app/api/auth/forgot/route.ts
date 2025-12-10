import { randomBytes } from "crypto";

import { NextResponse } from "next/server";
import { z } from "zod";

import { getUsersCollection } from "@/lib/models";
import { sendPasswordResetEmail } from "@/lib/mail";

const forgotSchema = z.object({
  email: z.string().email("Email tidak valid"),
});

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsed = forgotSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors.email?.[0] ?? "Email tidak valid" },
        { status: 400 },
      );
    }

    const email = parsed.data.email.trim().toLowerCase();
    const users = await getUsersCollection();
    const user = await users.findOne({ email });

    if (user) {
      const token = randomBytes(32).toString("hex");
      const expiresAt = new Date(Date.now() + 1000 * 60 * 30); // 30 minutes

      await users.updateOne(
        { _id: user._id },
        {
          $set: {
            passwordResetToken: token,
            passwordResetExpires: expiresAt,
            updatedAt: new Date(),
          },
        },
      );

      await sendPasswordResetEmail(email, token, expiresAt);
    }

    return NextResponse.json({
      message:
        "Jika email terdaftar, kami telah mengirimkan tautan reset password ke kotak masuk Anda.",
    });
  } catch (error) {
    console.error("Forgot password error", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server" },
      { status: 500 },
    );
  }
}
