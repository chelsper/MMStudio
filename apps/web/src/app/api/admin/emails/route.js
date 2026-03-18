import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

async function checkAdmin() {
  const session = await auth();
  if (!session?.user?.id) return null;
  const rows = await sql("SELECT is_admin FROM auth_users WHERE id = $1", [
    session.user.id,
  ]);
  if (!rows.length || !rows[0].is_admin) return null;
  return session.user;
}

// GET /api/admin/emails — list sent email logs
export async function GET() {
  try {
    const admin = await checkAdmin();
    if (!admin) {
      return Response.json({ error: "Unauthorized" }, { status: 403 });
    }

    const logs = await sql(
      "SELECT * FROM email_logs ORDER BY created_at DESC LIMIT 100",
    );
    return Response.json({ emails: logs });
  } catch (error) {
    console.error("Admin emails error:", error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

// POST /api/admin/emails — compose & log an email draft
export async function POST(request) {
  try {
    const admin = await checkAdmin();
    if (!admin) {
      return Response.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await request.json();
    const { recipient_email, subject, body_text } = body;

    if (!recipient_email || !subject) {
      return Response.json(
        { error: "Recipient and subject required" },
        { status: 400 },
      );
    }

    await sql(
      `INSERT INTO email_logs (recipient_email, subject, body_text, sent_by)
       VALUES ($1, $2, $3, $4)`,
      [recipient_email, subject, body_text || "", admin.id],
    );

    return Response.json({
      success: true,
      message:
        "Email draft saved. Connect an email service (e.g. SendGrid, Resend) to send emails automatically.",
    });
  } catch (error) {
    console.error("Admin email error:", error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
