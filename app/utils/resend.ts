import { Resend } from "resend";

const sendMial = new Resend(process.env.API_SECRET_RESEND_KEY);

export default sendMial
