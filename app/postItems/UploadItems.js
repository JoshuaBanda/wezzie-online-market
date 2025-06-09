"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../userContext';
import styles from "./styles/form.module.css";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const UploadItems = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [items, setItems] = useState([]);
  const [typeOfProduct, setTypeOfProduct] = useState('');
  const [price, setPrice] = useState('');
  const [whatsappMessage, setWhatsappMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [quantity,setQuantity]=useState('');


  const route=useRouter();
  const {person}=useUser();
    
  const [user,setUser]=useState(person)      
  useEffect(()=>{
    //console.log("updatting");
    setUser(person);
  //  console.log('user',user,"person",person);
  },[person]);
  const handleFileChange = (event) => {


    
    const selectedFile = event.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']; // Add allowed file types

    if (selectedFile && !allowedTypes.includes(selectedFile.type)) {
      setSubmitError('Please upload a valid image file (JPG, PNG, GIF).');
    } else {
      setFile(selectedFile);
      setSubmitError(null); // Reset error message if file is valid
    }
  };

  const handleTypeChange = (event) => setTypeOfProduct(event.target.value);
  const handlePriceChange = (event) => {
    const value = event.target.value;
    if (/^\d*\.?\d*$/.test(value)) setPrice(value);
  };
  const handleQuantityChange = (event) => {
    const value = event.target.value;
    if (/^\d*\.?\d*$/.test(value)) setQuantity(value);
  };
  const handleWhatsappMessageChange = (event) => setWhatsappMessage(event.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) return setSubmitError('Please enter the name of the product.');
    if (!description) return setSubmitError('Please enter a description.');
    if (!file) return setSubmitError('Please upload a photo.');
    if (!price) return setSubmitError('Please enter a valid price.');

    setUploading(true);
    setSubmitError(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('type', typeOfProduct);
    formData.append('quantity',quantity);
    formData.append('price', price);
    formData.append('whatsappmessage', whatsappMessage);
    formData.append('user_id', user.userid); // Assuming user ID is static for now
    try {
      const response = await axios.post('https://wonge-backend-k569.onrender.com/inventory/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
            if (response.status==201){
              
              resetForm();
              toast.success(
                
              `Successfuly added ${typeOfProduct} to maket.`,
                {
                  onClick: () => {
                    route.push(`/products/${typeOfProduct}`)
                  },
                  closeOnClick: true, // Optional: don't auto-close on click
                  draggable: true,
                  autoClose: 10000,
                }
              );
            }else{
              toast.error(
                
              `Failed to add ${typeOfProduct} to maket.`,
                {
                  closeOnClick: true, // Optional: don't auto-close on click
                  draggable: true,
                  autoClose: 10000,
                }
              );
            }
    } catch (error) {
      setSubmitError(error.message);
      console.error('Error:', error);
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setFile(null);
    setTypeOfProduct('');
    setPrice('');
    setWhatsappMessage('');
    setQuantity('')
  };

  useEffect(() => {
  }, []
);

  if (loading) {
    return <p>Loading items...</p>;
  }

  return (
    <div className={styles.container}>
        <h2 >Upload New Item</h2>
        <div style={{color:'#777'}}>
          NB: The picture should be uploaded without background in png format to mantain the beauty of the website
        </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formContainer}>
          
          <div className={styles.name}>
            <label htmlFor="name" >Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              
              placeholder='Enter name of Product'
            />
          </div>
          <div className={styles.price}>
            <label htmlFor="price" >Price:</label>
            <input
              type="text"
              id="price"
              value={price}
              onChange={handlePriceChange}
              placeholder="Enter price"
            />
          </div>
          <div className={styles.description} >
            <label htmlFor="description" >Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              
              placeholder='Enter Description of the Product'
            />
          </div>
          
          <div className={styles.quantity}>
            <label htmlFor="Quantity" >Quantity:</label>
            <input
              type="text"
              id="Quantity"
              value={quantity}
              onChange={handleQuantityChange}
              placeholder="Enter Quantity"
            
            />
          </div>

          <div className={styles.type}>
            <label htmlFor="type">Type:</label>
            <select
              id="type"
              value={typeOfProduct}
              onChange={handleTypeChange}
            >
              <option value="ToteBags">Tote bag</option>
              <option value="Dresses">Dresses</option>
              <option value="Skirts">Skirts</option>
              <option value="Shirts">Shirts</option>
              <option value="Shirts">Bracelets</option>
            </select>
            </div>



          <div className={styles.whatsappMessage}>
            <label htmlFor="whatsappMessage" >Whatsapp Message:</label>
            <input
              type="text"
              id="whatsappMessage"
              value={whatsappMessage}
              onChange={handleWhatsappMessageChange}
              placeholder="Enter Whatsapp message"
            />
          </div>
          
          <div >
            <label htmlFor="photo" >Choose Photo:</label>
            <input type="file" id="photo" onChange={handleFileChange} />
            {file && (
              <div>
                <h4>Preview:</h4>
                <img src={URL.createObjectURL(file)} alt="Preview" style={{ width: '200px', height: 'auto' }} />
              </div>
            )}
          </div>
        </div>
            <div style={{position:'relative',display:'flex',justifyContent:'center',alignItems:'center',width:'100%',
            }}>
            {uploading && <p style={{color:'green'}}>Uploading...</p>}
            {submitError && <p style={{color:'red'}}>Error: {submitError}</p>}
            </div>
        <button type="submit" disabled={uploading} id='customizedbackground' className={styles.button}>
          {uploading ? 'Submitting...' : 'Submit'}
        </button>
      </form>

    </div>
  );
};

const errorStyle = {
  color: 'red',
};

export default UploadItems;
