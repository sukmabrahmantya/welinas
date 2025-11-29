import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

import { getSessionFromRequest } from "@/lib/auth";
import { getUsersCollection } from "@/lib/models";

export async function GET() {
  try {
    const session = await getSessionFromRequest();
    if (!session) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const users = await getUsersCollection();
    const user = await users.findOne({ _id: new ObjectId(session.userId) });
    if (!user) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    return NextResponse.json({
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        bio: user.bio ?? "",
        avatarUrl: user.avatarUrl ?? "",
      },
    });
  } catch (error) {
    console.error("Me endpoint error:", error);
    return NextResponse.json(
      { error: "Gagal mengambil pengguna saat ini." },
      { status: 500 }
    );
  }
}
