import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CategoriesServices } from "../services/CategoriesServices";
import downarrow from "../assets/down-arrow-svgrepo-com.svg";
import SubCategoriesList from "./SubCategoriesList";

const NewCategoriesList: React.FC = () => {
    const { categories } = useParams<{ categories: string }>();

    const [categoriesList, setCategoriesList] = useState<categories[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(categories);
    const navigate = useNavigate();


    useEffect(() => {
        CategoriesServices.getCategories()
            .then((data) => {
                // console.log("works", data);
                setCategoriesList(data);
            })
            .catch(() => alert("Error fetching"));
    }, []);

    // console.log(uniqueData)
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
        setIsOpen(false);
        navigate(`/${category}`)
    };

    const colors: string[] = [
        'magenta', '#ffdd62', '#e21327', '#71cff1', '#f78551', '#02998a', 'blue', 'purple', 'pink', 'brown'
    ];


    const uniqueData = Array.from(new Map(categoriesList.map(item => [item.Maincategory, item])).values())

    // console.log(categories)
    return (
        <div className="">
            {/* <Dropdown uniqueData={uniqueData} /> */}
            <div className="relative text-center ">
                <div className="fixed top-0 w-full lg:w-[768px] md:w-[768px] z-30">
                    <div
                        className="inline-flex justify-between items-center w-full px-4 py-4 bg-[#ffdd62] text-lg font-bold text-gray-700 focus:outline-none"
                        id="menu-button"
                        aria-expanded={isOpen}
                        aria-haspopup="true"

                    >
                        <div className="flex-grow text-center">
                            {categories || "Categories"}
                        </div>
                        <div>
                            <img className="h-6 w-6 text-gray-700 cursor-pointer" src={downarrow} alt="DownArrow" onClick={toggleDropdown} />
                        </div>
                    </div>
                </div>

                {isOpen && (
                    <div
                        className="origin-top-right z-50 absolute top-0 w-full h-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="menu-button"
                    >
                        <div className="" role="none">
                            {uniqueData.map((item, index) => (
                                item.Maincategory && (
                                    <div
                                        key={index}
                                        style={{ backgroundColor: colors[index % colors.length] }}
                                        className="text-xl font-bold text-white hover:text-black block px-4 py-16 cursor-pointer"
                                        role="menuitem"
                                        onClick={() => handleCategoryClick(item.Maincategory)}
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

export default NewCategoriesList