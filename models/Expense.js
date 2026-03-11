const { v4: uuidv4 } = require("uuid");

class Expense {
  constructor(data = {}) {
    this.expenseId = data.expenseId ?? uuidv4();

    this.tripId = data.tripId ?? null;

    this.type = data.type ?? null;
    this.amount = data.amount ?? 0;

    this.description = data.description ?? null;

    this.addedBy = data.addedBy ?? null;

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

module.exports = Expense;