import nodemailer from 'nodemailer'

type SendEmailArgs = {
  to: string
  from?: string
  subject: string
  html?: string
  text?: string
}

let transporter: nodemailer.Transporter | null = null

const getTransporter = () => {
  if (transporter) return transporter
  const host = process.env.SMTP_HOST
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!host || !port || !user || !pass) {
    throw new Error('SMTP configuration is missing (SMTP_HOST/SMTP_PORT/SMTP_USER/SMTP_PASS).')
  }

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  })

  return transporter
}

export const sendEmail = async ({ to, from, subject, html, text }: SendEmailArgs) => {
  if (!to) return
  const sender = from || process.env.EMAIL_FROM || 'no-reply@marketeconomy.org'
  const mailer = getTransporter()
  await mailer.sendMail({
    to,
    from: sender,
    subject,
    html,
    text,
  })
}
