import React, {useEffect, useState} from 'react';
import {
  Box,
  Drawer,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  Divider,
  useTheme,
  useMediaQuery,
  Stack,
  ButtonGroup,
} from '@mui/material';
import { Close, Add, Remove, Delete } from '@mui/icons-material';
import {CartItem} from './types';
import axios from "axios";
import AppHeaderLayout from "@/layouts/app/app-header-layout";

interface CartProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
  onRemoveItem: (productId: number) => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = (
    {
  // open,
  // onClose,
  // items,
  // onUpdateQuantity,
  // onRemoveItem,
  // onCheckout,
}
) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
   const items = JSON.parse(localStorage.getItem('cart') || '[]');

    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(true);
    // const items = JSON.parse(localStorage.getItem('cart') || '[]');
    useEffect(() => {
       setCartItems(items);
        console.log({items})
        console.log({cartItems})
    }, []);


    const handleUpdateQuantity = (productId: number, newQuantity: number) => {
        if (newQuantity <= 0) {
            handleRemoveFromCart(productId);
            return;
        }
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.product.id === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const handleRemoveFromCart = (productId: number) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    };

    const handleCheckout = async () => {
        alert('Proceeding to checkout!');
        const response = await axios.post('/api/orders', {
            products: cartItems.map((ci) =>  ({ id: ci.id, quantity: ci.quantity })),
            total: total
        });
        console.log({response})
        localStorage.removeItem('cart');
        setCartItems(
            response.data.data.map((item: any) => ({
                id: item.id,
                product: item.product,
                quantity: item.quantity,
            }))
        )
        setIsCartOpen(false);
    };
    const calculateTotal = () => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const shipping = cartItems.length > 0 ? 15 : 0;
    const tax = Math.round(subtotal * 0.03);
    return { subtotal, shipping, tax, total: subtotal + shipping + tax };
  };

  const { subtotal, shipping, tax, total } = calculateTotal();

    const onClose = () =>  setIsCartOpen(false)

    return (
        <div>
            <AppHeaderLayout />
            <Drawer
          anchor={isMobile ? 'bottom' : 'right'}
          open={isCartOpen}
          onClose={ onClose }
          PaperProps={{
            sx: {
              width: isMobile ? '100%' : 400,
              height: isMobile ? '80vh' : '100%',
            },
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">Shopping Cart</Typography>
              <IconButton onClick={onClose}>
                <Close />
              </IconButton>
            </Box>

            <Divider />

            {cartItems.length === 0 ? (
              <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography color="text.secondary">Your cart is empty</Typography>
                <Button onClick={onClose} sx={{ mt: 2 }} href={route('product-list')}>
                  Continue Shopping
                </Button>
              </Box>
            ) : (
              <List sx={{ flexGrow: 1, overflow: 'auto' }}>
                {cartItems.map((item) => (
                  <ListItem
                    key={item.product.id}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        onClick={() => handleRemoveFromCart(item.product.id)}
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar
                        variant="square"
                        src={item.product.image}
                        alt={item.product.name}
                        sx={{ width: 60, height: 60, mr: 2 }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.product.name}
                      secondary={
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            ${item.product.price}
                          </Typography>
                          <ButtonGroup size="small" sx={{ mt: 1 }}>
                            <IconButton
                              onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Remove fontSize="small" />
                            </IconButton>
                            <Button disabled>{item.quantity}</Button>
                            <IconButton
                              onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                              disabled={item.quantity >= item.product.stock}
                            >
                              <Add fontSize="small" />
                            </IconButton>
                          </ButtonGroup>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            )}

            <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
              <Stack spacing={1}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>Subtotal</Typography>
                  <Typography>${subtotal}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>Shipping</Typography>
                  <Typography>${shipping}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>Tax</Typography>
                  <Typography>${tax}</Typography>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6">Total</Typography>
                  <Typography variant="h6">${total}</Typography>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleCheckout}
                  disabled={cartItems.length === 0}
                  fullWidth
                >
                  Checkout
                </Button>
              </Stack>
            </Box>
          </Box>
        </Drawer>
     </div>
  );
};

export default Cart;
