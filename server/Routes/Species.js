const express = require("express");
const axios = require("axios");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


async function getSpeciesDetails(scientificName) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-002" });

    const commonNamePrompt = `What is the common name of the species "${scientificName}"? Respond with only the common name or say "Unknown".`;
    const commonNameResult = await model.generateContent(commonNamePrompt);
    const commonName =
      commonNameResult.response.candidates?.[0]?.content?.parts?.[0]?.text?.trim();


    const descriptionPrompt = `Provide a detailed description of the species "${scientificName}", including its habitat, behavior, and any notable characteristics.`;
    const descriptionResult = await model.generateContent(descriptionPrompt);
    const description =
      descriptionResult.response.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    return {
      commonName: commonName === "Unknown" ? null : commonName,
      description: description || "Description not found.",
    };
  } catch (err) {
    console.error("Gemini error:", err.message);
    return null;
  }
}

router.get("/random", async (req, res) => {
  try {
    const gbifUrl =
      "https://api.gbif.org/v1/species/search?rank=species&kingdom=Animalia&class=Mammalia,Aves&limit=1000&offset=0";
    const gbifRes = await axios.get(gbifUrl);
    const results = gbifRes.data.results;

    if (!results.length)
      return res.status(404).json({ error: "No species found" });

    const random = results[Math.floor(Math.random() * results.length)];
    const scientificName = random.scientificName;


    const speciesDetails = await getSpeciesDetails(scientificName);

    console.log("Selected species:", scientificName);
    console.log("Common name from Gemini:", speciesDetails.commonName);
    console.log("Species description from Gemini:", speciesDetails.description);


    const wikiQuery = (speciesDetails.commonName || scientificName).replace(
      / /g,
      "_"
    );
    const wikiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${wikiQuery}`;
    try {
      const wikiRes = await axios.get(wikiUrl);
      const wikiData = wikiRes.data;

      return res.json({
        name: speciesDetails.commonName || random.canonicalName || "Unknown",
        description:
          speciesDetails.description ||
          wikiData.extract ||
          "No description available.",
        image: wikiData.thumbnail?.source || null,
        source: `https://en.wikipedia.org/wiki/${wikiQuery}`,
      });
    } catch (wikiErr) {
      console.error("Error fetching Wikipedia data:", wikiErr.message);
      return res.json({
        name: speciesDetails.commonName || random.canonicalName || "Unknown",
        description: speciesDetails.description || "Description not found.",
        image: null,
      });
    }
  } catch (err) {
    console.error("Error fetching species:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
