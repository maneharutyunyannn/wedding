import { createTransport, Transporter, SendMailOptions } from "nodemailer";

interface ISuccessResponse {
    success: true;
    message: string;
}
interface IErrorResponse {
    success: false;
    message: string;
}

type TMailResponse = ISuccessResponse | IErrorResponse;

const sendEmailService = async (
    to: string,
    subject: string,
    html: string
): Promise<TMailResponse> => {
    try {
        const transporter: Transporter = createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });

        const mailOptions: SendMailOptions = {
            from: {
                name: process.env.APP_NAME || "",
                address: process.env.GMAIL_USER || "",
            },
            to,
            subject,
            html,
        };

        await transporter.sendMail(mailOptions);

        return {
            success: true,
            message: "Email delivered successfully",
        };
    } catch (err) {
        const error = err as Error;
        return {
            success: false,
            message: `Failed to deliver email: ${error.message || "Unknown error"}`,
        };
    }
};

export { sendEmailService };
