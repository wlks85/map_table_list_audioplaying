import { useEffect, useState } from "react";
import SubCategoriesList from "./SubCategoriesList";
import downarrow from "../assets/down-arrow-svgrepo-com.svg";
import { CategoriesServices } from "../services/CategoriesServices";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getColor, getTextColor, setCategory, setColor, setTextColor, submitColor } from "../redux/themeSlice";

const colors: string[] = [
    'magenta', '#ffdd62', '#e11325', '#71cdf1', '#f08757', '#0a998a', '#0a998a', 'blue', 'purple', 'pink', 'brown'
];

const textColors: string[] = [
    'normal', '#8d8070', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff'
]

const CategoriesList: React.FC = (props: any) => {
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const location = useLocation();
    const data = useSelector((state: any) => state.theme);
    const [isOpen, setIsOpen] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [uniqueData, setUniqueData] = useState<any[]>([])
    const [modalOpen, setModalOpen] = useState(false)

    useEffect(() => {
        if (props.category) setIsOpen(false);
        dispatch(getColor());
        dispatch(getTextColor());
        setSelectedCategory(props.category);
        CategoriesServices.getCategories()
            .then((data) => {
                setUniqueData(Array.from(new Map(data.map((item: any) => [item.Maincategory, item])).values()))
                console.log(location.pathname.replace("/", ''));
                const items = Array.from(new Map(data.map((item: any) => [item.Maincategory, item])).values()).filter(it =>
                    it.Maincategory == location.pathname.replace("/", "")
                )
                if (items.length > 0) {
                    const item = items[0];
                    if (Number(item.page) <= 142) {
                        dispatch(setColor(colors[1]));
                        dispatch(setTextColor(textColors[1]));
                    }
                    else if (Number(item.page) <= 250) {
                        dispatch(setColor(colors[2]));
                        dispatch(setTextColor(textColors[2]));
                    }
                    else if (Number(item.page) <= 334) {

                        dispatch(setColor(colors[3]));
                        dispatch(setTextColor(textColors[3]));
                    }
                    else if (Number(item.page) <= 358) {

                        dispatch(setColor(colors[4]));
                        dispatch(setTextColor(textColors[4]));
                    }
                    else {
                        dispatch(setColor(colors[5]));
                        dispatch(setTextColor(textColors[5]));
                    }
                }
            })
            .catch((e) => console.log(e));
    }, [dispatch, props.category]);

    // useEffect(() => {
    //     setSelectedCategory(data.category)
    // }, [data.category])

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    }

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
            <div className="relative text-center">
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
                        <div className="pr-2">
                            <img className="h-6 w-6 text-gray-700 cursor-pointer" src={'/icons/info-outline-svgrepo-com.png'} alt="DownArrow" onClick={toggleModal} />
                        </div>
                        <div>
                            <img className="h-6 w-6 text-gray-700 cursor-pointer" src={downarrow} alt="DownArrow" onClick={toggleDropdown} />
                        </div>
                    </div>
                </div>

                {isOpen && (
                    <div
                        className="origin-top-right z-50 absolute  w-full h-full bg-blend-normal rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="menu-button"
                    >
                        <div className="h-screen bg-white bg-blend-overlay" role="none">
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
            {!isOpen && <div className={`text-charcoal`}>
                <SubCategoriesList selectedCategory={selectedCategory} />
            </div>}

            {modalOpen && <>
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                                        </svg>
                                    </div>
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title"> Lorem ipsum</h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500"> Lorem ipsum</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button onClick={toggleModal} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>}

        </div >
    )
}

export default CategoriesList