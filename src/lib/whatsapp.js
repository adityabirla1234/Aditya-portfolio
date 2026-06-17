import { siteConfig } from "./config";

/**
 * Opens a WhatsApp DM with a pre-filled message.
 * @param {string} [customMessage] - Override the default message.
 */
export function openWhatsApp(customMessage) {
  const number  = siteConfig.author.whatsapp;
  const message = encodeURIComponent(customMessage ?? siteConfig.author.whatsappMessage);
  const url     = `https://wa.me/${number}?text=${message}`;
  window.open(url, "_blank", "noopener,noreferrer");
}
