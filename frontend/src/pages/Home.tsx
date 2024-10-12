
import { useSelector } from 'react-redux';
import CategoriesList from '../components/CategoriesList';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import SlugCategoryList from '../components/SlugCategoryList';

const HomePage = () => {

    const params = useParams();

    return (
        <div className="flex flex-col h-full bg-white mb-40">
            {/* <header className=' flex flex-col gap-4 w-full p-4 bg-primary text-tearose '>
                <h1 className='text-4xl'>WordMap</h1>
                <div className="w-full">
                    <input type="text" placeholder="Search for a word" className=" h-14 w-full p-2 border border-gray-300 focus:outline-none focus:border-primary bg-white text-primary" />
                </div>
            </header> */}
            {
                params.slug ? <div className="text-charcoal">
                    <SlugCategoryList />
                </div> :
                    <div className="text-charcoal">
                        <CategoriesList category={params.categories} />
                    </div>
            }

            <div className='flex-1'>
                {/* <WordList /> */}
            </div>
        </div>
    );
}

export default HomePage;
