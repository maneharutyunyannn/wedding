'use server'
import {sendEmailService} from "@/lib/services/sendMailService";

interface FormMessage {
    attendance: string;
    side: string;
    name: string;
    count: string;
}

async function sendFeedbackMessageAction(_: unknown, formData: FormData) {
    const formDetails = Object.fromEntries(formData.entries()) as unknown as FormMessage;
    console.log(process.env.GMAIL_USER, process.env.GMAIL_APP_PASSWORD);

    const {attendance, side, name, count} = formDetails;

    const adminMail = process.env.GOOGLE_TO_EMAIL || "";

    const emailBody = `
<!DOCTYPE html>
<html lang="hy">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Հարսանյաց պատասխան</title>
</head>

<body style="margin:0; padding:0; background-color:#f6f4f2; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;">
  <table role="presentation" style="padding:50px 0; width: 200px; margin: 0 auto">
    <tr>
      <td>
        <table role="presentation" width="520" cellspacing="0" cellpadding="0" style="background:#ffffff; border-radius:18px; overflow:hidden; box-shadow:0 18px 40px rgba(0,0,0,0.08);">

          <tr>
            <td style="height:6px; background:linear-gradient(90deg,#e7c7c2,#f3e7dd);"></td>
          </tr>
          
          <tr>
            <td style="padding:26px 32px; color:#333; font-size:15px; line-height:1.8;">

              <p style="margin:0 0 14px;">
                <strong>Անուն:</strong> ${name}
              </p>

              <p style="margin:0 0 14px;">
                <strong>Ներկայություն:</strong> ${attendance}
              </p>

              <p style="margin:0 0 14px;">
                <strong>Կողմ:</strong> ${side}
              </p>

              <p style="margin:0;">
                <strong>Հյուրերի քանակ:</strong> ${count}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

    const res = await sendEmailService(
        adminMail,
        "Wedding",
        emailBody
    );

    return {success: res.success};
}

export default sendFeedbackMessageAction;