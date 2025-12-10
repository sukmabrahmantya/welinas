import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";

import { getUsersCollection } from "@/lib/models";

const resetSchema = z.object({
  token: z.string().min(16, "Token tidak valid"),
  password: z.string().min(8, "Password minimal 8 karakter"),
});

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsed = resetSchema.safeParse(payload);

    if (!parsed.success) {
      const message =
        parsed.error.flatten().fieldErrors.password?.[0] ??
        parsed.error.flatten().fieldErrors.token?.[0] ??
        "Permintaan tidak valid";
      return NextResponse.json({ error: message }, { status: 400 });
    }

    const { token, password } = parsed.data;
    const users = await getUsersCollection();
    const user = await users.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: new Date() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Token tidak valid atau sudah kedaluwarsa" },
        { status: 400 },
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await users.updateOne(
      { _id: user._id },
      {
        $set: {
          passwordHash,
          updatedAt: new Date(),
        },
        $unset: {
          passwordResetToken: "",
          passwordResetExpires: "",
        },
      },
    );

    return NextResponse.json({ message: "Password berhasil diperbarui" });
  } catch (error) {
    console.error("Reset password error", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server" },
      { status: 500 },
    );
  }
}
