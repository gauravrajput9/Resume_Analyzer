import crypto from "crypto";

export function generateResumeHash(text) {
  return crypto
    .createHash("sha256")
    .update(
      text
        .toLowerCase()
        .replace(/\s+/g, " ")
        .trim()
    )
    .digest("hex");
}
