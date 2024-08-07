// src/controllers/wisataPost.js
export async function createWisata(req, res, db) {
  const {
    title,
    deskripsi,
    dayaTarik = [],
    fasilitas = [],
    jamBuka = "Setiap hari - 24 jam",
    hargaTiket = "Gratis",
    linkMaps = "",
    imageUtama = "",
    galeri = [],
    alamat,
    tag = "",
  } = req.body;

  // Basic validation for required fields
  if (!title || !deskripsi || !alamat) {
    return res
      .status(400)
      .json({ error: "Title, deskripsi, and alamat are required fields." });
  }

  try {
    const newDoc = {
      title,
      deskripsi,
      dayaTarik,
      fasilitas,
      jamBuka,
      hargaTiket,
      linkMaps,
      // imageUtama,
      // galeri,
      alamat,
      tag,
    };

    // Add document to Firestore
    const docRef = await db.collection("wisata").add(newDoc);

    // Respond with success message and document ID
    res
      .status(201)
      .json({ id: docRef.id, message: "Document successfully created." });
  } catch (error) {
    console.error("Error writing to Firestore:", error);
    res.status(500).json({ error: "Error writing to Firestore" });
  }
}
