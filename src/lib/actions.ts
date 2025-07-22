'use server';

import { Resend } from 'resend';

export async function sendEmail(input: {
  name: string;
  email: string;
  message: string;
}) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const toEmail = 'parth9512158@gmail.com';
  const fromEmail = 'onboarding@resend.dev';

  try {
    const { error } = await resend.emails.send({
      from: `Portfolio Contact <${fromEmail}>`,
      to: [toEmail],
      subject: `New message from ${input.name}`,
      html: `
        <p>You have received a new message from your portfolio contact form.</p>
        <p><strong>Name:</strong> ${input.name}</p>
        <p><strong>Email:</strong> ${input.email}</p>
        <p><strong>Message:</strong></p>
        <p>${input.message}</p>
      `,
    });

    if (error) {
      console.error(error);
      return { success: false, message: 'Failed to send email.' };
    }

    return { success: true, message: 'Email sent successfully!' };
  } catch (err) {
    console.error(err);
    return { success: false, message: 'An unexpected error occurred.' };
  }
}
