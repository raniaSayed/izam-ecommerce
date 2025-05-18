import AppHeaderLayout from "@/layouts/app/app-header-layout";
import ProductList from "@/pages/components/ecom/ProductList";
import Cart from "@/pages/components/ecom/Cart";
import {useState} from "react";
import {CartItem} from "@/pages/components/ecom/types";

export default function Dashboard() {

    return (
        <ProductList />
    );
}
