import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const BlogForm = ({ onPostCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    tags: '',
    image: null,
  });
  
  const [loading, setLoading] = useState(false);  // État pour gérer le chargement
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Début du chargement

    const form = new FormData();
    form.append('title', formData.title);
    form.append('content', formData.content);
    form.append('author', formData.author);
    form.append('tags', formData.tags);
    form.append('image', formData.image);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/blog/', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(form)

      console.log('Blog post created:', response.data);
      onPostCreated(response.data);
      setFormData({
        title: '',
        content: '',
        author: '',
        tags: '',
        image: null,
      });

      // Après la création, redirection vers la page /home
      navigate('/home');
    } catch (error) {
      console.error('There was an error posting the blog:', error);
    } finally {
      setLoading(false);  // Fin du chargement
    }
  };

  return (
    <div style={{ margin: '20px', display: 'flex', justifyContent: 'center', backgroundColor: '#f4f7f6', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      <div style={{ width: '100%', maxWidth: '600px', backgroundColor: '#ffffff', borderRadius: '10px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <h1 style={{ textAlign: 'center', color: '#333', fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', marginTop: '0', padding: '50px 0' }}>
          Créer un article de blog
        </h1>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="title" style={{ fontWeight: 'bold', color: '#333' }}>Titre</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                marginTop: '8px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '16px',
                color: '#333',
              }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="content" style={{ fontWeight: 'bold', color: '#333' }}>Contenu</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                marginTop: '8px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '16px',
                color: '#333',
                height: '150px',
                resize: 'vertical',
              }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="author" style={{ fontWeight: 'bold', color: '#333' }}>Auteur</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                marginTop: '8px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '16px',
                color: '#333',
              }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="tags" style={{ fontWeight: 'bold', color: '#333' }}>Tags</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                marginTop: '8px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '16px',
                color: '#333',
              }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="image" style={{ fontWeight: 'bold', color: '#333' }}>Image</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleChange}
              style={{ marginTop: '8px' }}
            />
          </div>
          <button 
            type="submit" 
            style={{
              padding: '14px',
              backgroundColor: '#1C1C47',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontSize: '18px',
              cursor: 'pointer',
              marginTop: '10px',
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#45a049'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#4CAF50'}
            disabled={loading} // Désactive le bouton si en chargement
          >
            {loading ? 'Envoi en cours...' : 'Poster l\'article'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;

