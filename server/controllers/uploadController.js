const parseCSV = require("../utils/csvParser");
const fs = require("fs");

exports.uploadCSV = async (req, res) => {
  try {
    const filePath = req.file.path;
    const rows = await parseCSV(filePath);
    fs.unlinkSync(filePath);

    if (!rows.length) return res.status(400).json({ msg: "Empty CSV" });

    const allKeys = Object.keys(rows[0]);
    const numericKeys = allKeys.filter(key =>
      !isNaN(parseFloat(rows[0][key]))
    );

    const kpis = {
      totalRecords: rows.length,
      columns: {}
    };

    numericKeys.forEach(key => {
      const values = rows.map(row => parseFloat(row[key])).filter(v => !isNaN(v));

      kpis.columns[key] = {
        average: (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2),
        max: Math.max(...values),
        min: Math.min(...values)
      };
    });

    res.status(200).json({ rows, kpis }); // ✅ final correct structure
  } catch (err) {
    res.status(500).json({ msg: "Error parsing file", error: err.message });
  }
};
