import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Wiapy typically sends data in a specific format.
    // We assume they send 'email' and 'status'.
    // NOTE: You should verify the exact payload from Wiapy docs or testing.
    const { email, status } = data;

    if (!email || status !== "approved") {
      return NextResponse.json(
        { message: "Invalid payload or status" },
        { status: 400 },
      );
    }

    // Find user by email in Firestore
    const usersRef = adminDb.collection("users");
    const snapshot = await usersRef.where("email", "==", email).limit(1).get();

    if (snapshot.empty) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const userDoc = snapshot.docs[0];

    // Update payment status and activate account
    await userDoc.ref.update({
      paymentStatus: "paid",
      active: true,
    });

    console.log(`Payment approved for user: ${email}`);

    return NextResponse.json(
      { message: "Payment processed successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
