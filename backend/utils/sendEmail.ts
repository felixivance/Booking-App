import nodemailer from 'nodemailer';

interface EmailOptions {
    email: string;
    subject: string;
    message: string;
}

export default async (options: EmailOptions) =>{
    var transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD
        }
      });
}