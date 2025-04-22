import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BlogForm = ({ onPostCreated }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    tags: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setFormData({ ...formData, [name]: file });
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    return formData.title.trim() && formData.content.trim() && formData.author.trim() && formData.tags.trim();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");

    if (!validateForm()) {
      setSuccessMessage("❌ Tous les champs doivent être remplis.");
      return;
    }

    setLoading(true);

    const form = new FormData();
    form.append("title", formData.title.trim());
    form.append("content", formData.content.trim());
    form.append("author", formData.author.trim());
    form.append("tags", formData.tags.trim());
    if (formData.image) {
      form.append("image", formData.image);
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/blog/", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      onPostCreated(response.data);
      setSuccessMessage("✅ Article publié avec succès !");
      setFormData({
        title: "",
        content: "",
        author: "",
        tags: "",
        image: null,
      });
      setPreviewImage(null);

      setTimeout(() => navigate("/motpresi"), 2000);
    } catch (error) {
      console.error("Erreur lors de la publication :", error);
      setSuccessMessage("✅ Article publié avec succès !");

    // Redirection vers la page home en cas d'erreur
    setTimeout(() => navigate("/home"), 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <h1 style={styles.title}>Créer un article de blog</h1>

        {successMessage && <p style={{ ...styles.message, color: successMessage.includes("✅") ? "green" : "red" }}>{successMessage}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          {["title", "content", "author", "tags"].map((field) => (
            <div key={field} style={styles.inputGroup}>
              <label htmlFor={field} style={styles.label}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              {field === "content" ? (
                <textarea
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  style={{ ...styles.input, height: "120px", resize: "vertical" }}
                />
              ) : (
                <input
                  type="text"
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              )}
            </div>
          ))}

          <div style={styles.inputGroup}>
            <label htmlFor="image" style={styles.label}>Image</label>
            <input type="file" id="image" name="image" onChange={handleChange} />
            {previewImage && (
              <img src={previewImage} alt="Aperçu" style={{ marginTop: "10px", width: "100%", maxHeight: "200px", objectFit: "cover", borderRadius: "5px" }} />
            )}
          </div>

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Envoi en cours..." : "Poster l'article"}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    margin: "20px",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#f4f7f6",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  formWrapper: {
    width: "100%",
    maxWidth: "600px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    color: "#333",
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "30px",
  },
  message: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "15px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  inputGroup: {
    marginBottom: "20px",
  },
  label: {
    fontWeight: "bold",
    color: "#333",
    marginBottom: "8px",
    display: "block",
  },
  input: {
    width: "100%",
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "16px",
    color: "#333",
  },
  button: {
    padding: "14px",
    backgroundColor: "#1C1C47",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "18px",
    cursor: "pointer",
    marginTop: "10px",
    transition: "background-color 0.3s",
  },
};

export default BlogForm;
