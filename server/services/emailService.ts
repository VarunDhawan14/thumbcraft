import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("EMAIL CONFIG ERROR:", error);
  } else {
    console.log("EMAIL SERVER READY:", success);
  }
});

// =====================================================
// VERIFY EMAIL
// =====================================================

export const sendVerificationEmail = async (
  email: string,
  name: string,
  code: string,
) => {
  await transporter.sendMail({
    from: `"ThumbCraft" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify your ThumbCraft account ✨",
    html: `
      <div style="
        font-family: Arial, Helvetica, sans-serif;
        max-width: 600px;
        margin: 0 auto;
        padding: 40px 30px;
        background: #ffffff;
        color: #18181b;
      ">

        <div style="
          text-align: center;
          margin-bottom: 30px;
        ">
          <h1 style="
            margin: 0;
            font-size: 30px;
            color: #ec4899;
            font-weight: 700;
          ">
            ThumbCraft ✨
          </h1>

          <p style="
            margin: 8px 0 0;
            color: #71717a;
            font-size: 14px;
          ">
            AI-powered thumbnail creation made simple.
          </p>
        </div>

        <div style="
          border: 1px solid #f1f1f1;
          border-radius: 16px;
          padding: 30px;
          background: #fafafa;
        ">

          <h2 style="
            margin-top: 0;
            color: #18181b;
            font-size: 24px;
          ">
            Welcome to ThumbCraft, ${name}! 🎉
          </h2>

          <p style="
            color: #52525b;
            font-size: 15px;
            line-height: 1.7;
          ">
            Thanks for creating your ThumbCraft account.
            We're excited to have you with us!
          </p>

          <p style="
            color: #52525b;
            font-size: 15px;
            line-height: 1.7;
          ">
            To complete your registration and start creating
            amazing AI-powered thumbnails, please verify your
            email address using the code below.
          </p>

          <div style="
            margin: 30px 0;
            padding: 24px;
            text-align: center;
            background: #f4f4f5;
            border-radius: 14px;
          ">
            <p style="
              margin: 0 0 10px;
              color: #71717a;
              font-size: 13px;
            ">
              YOUR VERIFICATION CODE
            </p>

            <span style="
              font-size: 34px;
              font-weight: 700;
              letter-spacing: 10px;
              color: #18181b;
            ">
              ${code}
            </span>
          </div>

          <p style="
            color: #52525b;
            font-size: 14px;
            line-height: 1.6;
          ">
            ⏱️ This verification code will expire in
            <strong>10 minutes</strong>.
          </p>

          <p style="
            color: #52525b;
            font-size: 14px;
            line-height: 1.6;
          ">
            🔒 If you didn't create a ThumbCraft account,
            you can safely ignore this email.
          </p>

          <p style="
            margin-top: 30px;
            color: #52525b;
            font-size: 14px;
            line-height: 1.7;
          ">
            Happy creating! 🚀
          </p>

          <p style="
            margin-bottom: 0;
            color: #18181b;
            font-size: 14px;
            line-height: 1.7;
          ">
            Warm regards,<br />
            <strong>The ThumbCraft Team 💖</strong>
          </p>

        </div>

        <p style="
          margin-top: 25px;
          text-align: center;
          color: #a1a1aa;
          font-size: 12px;
        ">
          © ${new Date().getFullYear()} ThumbCraft. All rights reserved.
        </p>

      </div>
    `,
  });
};

// =====================================================
// PASSWORD RESET
// =====================================================

export const sendPasswordResetEmail = async (
  email: string,
  code: string,
) => {
  await transporter.sendMail({
    from: `"ThumbCraft" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Reset your ThumbCraft password 🔐",
    html: `
      <div style="
        font-family: Arial, Helvetica, sans-serif;
        max-width: 600px;
        margin: 0 auto;
        padding: 40px 30px;
        background: #ffffff;
        color: #18181b;
      ">

        <div style="
          text-align: center;
          margin-bottom: 30px;
        ">
          <h1 style="
            margin: 0;
            font-size: 30px;
            color: #ec4899;
            font-weight: 700;
          ">
            ThumbCraft ✨
          </h1>

          <p style="
            margin: 8px 0 0;
            color: #71717a;
            font-size: 14px;
          ">
            AI-powered thumbnail creation made simple.
          </p>
        </div>

        <div style="
          border: 1px solid #f1f1f1;
          border-radius: 16px;
          padding: 30px;
          background: #fafafa;
        ">

          <h2 style="
            margin-top: 0;
            color: #18181b;
            font-size: 24px;
          ">
            Password Reset Request 🔐
          </h2>

          <p style="
            color: #52525b;
            font-size: 15px;
            line-height: 1.7;
          ">
            We received a request to reset your ThumbCraft
            account password.
          </p>

          <p style="
            color: #52525b;
            font-size: 15px;
            line-height: 1.7;
          ">
            Use the verification code below to continue
            resetting your password.
          </p>

          <div style="
            margin: 30px 0;
            padding: 24px;
            text-align: center;
            background: #f4f4f5;
            border-radius: 14px;
          ">
            <p style="
              margin: 0 0 10px;
              color: #71717a;
              font-size: 13px;
            ">
              PASSWORD RESET CODE
            </p>

            <span style="
              font-size: 34px;
              font-weight: 700;
              letter-spacing: 10px;
              color: #18181b;
            ">
              ${code}
            </span>
          </div>

          <p style="
            color: #52525b;
            font-size: 14px;
            line-height: 1.6;
          ">
            ⏱️ This reset code will expire in
            <strong>10 minutes</strong>.
          </p>

          <p style="
            color: #52525b;
            font-size: 14px;
            line-height: 1.6;
          ">
            🛡️ If you did not request a password reset,
            you can safely ignore this email. Your password
            will remain unchanged.
          </p>

          <p style="
            margin-top: 30px;
            color: #52525b;
            font-size: 14px;
            line-height: 1.7;
          ">
            Stay secure and keep creating! 🚀
          </p>

          <p style="
            margin-bottom: 0;
            color: #18181b;
            font-size: 14px;
            line-height: 1.7;
          ">
            Warm regards,<br />
            <strong>The ThumbCraft Team 💖</strong>
          </p>

        </div>

        <p style="
          margin-top: 25px;
          text-align: center;
          color: #a1a1aa;
          font-size: 12px;
        ">
          © ${new Date().getFullYear()} ThumbCraft. All rights reserved.
        </p>

      </div>
    `,
  });
};

// =====================================================
// CONTACT US
// =====================================================

export const sendContactEmail = async (
  name: string,
  email: string,
  topic: string,
  message: string,
) => {
  const escapeHtml = (value: string) =>
    value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeTopic = escapeHtml(topic);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  await transporter.sendMail({
    from: `"ThumbCraft Contact" <${process.env.EMAIL_USER}>`,
    to: "thumbcraftai10@gmail.com",
    replyTo: email,
    subject: `[ThumbCraft] ${topic} - ${name}`,

    html: `
      <div style="
        font-family: Arial, Helvetica, sans-serif;
        max-width: 650px;
        margin: 0 auto;
        padding: 40px 30px;
        background: #ffffff;
        color: #18181b;
      ">

        <div style="
          text-align: center;
          margin-bottom: 30px;
        ">
          <h1 style="
            margin: 0;
            font-size: 30px;
            color: #ec4899;
            font-weight: 700;
          ">
            ThumbCraft ✨
          </h1>

          <p style="
            margin: 8px 0 0;
            color: #71717a;
            font-size: 14px;
          ">
            New message from your Contact Us form
          </p>
        </div>

        <div style="
          border: 1px solid #f1f1f1;
          border-radius: 16px;
          overflow: hidden;
        ">

          <div style="
            background: #18181b;
            padding: 20px 24px;
          ">
            <h2 style="
              margin: 0;
              color: #ffffff;
              font-size: 20px;
            ">
              New Contact Message 📩
            </h2>
          </div>

          <div style="
            padding: 25px;
            background: #fafafa;
          ">

            <div style="
              background: #f4f4f5;
              border-radius: 12px;
              padding: 18px 20px;
              margin-bottom: 20px;
            ">

              <p style="
                margin: 8px 0;
                font-size: 14px;
                color: #52525b;
              ">
                <strong style="color: #18181b;">Name:</strong>
                ${safeName}
              </p>

              <p style="
                margin: 8px 0;
                font-size: 14px;
                color: #52525b;
              ">
                <strong style="color: #18181b;">Email:</strong>
                ${safeEmail}
              </p>

              <p style="
                margin: 8px 0;
                font-size: 14px;
                color: #52525b;
              ">
                <strong style="color: #18181b;">Topic:</strong>
                ${safeTopic}
              </p>

            </div>

            <div style="
              border: 1px solid #e4e4e7;
              border-radius: 12px;
              padding: 20px;
              background: #ffffff;
            ">

              <p style="
                margin-top: 0;
                margin-bottom: 12px;
                font-weight: 700;
                color: #18181b;
                font-size: 15px;
              ">
                Message 💬
              </p>

              <p style="
                margin: 0;
                line-height: 1.8;
                color: #52525b;
                font-size: 14px;
              ">
                ${safeMessage}
              </p>

            </div>

          </div>

        </div>

        <div style="
          margin-top: 25px;
          padding: 18px;
          border-radius: 12px;
          background: #fdf2f8;
          text-align: center;
        ">
          <p style="
            margin: 0;
            color: #9d174d;
            font-size: 13px;
            line-height: 1.6;
          ">
            💡 This message was submitted through the
            <strong>ThumbCraft Contact Us</strong> form.
          </p>
        </div>

        <p style="
          margin-top: 25px;
          text-align: center;
          color: #a1a1aa;
          font-size: 12px;
        ">
          © ${new Date().getFullYear()} ThumbCraft. All rights reserved.
        </p>

      </div>
    `,

    text: `
New Contact Message — ThumbCraft

Name: ${name}
Email: ${email}
Topic: ${topic}

Message:
${message}

--------------------------------
This message was submitted through the ThumbCraft Contact Us form.

© ${new Date().getFullYear()} ThumbCraft
    `,
  });
};