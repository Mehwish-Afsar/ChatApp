const { resendClient, sender } = require("../lib/resend.js");
const emailTemplate = require("./emailTemplates");

const sendWelcomeEmail = async (email, name, clientURL) => {
  const { data, error } = await resendClient.emails.send({
    from: `${sender.name} <${sender.email}>`,
    to: email,
    subject: "Welcome to Vibely App!",
    html: emailTemplate({
      name,
      clientURL,
    }),
  });

  if (error) {
    console.error(error);
    throw new Error("Failed to Send Welcome Email");
  }

  console.log("Welcome Email Sent Successfully", data);
};

module.exports = {
  sendWelcomeEmail,
};