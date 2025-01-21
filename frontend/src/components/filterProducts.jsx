const filterProducts = (products, searchQuery, selectedCategory, maxPrice) => {
    return products.filter((product) => {
      const matchesCategory = selectedCategory
        ? product.category === selectedCategory
        : true;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = product.price <= maxPrice;
  
      return matchesCategory && matchesSearch && matchesPrice;
    });
  };
  
  export default filterProducts;
  