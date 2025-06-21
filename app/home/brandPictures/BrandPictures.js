const BrandPictures = () => {
    const items=[{
        name:'totebag',
        pictUrl:'/handbag.png',
    },{
        name:'shirt',
        pictUrl:'/Shirt.png'
    },{
        name:'dress',
        pictUrl:'/dress.png'
    }];
    const itemsDisplay=items.map((item,index)=>{
        <li key={index}>
            
            <Image
                src={item.pictUrl}
                alt={item.name}
                quality={100}
                width="40"
                height="40"
                sizes='(max-width:768px)100vw, (max-width:1200pxpx)50vw, 33vw'
                priority
            />
        </li>
    });
    return (    
        <div>
            <div>
                {itemsDisplay}
            </div>
        </div>
    );
}
 
export default BrandPictures;