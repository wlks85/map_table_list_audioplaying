import { useEffect, useState } from "react";
import { CategoriesServices } from "../services/CategoriesServices";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { useNavigate, useParams } from "react-router-dom";

interface Categories {
    Maincategory: string;
    Subcategory: string;
    Pagetitle: string;
    Pagenumber: number;
}

interface SubCategoriesListProps {
    selectedCategory: string;
}

const SubCategoriesList: React.FC<SubCategoriesListProps> = ({ selectedCategory}) => {
    const [categories, setCategories] = useState<Categories[]>([]);
    const [subcategory, setSubcategory] = useState<string>('Genuss');
    const [pageTitle, setPageTitle] = useState<Array<any>>([])
    const [uniqueData, setUniqueData] = useState<Array<any>>([])
    const navigate = useNavigate();

    useEffect(() => {
        let sub_category = localStorage.getItem('sub_category');
        if (sub_category) {
            setSubcategory(sub_category);
        }
    }, []);

    useEffect(() => {
        if (selectedCategory != '')
            CategoriesServices.getSubCategories(selectedCategory)
                .then((data) => {
                    setCategories(data);
                    const uniqueData = Array.from(new Map(data.map(item => [item.Subcategory, item])).values());
                    setUniqueData(uniqueData)
                })
                .catch(() => alert("Error fetching"));
    }, [selectedCategory]);

    useEffect(() => {
        const uniquePageTitle = categories.filter(item => item.Subcategory === subcategory);
        uniquePageTitle.sort((a, b) => a.Pagetitle.localeCompare(b.Pagetitle));
        let pt = Array.from(new Map(uniquePageTitle.map(item => [item.Pagetitle, item])).values());
        setPageTitle(pt);
    }, [
        categories,
        subcategory
    ])

    const handleButtonClick = (subcategory: string) => {
        setSubcategory(subcategory);
        localStorage.setItem('sub_category', subcategory);
    };

    return (
        <div >
            <div className="bg-gray-200 py-4 px-2 mt-14">
                <Swiper
                    slidesPerView={3}
                    spaceBetween={10}
                    className="mySwiper "
                >
                    {uniqueData.map((button, index) => (
                        <SwiperSlide key={index}>
                            <div
                                className={`text-center hover:bg-gray-500  font-bold py-2 px-2 rounded-3xl cursor-pointer ${subcategory === button.Subcategory ? 'bg-gray-600 text-white' : 'bg-gray-400 text-black'} `}
                                onClick={() => handleButtonClick(button.Subcategory)}
                            >
                                {button.Subcategory}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {pageTitle.map((pageTitle, index) => (
                <div
                    className="flex items-center justify-between text-xl font-extrabold py-4 px-3 m-2 border-b-2 shadow-sm cursor-pointer"
                    key={index}
                    onClick={() => navigate(`/${subcategory}/${pageTitle?.Pagenumber}`)}
                >
                    <span className="font-extrabold">{pageTitle.Pagetitle}</span>
                    <svg className="w-4 h-4 ml-2 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </div>
            ))}
        </div>
    );
};

export default SubCategoriesList;
