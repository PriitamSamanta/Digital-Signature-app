import nodemailer from "nodemailer";

const transporter =
    nodemailer.createTransport({
        service: "gmail",
        auth: {
            user:
                process.env.EMAIL_USER,
            pass:
                process.env.EMAIL_PASS,
        },
    });

export const sendSigningEmail =
    async (
        email: string,
        signingLink: string
    ) => {
        await transporter.sendMail({
            from:
                process.env.EMAIL_USER,

            to: email,

            subject:
                "Document Signature Request",

            html: `
        <h2>Please Sign Document</h2>

        <p>
            Hello,

            You have been requested to sign a document.
        </p>

        <a href="${signingLink}">
          Sign Document
        </a>

        <p>
            Thank you,
            Innovexis Digital Signature Platform
        </p>
      `,
        });
    };