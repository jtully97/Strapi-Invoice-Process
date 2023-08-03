"use strict";

/**
 * client controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::client.client", ({ strapi }) => ({
  // action set up to fire by using route GET /api/gfk-integration -> check /routes for details
  async invoiceProcessAction(ctx) {
    try {
      await strapi.service("api::client.client").invoiceProcessService();

      ctx.body = "Invoice Process Complete!";
    } catch (err) {
      (ctx.body = err), "error";
    }
  },
}));
