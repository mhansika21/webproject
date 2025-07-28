import React, { useContext, useState } from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/Item/Item'

const ShopCategory = (props) => {
    const { all_product } = useContext(ShopContext);
    const [sortOrder, setSortOrder] = useState('');

    // Filter and sort products
    const filteredProducts = all_product
        .filter(item => item.category === props.category)
        .sort((a, b) => {
            if (sortOrder === 'low-to-high') return a.new_price - b.new_price;
            if (sortOrder === 'high-to-low') return b.new_price - a.new_price;
            return 0;
        });

    return (
        <div className='shop-category'>
            <img src={props.banner} alt="" />
            <div className='shopcategory-indexSort'>
                <p>
                    <span>Showing {filteredProducts.length}</span> products
                </p>
                <div className="shopcategory-sort">
                    <label htmlFor="sort">Sort by: </label>
                    <select
                        id="sort"
                        onChange={(e) => setSortOrder(e.target.value)}
                        value={sortOrder}
                    >
                        <option value="">Default</option>
                        <option value="low-to-high">Price: Low to High</option>
                        <option value="high-to-low">Price: High to Low</option>
                    </select>
                    <img src={dropdown_icon} alt="Dropdown Icon" />
                </div>
            </div>

            <div className="shopcategory-products">
                {filteredProducts.map((item, i) => (
                    <Item
                        key={i}
                        id={item.id}
                        name={item.name}
                        image={item.image}
                        new_price={item.new_price}
                        old_price={item.old_price}
                    />
                ))}
            </div>

            <div className="shopcategory-loadmore">
                Explore More
            </div>
        </div>
    )
}

export default ShopCategory
