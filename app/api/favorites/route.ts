import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

import { getFavoriteWordsCollection } from "@/lib/models";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "Missing userId parameter" },
        { status: 400 }
      );
    }

    const favorites = await getFavoriteWordsCollection();
    const items = await favorites
      .find({ userId: new ObjectId(userId) })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(
      items.map((item) => ({
        id: item._id.toString(),
        word: item.word,
        notes: item.notes ?? "",
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      }))
    );
  } catch (error) {
    console.error("Fetch favorites error:", error);
    return NextResponse.json(
      { error: "Failed to fetch favorites." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, word, notes } = await request.json();

    if (!userId || !word) {
      return NextResponse.json(
        { error: "userId dan word diperlukan." },
        { status: 400 }
      );
    }

    const favorites = await getFavoriteWordsCollection();
    const now = new Date();
    const result = await favorites.insertOne({
      _id: new ObjectId(),
      userId: new ObjectId(userId),
      word,
      notes,
      createdAt: now,
      updatedAt: now,
    });

    return NextResponse.json({
      id: result.insertedId.toString(),
      word,
      notes: notes ?? "",
      createdAt: now,
      updatedAt: now,
    });
  } catch (error) {
    console.error("Create favorite error:", error);
    return NextResponse.json(
      { error: "Gagal menyimpan kata favorit." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, word, notes } = await request.json();
    if (!id) {
      return NextResponse.json({ error: "ID favorit hilang" }, { status: 400 });
    }

    const favorites = await getFavoriteWordsCollection();
    await favorites.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...(word ? { word } : {}),
          ...(notes !== undefined ? { notes } : {}),
          updatedAt: new Date(),
        },
      }
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Update favorite error:", error);
    return NextResponse.json(
      { error: "Gagal memperbarui kata favorit." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Parameter id hilang" },
        { status: 400 }
      );
    }

    const favorites = await getFavoriteWordsCollection();
    await favorites.deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Delete favorite error:", error);
    return NextResponse.json(
      { error: "Gagal menghapus kata favorit." },
      { status: 500 }
    );
  }
}
