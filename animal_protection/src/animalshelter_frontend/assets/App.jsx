import React, { useState, useEffect } from "react";
import { useCanister } from "@connect2ic/react";

const App = () => {
  const [animalProtection] = useCanister("animal_protection");
  const [animals, setAnimals] = useState([]);
  const [donations, setDonations] = useState([]);

  // Yeni hayvan eklemek için state
  const [newAnimal, setNewAnimal] = useState({
    name: "",
    species: "",
    location: "",
    healthStatus: "",
    imageUrl: "",
  });

  // Yeni bağış eklemek için state
  const [newDonation, setNewDonation] = useState({
    amount: 0,
    message: "",
  });

  // Hayvan ve bağış verilerini yükle
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [animalsData, donationsData] = await Promise.all([
        animalProtection.getAllAnimals(),
        animalProtection.getDonations(),
      ]);
      setAnimals(animalsData);
      setDonations(donationsData);
    } catch (err) {
      console.error("Veri yüklenirken hata:", err);
    }
  };

  const handleAddAnimal = async (e) => {
    e.preventDefault();
    try {
      await animalProtection.addAnimal(
        newAnimal.name,
        newAnimal.species,
        newAnimal.location,
        newAnimal.healthStatus,
        newAnimal.imageUrl || null
      );
      setNewAnimal({
        name: "",
        species: "",
        location: "",
        healthStatus: "",
        imageUrl: "",
      });
      loadData();
    } catch (err) {
      console.error("Hayvan eklenirken hata:", err);
    }
  };

  const handleMakeDonation = async (e) => {
    e.preventDefault();
    try {
      await animalProtection.makeDonation(
        Number(newDonation.amount),
        newDonation.message || null
      );
      setNewDonation({ amount: 0, message: "" });
      loadData();
    } catch (err) {
      console.error("Bağış yapılırken hata:", err);
    }
  };

  return (
    <div>
      <h1>Hayvan Koruma Sistemi</h1>

      {/* Yeni Hayvan Ekle */}
      <form onSubmit={handleAddAnimal}>
        <input
          type="text"
          placeholder="Hayvan Adı"
          value={newAnimal.name}
          onChange={(e) =>
            setNewAnimal({ ...newAnimal, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Tür"
          value={newAnimal.species}
          onChange={(e) =>
            setNewAnimal({ ...newAnimal, species: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Konum"
          value={newAnimal.location}
          onChange={(e) =>
            setNewAnimal({ ...newAnimal, location: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Sağlık Durumu"
          value={newAnimal.healthStatus}
          onChange={(e) =>
            setNewAnimal({ ...newAnimal, healthStatus: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Görsel URL"
          value={newAnimal.imageUrl}
          onChange={(e) =>
            setNewAnimal({ ...newAnimal, imageUrl: e.target.value })
          }
        />
        <button type="submit">Hayvan Ekle</button>
      </form>

      {/* Tüm Hayvanlar */}
      <h2>Tüm Hayvanlar</h2>
      {animals.map((animal) => (
        <div key={animal.id}>
          <p>{animal.name}</p>
          <p>{animal.species}</p>
          <p>{animal.location}</p>
          <p>{animal.healthStatus}</p>
        </div>
      ))}

      {/* Bağış Yap */}
      <form onSubmit={handleMakeDonation}>
        <input
          type="number"
          placeholder="Bağış Miktarı"
          value={newDonation.amount}
          onChange={(e) =>
            setNewDonation({ ...newDonation, amount: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Mesaj"
          value={newDonation.message}
          onChange={(e) =>
            setNewDonation({ ...newDonation, message: e.target.value })
          }
        />
        <button type="submit">Bağış Yap</button>
      </form>

      {/* Tüm Bağışlar */}
      <h2>Bağışlar</h2>
      {donations.map((donation, idx) => (
        <div key={idx}>
          <p>{donation.amount} ICP</p>
          <p>{donation.message}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
