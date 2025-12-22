// test-pdf.js
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

console.log("--- INSPECTION START ---");

try {
    const pdfLib = require('pdf-parse');
    console.log("1. Type of library:", typeof pdfLib);
    console.log("2. Keys inside library:", Object.keys(pdfLib));
    
    if (pdfLib.default) {
        console.log("3. Type of .default:", typeof pdfLib.default);
    } else {
        console.log("3. No .default property found");
    }

} catch (error) {
    console.error("Error loading library:", error.message);
}

console.log("--- INSPECTION END ---");