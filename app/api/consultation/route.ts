import { NextResponse } from "next/server";

interface ConsultationBody {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  procedure?: string;
  city?: string;
  procedureId?: string;
  categoryId?: string;
  clinicId?: string;
  clinicName?: string;
  message?: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ConsultationBody;
    const firstName = body.firstName?.trim();
    const lastName = body.lastName?.trim();
    const email = body.email?.trim();
    const phone = body.phone?.trim();

    if (!firstName || !lastName || !email || !phone) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const payload = {
      firstName,
      lastName,
      email,
      phone,
      procedure: body.procedure?.trim() ?? "",
      city: body.city?.trim() ?? "",
      procedureId: body.procedureId?.trim() ?? "",
      categoryId: body.categoryId?.trim() ?? "",
      clinicId: body.clinicId?.trim() ?? "",
      clinicName: body.clinicName?.trim() ?? "",
      message: body.message?.trim() ?? "",
      submittedAt: new Date().toISOString(),
    };

    if (process.env.CONSULTATION_WEBHOOK_URL) {
      const webhookRes = await fetch(process.env.CONSULTATION_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!webhookRes.ok) {
        return NextResponse.json(
          { error: "Unable to submit request. Please call 1717." },
          { status: 502 }
        );
      }
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Unable to submit request. Please try again." },
      { status: 500 }
    );
  }
}
