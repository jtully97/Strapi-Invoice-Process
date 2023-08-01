"use strict";
/**
 * client service
 */
const { createCoreService } = require("@strapi/strapi").factories;
const {
  getDateValues,
  lineBreakSwap,
} = require("../../../../utilities/utility-functions");
const nodemailer = require("nodemailer");

module.exports = createCoreService("api::client.client", ({ strapi }) => ({
  async invoiceProcessService() {
    // Get client Ids to be used in gathering client invoice data below
    const clientIds = await strapi.entityService.findMany(
      "api::client.client",
      {
        fields: ["id"],
      }
    );

    // Access settings fields and use for from email
    const settings = await strapi.entityService.findOne(
      "api::setting.setting",
      1,
      {
        fields: [
          "emailPassword",
          "emailHost",
          "emailPort",
          "secure",
          "emailUser",
          "testPassword",
        ],
      }
    );

    // Date values for email content

    // Grab all client data, format and send emails
    async function sendEmails(clientIdsArr) {
      for (let i = 0; i < clientIdsArr.length; i++) {
        // Find client using client id
        const client = await strapi.entityService.findOne(
          "api::client.client",
          clientIdsArr[i].id,
          {
            fields: ["recipient", "invoice"],
          }
        );

        // Start of node mailer
        let transporter = nodemailer.createTransport({
          host: `${settings.emailHost}`,
          port: `${settings.emailPort}`,
          secure: `${settings.secure}`,
          auth: {
            user: `${settings.emailUser}`,
            pass: `${settings.emailPassword}`,
          },
        });

        console.log(client.invoice, " invoice");
        console.log(lineBreakSwap(client.invoice), " invoice swapped");

        let message = {
          from: `${settings.emailUser}`,
          to: `${client.recipient}`,
          subject: `Invoice for ${getDateValues(true, true)}`,
          text: `${client.invoice}`,
          html: `${lineBreakSwap(client.invoice)}`,
        };

        transporter.sendMail(message, (error, info) => {
          if (error) {
            console.log("Error occurred:", error);
          } else {
            console.log("Email sent:", info.response);
          }
        });
        // End of node mailer
      }
    }

    sendEmails(clientIds);
  },
}));
