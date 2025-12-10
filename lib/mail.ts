import nodemailer from "nodemailer";

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  SMTP_SECURE,
  MAIL_FROM,
  APP_ORIGIN,
  NEXT_PUBLIC_APP_URL,
} = process.env;

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (transporter) return transporter;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    console.warn(
      "[mailer] SMTP credentials are missing; reset emails will not be sent.",
    );
    return null;
  }

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: SMTP_SECURE === "true",
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  return transporter;
}

function resolveAppOrigin() {
  return APP_ORIGIN || NEXT_PUBLIC_APP_URL || "http://localhost:3000";
}

export async function sendPasswordResetEmail(
  to: string,
  token: string,
  expiresAt: Date,
) {
  const mailer = getTransporter();
  if (!mailer) return;

  const baseUrl = resolveAppOrigin().replace(/\/$/, "");
  const resetUrl = `${baseUrl}/reset-password?token=${token}`;

  const from = MAIL_FROM || "Welinas <no-reply@welinas.id>";
  const subject = "Instruksi Reset Password Welinas";
  const expiryLabel = expiresAt.toLocaleString("id-ID", {
    dateStyle: "full",
    timeStyle: "short",
  });

  const text = `Halo,

Kami menerima permintaan reset password untuk akun Welinas Anda. Klik tautan berikut untuk mengatur password baru:
${resetUrl}

Tautan ini akan kedaluwarsa pada ${expiryLabel}. Jika Anda tidak meminta reset password, abaikan email ini.

Salam,
Tim Welinas`;

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a">
      <h2 style="color:#1E293B;margin-bottom:16px">Reset Password Welinas</h2>
      <p>Halo,</p>
      <p>Kami menerima permintaan untuk mengatur ulang password akun Anda. Klik tombol di bawah untuk melanjutkan.</p>
      <p style="text-align:center;margin:32px 0">
        <a href="${resetUrl}" style="display:inline-block;padding:14px 28px;background:#1E293B;color:#fff;text-decoration:none;border-radius:999px;font-weight:600">Reset Password</a>
      </p>
      <p>Tautan ini akan kedaluwarsa pada <strong>${expiryLabel}</strong>.</p>
      <p>Jika Anda tidak merasa meminta reset password, abaikan email ini.</p>
      <p style="margin-top:24px">Salam hangat,<br/>Tim Welinas</p>
    </div>
  `;

  await mailer.sendMail({ from, to, subject, text, html });
}
