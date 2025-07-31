
// // ExportButton.jsx
// import domtoimage from "dom-to-image";
// import { saveAs } from "file-saver";

// export default function ExportButton() {
//   const handleDownload = () => {
//     const node = document.getElementById("dashboard-content");

//     // Cache original display values
//     const uploadBtn = document.getElementById("upload-button");
//     const exportBtn = document.getElementById("export-button");

//     const originalUploadDisplay = uploadBtn?.style.display;
//     const originalExportDisplay = exportBtn?.style.display;

//     // Hide both buttons before export
//     if (uploadBtn) uploadBtn.style.display = "none";
//     if (exportBtn) exportBtn.style.display = "none";

//     // Fix `oklch()` browser issue (optional)
//     document.querySelectorAll("*").forEach((el) => {
//       const styles = getComputedStyle(el);
//       if (styles.color.includes("oklch")) el.style.color = "#000";
//       if (styles.backgroundColor.includes("oklch")) el.style.backgroundColor = "#fff";
//     });

//     domtoimage
//       .toBlob(node)
//       .then((blob) => saveAs(blob, "dashboard.png"))
//       .catch((err) => console.error("❌ Export failed:", err))
//       .finally(() => {
//         // Restore buttons after export
//         if (uploadBtn) uploadBtn.style.display = originalUploadDisplay || "inline-block";
//         if (exportBtn) exportBtn.style.display = originalExportDisplay || "inline-block";
//       });
//   };

//   return (
//     <button
//       id="export-button"
//       onClick={handleDownload}
//       className="bg-red-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow"
//     >
//       📄 Export Dashboard
//     </button>
//   );
// }
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";

export default function ExportButton() {
  const handleDownload = () => {
    const original = document.getElementById("dashboard-content");

    if (!original) {
      console.error("❌ Dashboard content not found");
      return;
    }

    // ✅ Clone the node safely
    const clone = original.cloneNode(true);

    // ✅ Remove Upload & Export Buttons from clone
    const cloneUploadBtn = clone.querySelector("#upload-button");
    const cloneExportBtn = clone.querySelector("#export-button");

    if (cloneUploadBtn) cloneUploadBtn.remove();
    if (cloneExportBtn) cloneExportBtn.remove();

    // ✅ Fix emojis / oklch if needed
    clone.querySelectorAll("*").forEach((el) => {
      const styles = getComputedStyle(el);
      if (styles.color.includes("oklch")) el.style.color = "#000";
      if (styles.backgroundColor.includes("oklch")) el.style.backgroundColor = "#fff";
    });

    // ✅ Wrap clone in a div to render off-screen (invisible)
    const wrapper = document.createElement("div");
    wrapper.style.position = "fixed";
    wrapper.style.top = "-10000px"; // move off-screen
    wrapper.style.left = "-10000px";
    wrapper.appendChild(clone);
    document.body.appendChild(wrapper);

    // ✅ Convert and save as image
    domtoimage.toBlob(clone)
      .then((blob) => saveAs(blob, "dashboard.png"))
      .catch((err) => console.error("❌ Export failed:", err))
      .finally(() => {
        document.body.removeChild(wrapper); // cleanup
      });
  };

  return (
    <button
      id="export-button"
      onClick={handleDownload}
      className="bg-red-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow"
    >
      📄 Export Dashboard
    </button>
  );
}

