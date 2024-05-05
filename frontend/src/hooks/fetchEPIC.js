import React, { useState, useEffect } from 'react';

const useFetchEPICImage =(year, month, day)=>{

    const [image,setImage] = useState([])

    useEffect(()=>{

        const fetchImages = async()=>{

            try{

                const response =await fetch(`https://epic.gsfc.nasa.gov/api/natural/date/${year}-${month}-${day}`)
                if(!response.ok){
                    throw new Error("Failed to fetch data")
                }

                const data =await response.json()
                const urls = data.map(item =>`https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/png/${item.image}.png`)
                setImage(urls)


            }catch(error){
            console.log('Error fetching images',error)
        }


        
    }

    fetchImages();


    },[year, month, day])


    return image


}

export default useFetchEPICImage