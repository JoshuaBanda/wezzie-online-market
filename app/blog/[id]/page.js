"use client";// pages/products/[id].js
import { useRouter } from 'next/navigation'; // ✅ Fixed import
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowLeft, FaArrowRight, FaCartPlus, FaShoppingCart } from 'react-icons/fa';
import { use } from 'react';
import Spinner from '@/app/home/Spinning';
import { useUser } from '@/app/userContext';
import { toast } from 'react-toastify';
import styles from "../../Styles/ProductPage.module.css"
import AnimatedWord from '@/components/AnimatedWord';
import LikeButton from '@/app/like/LikeButton';
import ItemLikeButton from './itemLikeButton';
import Rating from '../Rating';
import { motion } from 'framer-motion';

const item = ({params}) => {



  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const {id}=use(params);
  const [quantity,setQuantity]=useState(1);
  

  const [likeCount, setLikeCount] = useState(0);


  const {person}=useUser();
  
  const [user,setUser]=useState(person);
  
  const [loadingtocart,setloadingtocart]=useState(false);
  console.log('...............',loadingtocart);

  useEffect(()=>{
    //console.log("updatting");
    setUser(person);
  //console.log('user',user,"person",person);

  },[person]);

  

  useEffect(() => {
    if (!id) return;
    //console.log("id:",id);
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://wonge-backend-k569.onrender.com/inventory/${id}`);
        setProduct(response.data);
        //console.log(response.data)
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product data", error);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart= async()=>{
    try{
      setloadingtocart(true);
      const res=await axios.post(`https://wonge-backend-k569.onrender.com/cart/add-to-cart`,
        {
          
      user_id:user.userid,
      inventory_id:id,
      quantity:quantity,
      status:"active"

        }
      );
      console.log("status",res.status);
      if (res.status==201){
        setloadingtocart(false);
        toast.success(
          
        `Successfully added ${product.name} to your cart. click here to view your item in cart`,
          {
            onClick: () => {
              router.push('/cart'); // Navigate to cart
            },
            closeOnClick: true, // Optional: don't auto-close on click
            draggable: true,
            autoClose: 10000,
          }
        );
      }
    } catch(error){
      
      setloadingtocart(false);
      toast.error(
        `${user.firstname}, you already have ${product.name} in your cart. Click to view cart.`,
        {
          onClick: () => {
            router.push('/cart'); // Navigate to cart
          },
          closeOnClick: true, // Optional: don't auto-close on click
          draggable: true,
          autoClose: 12000,
        }
      );
    
    //alert(` Dear ${user.firstname}, you already have ${product.name} added, to cart. For more information view your cart `);
      //console.error("error adding item to cart");
    }
  }
  const handleQuantityIncrement = () => {
  setQuantity(prevQuantity => {
    if (prevQuantity < product.quantity) {
      return prevQuantity + 1;
    }
    return prevQuantity; // Do not increment if limit reached
  });
};
const handleQuantityReduction = () => {
  setQuantity(prevQuantity => {
    if (prevQuantity > 1) {
      return prevQuantity - 1;
    }
    return prevQuantity; // Keep it at 1 if it's already at minimum
  });
};


  if (loading) return <div className={styles.loader}><Spinner/></div>;
  if (!product) return <div className={styles.error}>Product not found</div>;

  return (
    <div  className={styles.container}  >
      <div>
        
              <div className={styles.decoratedBackground} id='customizedbackground' />
        {/* Header*/}
        <section className={styles.header}>
            <span>
              <AnimatedWord/>
            </span>
                <motion.div
                  initial={{y:-200,opacity:0}}
                  animate={{y:0,opacity:1}}
                  transition={{type:'tween',duration:2,delay:0}}
                className={styles.prevButton}
                id="accessoryColorBackground"
                onClick={() => router.back()}
                style={{ cursor: "pointer" }}
              >
                <FaArrowLeft color="white" />
              </motion.div>
            <motion.div className={styles.cartButton} id='accessoryColorBackground' onClick={()=>{
              router.push('/cart')
            }}
        
              initial={{y:-200,opacity:0}}
              animate={{y:0,opacity:1}}
              transition={{type:'spring', stiffness:250,delay:1}}
            >
              <FaShoppingCart color='white'/>
            </motion.div>
            <motion.div className={styles.likeButton} id='accessoryColorBackground'
              
              initial={{y:-200,opacity:0}}
              animate={{y:0,opacity:1}}
              transition={{type:'spring', stiffness:250,delay:2}}
            >
              
             <ItemLikeButton postId={product.id} userId={product.user_id} initialLikeCount={likeCount} /*initialLikeStatus={isLiked}*/ />
            </motion.div>
        </section>
        <motion.div className={styles.productInfo}
              initial={{opacity:0}}
              animate={{opacity:1}}
              transition={{type:'spring', stiffness:250}}>
          <img
            className={styles.productImage}
            src={product.photo_url}
            alt={product.name}
            quality={100}
            width="200"
            height="200"
            sizes='(max-width:768px)100vw, (max-width:1200pxpx)50vw, 33vw'
          />

          <motion.div className={styles.productDetails} 
          
              initial={{x:100,opacity:0}}
              animate={{x:0,opacity:1}}
              transition={{type:'spring', stiffness:250,delay:1,duration:1}}
                id=""
                >
                
            <motion.h1 className={styles.productName}
              
              initial={{x:-100,opacity:0}}
              animate={{x:0,opacity:1}}
              transition={{type:'tween', stiffness:200,delay:2,duration:2}}
            >{product.name}</motion.h1>
            
             <motion.div className={styles.rating}
             
              initial={{x:200,opacity:0}}
              animate={{x:0,opacity:1}}
              transition={{type:'tween', stiffness:200,delay:5,duration:2}}>
                <Rating  initialLikeCount={0} postId={product.id} userId={product.user_id}/>
             </motion.div>
             <motion.div className={styles.productDescription}
              
              initial={{y:50,opacity:0}}
              animate={{y:0,opacity:1}}
              transition={{type:'tween', stiffness:150,delay:2.5,duration:2}}
             >
              <span>
                Description
              </span>
              <p >{product.description}</p>
             </motion.div>


            {/*Quantity */}
            
            <div className={styles.quantityIn} id='customizedbackground'>
              <div onClick={()=>handleQuantityReduction(item,index)}>
                <FaArrowLeft/>
              </div>
              <div>
                {quantity}
              </div>
              <div onClick={()=>handleQuantityIncrement()}>
                <FaArrowRight/>
              </div>
            </div>




            <button className={styles.addToCartBtn} onClick={addToCart} id='customizedbackground'>
              <div className={styles.productPrice}>
              ${product.price}
              </div>
              <div className={styles.addToCartBtnText} id='accessoryColor'>Add to Cart</div>
              <div className={styles.addToCartBtnIcon} id='customizedbackground'><FaCartPlus /></div>
            </button>
          </motion.div>
        </motion.div>
      </div>
      {loadingtocart&&
      <div style={{
        position:'fixed',
        width:'100%',height:'200px',borderRadius:'20px',
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
        
      }}>
        <div style={{
          background:'white',
          width:'200px',height:'100px',
          display:'flex',alignItems:'center',justifyContent:'center',
          borderRadius:'20px',
          boxShadow:'-2px 2px 10px 10px rgba(0,0,0,0.2)'
        }}>
          adding {product.name} to cart ....
        </div>
      </div>
      }
    </div>
    
  );
};

export default item;
