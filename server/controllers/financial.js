const path = require("path");
const fs = require("fs");

class FinancialController {
  submitFinancialInfo(req, res) {
    const data = req.body;

    if (!data) {
      return res.status(400).send("No data received or data is invalid");
    }

    const filePath = path.join(__dirname, "data.json");
    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
      if (err) {
        return res.status(500).send("Error saving data");
      }
      res.send("Data saved successfully");
    });
  }

  getFinancialInfo(req, res) {
    const filePath = path.join(__dirname, "data.json");
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        return res.status(500).json({ error: "Could not read file" });
      }
      try {
        const jsonData = JSON.parse(data);
        res.json(jsonData);
      } catch (parseError) {
        res.status(500).json({ error: "Could not parse JSON" });
      }
    });
  }
}

module.exports = new FinancialController();
