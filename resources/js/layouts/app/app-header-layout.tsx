import { type BreadcrumbItem } from '@/types';
import type { PropsWithChildren } from 'react';
import {AppBar, Button, Box, Toolbar} from "@mui/material";
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import {Link, router} from "@inertiajs/react";
import {LogOut} from "lucide-react";
import {useMobileNavigation} from "@/hooks/use-mobile-navigation";
import SearchIcon from '@mui/icons-material/Search';
export default function AppHeaderLayout({ children, breadcrumbs }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    const cleanup = useMobileNavigation();

    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };
    return (
        <AppBar position="static">
            <Toolbar sx={{ backgroundColor: 'white', boxShadow: 'none' }}>
                <img src='../../images/logo.png' style={{
                    height: 'auto',
                    width: '7%'
                }} alt="Logo" />

                <Box sx={{ flexGrow: 1 }}>

                    <Button href={route('product-list')} variant="contained"  sx={{
                        bgcolor: 'black',
                        color: 'white',
                        display: { xs: 'none', md: 'inline-flex' }
                    }}>
                        Sell Your Products
                    </Button>

                </Box>

                <SearchIcon  sx={{
                    bgcolor: 'black',
                    color: 'white',
                    display: { xs: 'inline-flex', md: 'none' }
                }}/>
                <Link href={route('cart')}>
                <ShoppingCartRoundedIcon sx={{ mr: 1 }} style={{color: 'black'}}  />
                </Link>
            {/*    {if (this.authenticated())*/}
            {/*    <Button variant="contained" sx={{ bgcolor: 'black', color: 'white' }}  href={route('login')}>*/}
            {/*        Login*/}
            {/*    </Button>*/}
            {/*}*/}
                <Link className="block w-full" method="post" href={route('logout')} as="button" onClick={handleLogout}>
                <Button variant="contained" sx={{ bgcolor: 'black', color: 'white' }}  href={route('login')}>
                    Logout
                </Button>
                </Link>
            </Toolbar>
        </AppBar>
    );
}
