import Notification from "../models/Notification.js";

/**
 * Send a notification to one or multiple users.
 * 
 * @param {Array|string} userIds - A single user ID or an array of user IDs (laborers or clients).
 * @param {string} message - The message content of the notification.
 * @param {string} [type="info"] - Notification type (info, success, warning, error).
 * @param {object} [meta={}] - Additional metadata for the notification.
 * @returns {Promise<boolean>} - Returns true if notifications sent, false otherwise.
 */
export const sendNotification = async (userIds, message, type = "info", meta = {}) => {
  if (!userIds || !message) {
    console.error("❌ userIds and message are required for notifications.");
    return false;
  }

  try {
    // Normalize to an array and filter out falsy values
    const ids = (Array.isArray(userIds) ? userIds : [userIds]).filter(Boolean);

    if (ids.length === 0) {
      console.warn("⚠️ No valid user IDs provided for notification.");
      return false;
    }

    const notifications = ids.map((userId) => ({
      user: userId,
      message: message.trim(),
      type,
      meta,
    }));

    await Notification.insertMany(notifications);
    console.log(`✅ Notification(s) sent to ${ids.length} user(s).`);
    return true;
  } catch (error) {
    console.error("❌ Error sending notification:", error);
    return false;
  }
};
