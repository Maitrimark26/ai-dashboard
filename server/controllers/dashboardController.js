exports.getKPIs = async (req, res) => {
  try {
    // Dummy static KPIs for now
    const sampleKPIs = {
      totalRecords: 125,
      averageValue: 76.2,
      maxValue: 98,
      minValue: 45
    };

    res.status(200).json(sampleKPIs);
  } catch (err) {
    res.status(500).json({ msg: "Error getting KPIs", error: err.message });
  }
};
