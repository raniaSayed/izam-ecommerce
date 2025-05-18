import React, {useEffect, useState} from 'react';
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid,
    IconButton,
    Drawer,
    Slider,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Button,
    useTheme,
    useMediaQuery,
    Fab,
    Breadcrumbs,
    Link,
    Pagination,
} from '@mui/material';
import { FilterList, Add, Remove, ShoppingCart } from '@mui/icons-material';
import axios from "axios";
import {Product} from "@/pages/components/ecom/types";
import AppHeaderLayout from "@/layouts/app/app-header-layout";

const ProductList = () => {

    const [products, setProducts] = useState <Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    useEffect(() => {
            const fetchProducts = async () => {
                try {
                    const response = await axios.get('/api/products');
                    const products = response.data.data;
                    setProducts(products);
                    const categories = new Set(products.map((product: Product) => product.category));
                    setSelectedCategories(categories);
                } catch (err) {
                    setError('Failed to fetch products');
                } finally {
                    setLoading(false);
                }
            };

            fetchProducts();


    }, []);

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const handleAddProductToCart = (productId: number) => () => {
        const product = products.find((product) => product.id === productId);
        if (!product) {
            return;
        }
        const cartItem = cart.find((cartItem) => cartItem.id === productId);
        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            cart.push({id: productId, product, quantity: 1});
        }
        console.log({cart});
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [priceRange, setPriceRange] = useState<number[]>([0, 300]);
    const categories = new Set(products.map((product) => product.category));
    const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set(categories));

    console.log({selectedCategories});
    console.log({cat: products.map((product) => product.category)});

    const [page, setPage] = useState(1);
    const productsPerPage = 6;

    const handlePriceChange = (event: Event, newValue: number | number[]) => {
        setPriceRange(newValue as number[]);
    };

    const handleCategoryChange = (category: string) => {
        const newCategories = new Set(selectedCategories);
        console.log({newCategories});
        console.log({selectedCategories});
        console.log({newCategories});
        if (newCategories.has(category)) {
            newCategories.delete(category);
        } else {
            newCategories.add(category);
        }
        setSelectedCategories(newCategories);
    };

    const filteredProducts = products.filter((product) => {
        return (
            product.price >= priceRange[0] &&
            product.price <= priceRange[1] &&
            selectedCategories.has(product.category)
        );
    });
    console.log({filteredProducts});

    const pageCount = Math.ceil(filteredProducts.length / productsPerPage);
    const currentProducts = filteredProducts.slice(
        (page - 1) * productsPerPage,
        page * productsPerPage
    );

    const FilterDrawer = (
        <Box sx={{ width: 250, p: 3 }}>
            <Typography variant="h6" gutterBottom>
                Filters
            </Typography>
            <Box sx={{ my: 3 }}>
                <Typography gutterBottom>Price Range</Typography>
                <Slider
                    value={priceRange}
                    onChange={handlePriceChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={300}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>${priceRange[0]}</Typography>
                    <Typography>${priceRange[1]}</Typography>
                </Box>
            </Box>
            <FormGroup>
                <Typography gutterBottom>Categories</Typography>
                {(Array.from(categories)).map((category) => (
                    <FormControlLabel
                        key={category}
                        control={
                            <Checkbox
                                checked={selectedCategories.has(category)}
                                onChange={() => handleCategoryChange(category)}
                            />
                        }
                        label={category}
                    />
                ))}
            </FormGroup>
        </Box>
    );

    return (
        <div>
        <AppHeaderLayout />
        <Box sx={{ p: { xs: 2, md: 4 } }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Breadcrumbs>
                    <Link color="inherit" href="/public">
                        Home
                    </Link>
                    <Typography color="text.primary">Products</Typography>
                </Breadcrumbs>
                {isMobile ? (
                    <Fab
                        size="small"
                        color="primary"
                        onClick={() => setDrawerOpen(true)}
                        sx={{ position: 'fixed', bottom: 16, right: 16 }}
                    >
                        <FilterList />
                    </Fab>
                ) : (
                    <Button
                        startIcon={<FilterList />}
                        onClick={() => setDrawerOpen(true)}
                        variant="outlined"
                    >
                        Filters
                    </Button>
                )}
            </Box>

            <Grid container spacing={3}>
                {!isMobile && (
                    <Grid size={{ xs: 12, md: 4 }}>
                        {/*item*/}
                        {FilterDrawer}
                    </Grid>
                )}
                <Grid  size={{xs: 12, md:9}}>
                    {/*item*/}
                    <Grid container spacing={2}>
                        {currentProducts.map((product: any) => (
                            <Grid  size={{ xs: 12, sm:6, md: 4}} key={product.id}>
                                {/*item*/}

                                <Card>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={product.image}
                                        alt={product.name}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h6">
                                            {product.name}
                                        </Typography>
                                        <Typography color="text.secondary" gutterBottom>
                                            {product.category}
                                        </Typography>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Typography variant="h6">${product.price}</Typography>
                                            <IconButton color="primary">
                                                <ShoppingCart  onClick={handleAddProductToCart(product.id)}/>
                                            </IconButton>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <Pagination
                            count={pageCount}
                            page={page}
                            onChange={(_, value) => setPage(value)}
                            color="primary"
                        />
                    </Box>
                </Grid>
            </Grid>

            <Drawer
                anchor={isMobile ? 'bottom' : 'right'}
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            >
                {FilterDrawer}
            </Drawer>
        </Box>
        </div>

    );
};

export default ProductList;
