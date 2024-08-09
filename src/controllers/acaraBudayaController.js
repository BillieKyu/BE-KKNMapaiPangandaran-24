// src/controllers/acaraBudayaController.js
export async function getAllAcaraBudayaData(req, res, db) {
  try {
    const snapshot = await db.collection("acarabudaya").get();
    const data = snapshot.docs.map((doc) => doc.data());
    res.send(data);
  } catch (error) {
    console.error("Error connecting to Firestore:", error);
    res.status(500).send("Error connecting to Firestore");
  }
}

export async function getListAcaraBudaya(req, res, db) {
  try {
    const snapshot = await db.collection("acarabudaya").get();
    const data = snapshot.docs.map((doc) => {
      const { title, imageUtama, tag } = doc.data();
      return { id: doc.id, title, imageUtama, tag };
    });
    res.send(data);
  } catch (error) {
    console.error("Error connecting to Firestore:", error);
    res.status(500).send("Error connecting to Firestore");
  }
}

export async function getAcaraBudayaByID(req, res, db) {
  const { id } = req.params;

  try {
    const doc = await db.collection("acarabudaya").doc(id).get();

    if (!doc.exists) {
      return res.status(404).send("Document not found");
    }

    const data = doc.data();

    const { galeri, ...filteredData } = data;

    res.send(filteredData);
  } catch (error) {
    console.error("Error connecting to Firestore:", error);
    res.status(500).send("Error connecting to Firestore");
  }
}

// export async function getGaleriWisata(req, res, db) {
//   const { id } = req.params;

//   try {
//     const doc = await db.collection("acarabudaya").doc(id).get();

//     if (!doc.exists) {
//       return res.status(404).send("Document not found");
//     }

//     const data = doc.data();
//     const galeri = data.galeri;

//     res.send({ galeri });
//   } catch (error) {
//     console.error("Error connecting to Firestore:", error);
//     res.status(500).send("Error connecting to Firestore");
//   }
// }
