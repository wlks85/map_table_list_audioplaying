import { useEffect, useState } from "react";
import SubCategoriesList from "./SubCategoriesList";
import downarrow from "../assets/down-arrow-svgrepo-com.svg";
import { CategoriesServices } from "../services/CategoriesServices";

interface categories {
    Maincategory: string;
    Subcategory: string;
}

const CategoriesList: React.FC = () => {

    const [categories, setCategories] = useState<categories[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>("Grammatik");


    useEffect(() => {
        CategoriesServices.getCategories()
            .then((data) => {
                // console.log("works", data);
                setCategories(data);
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
    };

    const colors: string[] = [
        '#ffdd62', '#e21327', '#71cff1', '#f78551', '#02998a', 'blue', 'purple', 'pink', 'brown', 'magenta'
    ];


    const uniqueData = Array.from(new Map(categories.map(item => [item.Maincategory, item])).values())
    // const uniqueData = categories.map(item =>)
    // console.log(uniqueData)

    return (
        <div className="">
            {/* <Dropdown uniqueData={uniqueData} /> */}
            <div className="relative text-center ">
                <div className="fixed top-0 w-full lg:w-[768px] md:w-[768px] z-30">
                    <div
                        className="inline-flex justify-between items-center w-full px-4 py-4 bg-yellow-400 text-lg font-bold text-gray-700 hover:bg-yellow-500 focus:outline-none"
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

export default CategoriesList