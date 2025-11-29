import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { getUsersCollection } from "@/lib/models";
import { createSessionToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email dan kata sandi diperlukan." },
        { status: 400 }
      );
    }

    const users = await getUsersCollection();
    const user = await users.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Email atau kata sandi tidak valid" },
        { status: 401 }
      );
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { error: "Email atau kata sandi tidak valid" },
        { status: 401 }
      );
    }

    const token = createSessionToken({ userId: user._id.toString() });
    const response = NextResponse.json({
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        bio: user.bio ?? "",
        avatarUrl: user.avatarUrl ?? "",
      },
    });

    response.cookies.set({
      name: "welinas_session",
      value: token,
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Gagal masuk." }, { status: 500 });
  }
}
