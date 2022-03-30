import nodemailer from "nodemailer";

export const registrationEmail = async (data) => {
  const { email, name, token } = data;

  const transport = nodemailer.createTransport({
    host: `${process.env.NODEMAILER_HOST}`,
    port: process.env.NODEMAILER_PORT,
    auth: {
      user: `${process.env.NODEMAILER_USER}`,
      pass: `${process.env.NODEMAILER_PASS}`,
    },
  });

  const info = await transport.sendMail({
    from: '"UpTask - Project Manager" <test_admin@uptask.com>',
    to: email,
    subject: "UpTask - Confirm your account",
    text: "Confirm yout account at UpTask",
    html: `
        <p>Hi ${name}!</p>
        <p>Your account is almost ready, you just have to confirm it with the following link:</p>
        <a href="${process.env.FRONTEND_URL}/confirm/${token}">Confirm Account</a>
        <br>
        <p>If you didn't create this account, you can ignore this email.</p>
      `,
  });
};
