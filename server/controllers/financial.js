const path = require("path");
const fs = require("fs");

class FinancialController {
  constructor() {
    this.filePath = path.join(__dirname, "data.json");
  }
  submitFinancialInfo(req, res) {
    const data = req.body;

    if (!data) {
      return res.status(400).send("No data received or data is invalid");
    }

    fs.writeFile(this.filePath, JSON.stringify(data, null, 2), (err) => {
      if (err) {
        return res.status(500).send("Error saving data");
      }
      res.status(400).send("Data saved successfully");
    });
  }

  getFinancialInfo(req, res) {
    fs.readFile(this.filePath, "utf8", (err, data) => {
      if (err) {
        return res.status(500).json({ error: "Could not read file" });
      }
      try {
        const jsonData = JSON.parse(data);
        res.json(jsonData);
      } catch (err) {
        res.status(500).json({ error: "Could not parse JSON" });
      }
    });
  }
}

module.exports = FinancialController;

module.exports = new FinancialController();
