import { useEffect, useState } from "react";
import SubCategoriesList from "./SubCategoriesList";
import downarrow from "../assets/down-arrow-svgrepo-com.svg";
import { CategoriesServices } from "../services/CategoriesServices";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategory, getColor, getTextColor, setCategory, setTextColor, submitColor } from "../redux/themeSlice";

const colors: string[] = [
    'magenta', '#ffdd62', '#e11325', '#71cdf1', '#f08757', '#0a998a', '#0a998a', 'blue', 'purple', 'pink', 'brown'
];

const textColors: string[] = [
    'normal', '#8d8070', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff'
]

const CategoriesList: React.FC = (props: any) => {
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const data = useSelector((state: any) => state.theme);
    const [isOpen, setIsOpen] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string>('Grammatik');
    const [uniqueData, setUniqueData] = useState<any[]>([])

    useEffect(() => {
        if (props.category) setIsOpen(false);
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
                            {uniqueData.map((item, index) => {
                                var color = '#ffdd62';
                                var textColor = '#8d8070';

                                if (Number(item.page) <= 142) {
                                    color = colors[1];
                                    textColor = textColors[1];
                                }
                                else if (Number(item.page) <= 250) {
                                    color = colors[2];
                                    textColor = textColors[2];
                                }
                                else if (Number(item.page) <= 334) {
                                    color = colors[3];
                                    textColor = textColors[3];
                                }
                                else if (Number(item.page) <= 358) {
                                    color = colors[4];
                                    textColor = textColors[4];
                                }
                                else {
                                    color = colors[5];
                                    textColor = textColors[5];
                                }
                                if (item.Maincategory) return (
                                    <div
                                        key={index}
                                        style={{ backgroundColor: color, color: textColor }}
                                        className={`text-xl font-bold text-[${textColor}] ${item?.bg_color ? `bg-[${item.bg_color}]` : `bg-[${color}]`} hover:text-black block px-4 py-16 cursor-pointer`}
                                        role="menuitem"
                                        onClick={() => handleCategoryClick(item?.Maincategory, color, textColor)}
                                    >
                                        {item.Maincategory}
                                    </div>
                                )
                            }
                            )}
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