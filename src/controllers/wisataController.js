// src/controllers/WisataController.js
export async function getListWisata(req, res, db) {
  try {
    const snapshot = await db.collection("wisata").get();
    const data = snapshot.docs.map((doc) => {
      const { title, alamat, imageUtama } = doc.data();
      return { title, alamat, imageUtama };
    });
    res.send(data);
  } catch (error) {
    console.error("Error connecting to Firestore:", error);
    res.status(500).send("Error connecting to Firestore");
  }
}

export async function getWisataByID(req, res, db) {
  const { id } = req.params;

  try {
    const doc = await db.collection("wisata").doc(id).get();

    if (!doc.exists) {
      return res.status(404).send("Document not found");
    }

    const data = doc.data();

    const { imageUtama, galeri, ...filteredData } = data;

    res.send(filteredData);
  } catch (error) {
    console.error("Error connecting to Firestore:", error);
    res.status(500).send("Error connecting to Firestore");
  }
}

export async function getImageUtamaWisata(req, res, db) {
  const { id } = req.params;

  try {
    const doc = await db.collection("wisata").doc(id).get();

    if (!doc.exists) {
      return res.status(404).send("Document not found");
    }

    const data = doc.data();
    const imageUtama = data.imageUtama;

    res.send({ imageUtama });
  } catch (error) {
    console.error("Error connecting to Firestore:", error);
    res.status(500).send("Error connecting to Firestore");
  }
}

export async function getGaleriWisata(req, res, db) {
  const { id } = req.params;

  try {
    const doc = await db.collection("wisata").doc(id).get();

    if (!doc.exists) {
      return res.status(404).send("Document not found");
    }

    const data = doc.data();
    const galeri = data.galeri;

    res.send({ galeri });
  } catch (error) {
    console.error("Error connecting to Firestore:", error);
    res.status(500).send("Error connecting to Firestore");
  }
}
