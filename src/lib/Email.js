import { Resend } from "resend";
import { resumeReportTemplate } from "../lib/EmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendReportEmail({ email, report }) {
    console.log("Sending Email to: ", email)
    try {
        await resend.emails.send({
            from: "Resume AI <onboarding@resend.dev>",
            to: email,
            subject: "Your Resume Analysis Report",
            html: resumeReportTemplate(report),
        });
    } catch (error) {
        console.log("Send Report Email: ", error)
    }
}
