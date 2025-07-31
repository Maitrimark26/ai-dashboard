import ReactMarkdown from "react-markdown";

export default function AISummary({ summary }) {
  if (!summary) return null;

  return (
    <div className="relative mt-12 rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-xl overflow-hidden transition-all duration-300">
      {/* Decorative Gradient Header Strip */}
      <div className="h-2 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

      <div className="p-8 sm:p-10 md:p-12">
        {/* Header */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-white flex items-center gap-3 mb-6">
          <span className="text-4xl">🧠</span> AI-Generated Insights
        </h2>

        {/* Content */}
        <div className="prose prose-indigo dark:prose-invert prose-lg max-w-none leading-relaxed text-gray-800 dark:text-gray-200">
          <ReactMarkdown>{summary}</ReactMarkdown>
        </div>
      </div>

      {/* Subtle Glow Ring (optional aesthetic effect) */}
      <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-indigo-500/10 pointer-events-none" />
    </div>
  );
}
