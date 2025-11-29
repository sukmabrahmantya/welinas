import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";

import { getUsersCollection } from "@/lib/models";
import { createSessionToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Nama, email, dan kata sandi diperlukan." },
        { status: 400 }
      );
    }

    const users = await getUsersCollection();
    const existing = await users.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { error: "Email sudah terdaftar." },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const now = new Date();
    const result = await users.insertOne({
      _id: new ObjectId(),
      name,
      email,
      passwordHash,
      createdAt: now,
      updatedAt: now,
    });

    const token = createSessionToken({ userId: result.insertedId.toString() });
    const response = NextResponse.json(
      {
        user: {
          id: result.insertedId.toString(),
          name,
          email,
          createdAt: now,
        },
      },
      { status: 201 }
    );
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
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "Gagal mendaftarkan pengguna." },
      { status: 500 }
    );
  }
}
