// src/controllers/acaraBudayaPost.js
export async function createAcaraBudaya(req, res, db) {
  const {
    title,
    deskripsi,
    //   imageUtama = "",
    //   galeri = [],
    tag = "",
  } = req.body;

  // Basic validation for required fields
  if (!title || !deskripsi) {
    return res
      .status(400)
      .json({ error: "Title, deskripsi, and alamat are required fields." });
  }

  try {
    const newDoc = {
      title,
      deskripsi,
      linkMaps,
      // imageUtama,
      // galeri,
      tag,
    };

    // Add document to Firestore
    const docRef = await db.collection("acarabudaya").add(newDoc);

    // Respond with success message and document ID
    res
      .status(201)
      .json({ id: docRef.id, message: "Document successfully created." });
  } catch (error) {
    console.error("Error writing to Firestore:", error);
    res.status(500).json({ error: "Error writing to Firestore" });
  }
}
