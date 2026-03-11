const { v4: uuidv4 } = require("uuid");

class User {
  constructor(data = {}) {
    this.userId = data.userId ?? uuidv4();

    this.name = data.name ?? null;
    this.email = data.email ?? null;
    this.phone = data.phone ?? null;

    this.passwordHash = data.passwordHash ?? null;
    this.role = data.role ?? "USER";

    this.createdAt = data.createdAt ?? Date.now();
  }

  toItem() {
    const item = {};

    for (const key in this) {
      const value = this[key];

      if (
        value !== null &&
        value !== undefined &&
        !(typeof value === "string" && value.trim() === "")
      ) {
        item[key] = value;
      }
    }

    return item;
  }
}

module.exports = User;