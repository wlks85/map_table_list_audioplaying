import { useEffect, useState } from "react";
import { CategoriesServices } from "../services/CategoriesServices";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { useNavigate } from "react-router-dom";


interface categories {
    category: string;
    subcategory: string;
    pagetitle: string;
    pagenumber: number;
}



const SubCategoriesList: React.FC = ({ selectedCategory }) => {
    const [categories, setCategories] = useState<categories[]>([]);
    const [subcategory, setSubcategory] = useState<categories[]>([]);
    // console.log(selectedCategory)

    useEffect(() => {
        CategoriesServices.getSubCategories()
            .then((data) => {
                // console.log("works", data);
                setCategories(data);
            })
            .catch(() => alert("Error fetching"));
    }, []);


    const navigate = useNavigate();

    // Function to filter data by category
    const filterByCategory = (category: string): categories[] => {
        return categories.filter(item => item.category === category);
    };


    const selectedData = filterByCategory(selectedCategory);

    // console.log(subcategory)
    const uniqueData = Array.from(new Map(selectedData.map(item => [item.subcategory, item])).values())
    // console.log(uniqueData)
    const uniquePageTitle = selectedData?.filter(item => item.subcategory === subcategory);

    // console.log(uniquePageTitle)

    return (
        <div className="my-2 mx-1">

            <div>
                <Swiper
                    slidesPerView={3}
                    spaceBetween={10}
                    className="mySwiper"
                >
                    {
                        uniqueData?.map((button, index) => (
                            <SwiperSlide key={index}>
                                <div className="text-center bg-gray-600 text-white font-bold py-2 px-4 rounded-xl" onClick={() => { setSubcategory(button.subcategory) }} >
                                    {button.subcategory}
                                </div>
                            </SwiperSlide>
                        ))
                    }

                </Swiper>
            </div>

            {
                uniquePageTitle?.map((pageTitle, index) => (
                    <div className="flex items-center justify-between font-bold py-4 px-3 m-2 border-b-2 shadow-sm" key={index} onClick={() => { navigate(`/page/${pageTitle?.pagenumber}`); }}>
                        <span>{pageTitle?.pagetitle}</span>
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </div>
                ))
            }

        </div>
    )
}

export default SubCategoriesList
