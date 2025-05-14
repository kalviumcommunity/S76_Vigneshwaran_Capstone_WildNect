import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import axios from "axios";

export default function SpeciesForm() {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    commonName: "",
    location: "",
    date: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    gsap.fromTo(formRef.current, {opacity: 0, y: -100}, {
      y: 100,
    //   opacity: 0,
    //   y: 200,
      opacity: 1,
      duration: 1.5,
      ease: "power3.out",
    });
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));

    try {
      const res = await axios.post("http://localhost:5000/species", data);
      alert("Species submitted successfully!");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert("Error submitting species.");
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg space-y-6"
    >
      <h2 className="text-2xl font-bold text-center">Discover New Species</h2>

      <input
        type="text"
        name="commonName"
        placeholder="Common Name"
        required
        onChange={handleChange}
        className="w-full p-3 border rounded-lg"
      />

      <input
        type="text"
        name="location"
        placeholder="Location"
        required
        onChange={handleChange}
        className="w-full p-3 border rounded-lg"
      />

      <input
        type="date"
        name="date"
        required
        onChange={handleChange}
        className="w-full p-3 border rounded-lg"
      />

      <textarea
        name="description"
        placeholder="Description / Documentation"
        required
        rows={4}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg"
      ></textarea>

      <input
        type="file"
        name="image"
        accept="image/*"
        required
        onChange={handleChange}
        className="w-full p-3 border rounded-lg"
      />

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
      >
        Submit Species
      </button>
    </form>
  );
}
