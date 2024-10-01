import { useEffect, useState } from "react";
import SubCategoriesList from "./SubCategoriesList";
import downarrow from "../assets/down-arrow-svgrepo-com.svg";
import { CategoriesServices } from "../services/CategoriesServices";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategory, getColor, getTextColor, setCategory, setTextColor, submitColor } from "../redux/themeSlice";
import { SlugService } from "../services/SlugService";

const colors: string[] = [
    'magenta', '#ffdd62', '#e21327', '#71cff1', '#f78551', '#02998a', 'blue', 'purple', 'pink', 'brown'
];

const textColors: string[] = [
    'normal', '#8d8070', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff'
]

const CategoriesList: React.FC = () => {
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const data = useSelector((state: any) => state.theme);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>('Grammatik');
    const [uniqueData, setUniqueData] = useState<any[]>([])

    useEffect(() => {
        dispatch(getColor());
        dispatch(getTextColor());
        dispatch(getCategory());

        CategoriesServices.getCategories()
            .then((data) => {
                setUniqueData(Array.from(new Map(data.map((item: any) => [item.Maincategory, item])).values()))
            })
            .catch(() => alert("Error fetching"));
    }, []);

    useEffect(() => {
        setSelectedCategory(data.category)
    }, [data.category])

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleCategoryClick = async (category: string, color: string, textColor: string) => {
        setIsOpen(false);
        setSelectedCategory(category);
        await dispatch(setCategory(category))
        await dispatch(submitColor(color));
        await dispatch(setTextColor(textColor));
        navigate(`/${category}`)
    };


    return (
        <div className="">
            {/* <Dropdown uniqueData={uniqueData} /> */}
            <div className="relative text-center ">
                <div className="fixed top-0 w-full lg:w-[768px] md:w-[768px] z-30">
                    <div
                        style={{ backgroundColor: data?.color, color: data?.textColor }}
                        className={`inline-flex justify-between items-center w-full px-4 py-4 bg-[${data?.colo}] text-lg font-bold text-gray-700 focus:outline-none`}
                        id="menu-button"
                        aria-expanded={isOpen}
                        aria-haspopup="true"

                    >
                        <div className="flex-grow text-center">
                            {selectedCategory || "Categories"}
                        </div>
                        <div>
                            <img className="h-6 w-6 text-gray-700 cursor-pointer" src={downarrow} alt="DownArrow" onClick={toggleDropdown} />
                        </div>
                    </div>
                </div>

                {isOpen && (
                    <div
                        className="origin-top-right z-50 absolute top-[-60px] w-full h-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="menu-button"
                    >
                        <div className="" role="none">
                            {uniqueData.map((item, index) => (
                                item.Maincategory && (
                                    <div
                                        key={index}
                                        style={{ backgroundColor: colors[index % colors.length], color: textColors[index % colors.length] }}
                                        className={`text-xl font-bold text-[${textColors[index % colors.length]}] ${item?.bg_color ? `bg-[${item.bg_color}]` : `bg-[${colors[index % colors.length]}]`} hover:text-black block px-4 py-16 cursor-pointer`}
                                        role="menuitem"
                                        onClick={() => handleCategoryClick(item?.Maincategory, colors[index % colors.length], textColors[index % colors.length])}
                                    >
                                        {item.Maincategory}
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                )}
            </div>
            {/* Sub-categories list  */}
            <div className="text-charcoal">
                <SubCategoriesList selectedCategory={selectedCategory} />
            </div>
        </div >
    )
}

export default CategoriesList