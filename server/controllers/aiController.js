
const { Groq } = require("groq-sdk"); // ✅ correct import

const groq = new Groq({
  apiKey: process.env.OPENAI_API_KEY, // or GROQ_API_KEY
});

exports.getAISummary = async (req, res) => {
  try {
    const { rows, kpis } = req.body;

    if (!rows || !rows.length) {
      return res.status(400).json({ msg: "No data to summarize" });
    }

    const firstFew = rows.slice(0, 5);
    const columns = Object.keys(firstFew[0]);

    const prompt = `
You are a data analyst AI. Analyze the following data and generate a short summary of trends, averages, and insights.

Columns: ${columns.join(", ")}

Sample Rows:
${firstFew.map(row => JSON.stringify(row)).join("\n")}

KPIs:
${JSON.stringify(kpis)}

Respond in 4-5 bullet points in simple English.
`;

    const response = await groq.chat.completions.create({
      model: "llama3-8b-8192", // ya llama3-70b-8192 for more advanced
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const summary = response.choices[0].message.content;
    res.status(200).json({ summary });
  } catch (err) {
    console.error("🔥 AI error:", err);
    res.status(500).json({
      msg: "AI summary failed",
      error: err.message || "Unknown error",
    });
  }
};

