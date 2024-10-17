import { useEffect, useState } from "react";
import { CategoriesServices } from "../services/CategoriesServices";
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useNavigate } from "react-router-dom";
import { ArrowLeftCircleIcon, ArrowRight, ArrowRightCircle, ArrowRightCircleIcon, ArrowRightIcon, ArrowRightSquare } from "lucide-react";
import { BiRightArrow } from "react-icons/bi";

interface Categories {
    Maincategory: string;
    Subcategory: string;
    Pagetitle: string;
    Pagenumber: number;
}

interface SubCategoriesListProps {
    selectedCategory: string;
}

const SubCategoriesList: React.FC<SubCategoriesListProps> = ({ selectedCategory }) => {
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
            <div className="bg-gray-200 py-4 px-2 mt-14 flex" style={{
                justifyContent: "space-between",
                gap: 2,
                alignItems: "center"
            }}>
                <div className="swiper-button image-swiper-button-prev">
                    <img src="/icons/left-arrow.png" alt="prev" width={20} />
                </div>
                <Swiper
                    modules={[Navigation, Pagination, A11y]}
                    slidesPerView={3}
                    spaceBetween={10}
                    style={{
                        flex: 1
                    }}
                    className="mySwiper "
                    navigation={{
                        nextEl: ".image-swiper-button-next",
                        prevEl: ".image-swiper-button-prev",
                        disabledClass: "swiper-button-disabled"
                    }}
                // pagination={{ clickable: true }}
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
                <div className="swiper-button image-swiper-button-next">
                    <img src="/icons/right-arrow.png" alt="next" width={20} />
                </div>
            </div>

            {pageTitle.map((pageTitle, index) => (
                <div
                    className="flex items-center justify-between text-xl font-extrabold py-4 px-3 m-2 border-b-2 shadow-sm cursor-pointer"
                    key={index}
                    onClick={() => navigate(`/${subcategory}/${pageTitle?.Pagenumber}`, { state: { title: pageTitle.Pagetitle } })}
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
