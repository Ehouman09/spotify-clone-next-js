'use client';

import { FC, useState } from "react";
import { Modal } from "./Modal";
import { Price, ProductsWithPrice } from "@/types";
import Button from "./Button";
import { useUser } from "@/hooks/useUser";
import toast from "react-hot-toast";
import { postData } from "@/libs/helpers";
import { getStripe } from "@/libs/stripeClient";

interface  SubscribeModalProps {
    products: ProductsWithPrice[]
};

const formatPrice = (price: Price) =>{

    const priceString = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: price.currency,
        minimumFractionDigits: 0
    }).format((price?.unit_amount || 0) / 100);

    return priceString;
}

export const SubscribeModal: FC< SubscribeModalProps> = ({
    products
}) => {
 
    const [priceIdLoading, setPriceIdLoading] = useState<string>();
    const { user, isLoading, subscription } = useUser();
 
    const handleCheckoutPrice = async (price: Price)  => {
        setPriceIdLoading(price.id);

        if (!user) {
            setPriceIdLoading(undefined);
            return toast.error('Must be logged');
        }

        if(subscription){
            setPriceIdLoading(undefined); 
            return toast('Already subscribed');
        }

        try {
            

            const { sessionId } = await postData({
                url: '/api/create-checkout-session',
                data: { price }
            });

            const stripe = await getStripe();
            stripe?.redirectToCheckout({ sessionId });

        } catch (error) {
            toast.error((error as Error).message );
            
        } finally {
            setPriceIdLoading(undefined);
        }
    }
    

    let content = (
        <div className="text-center">
            No products available.
        </div>
    );

    if (products.length) {
        content = (
            <div>

                {
                    products.map((product) => {
                        if(!product.prices?.length){
                            return (
                                <div key={product.id} className="text-center">
                                    No price available
                                </div>
                            )
                        }
                        return product.prices.map((price) => (
                            <Button 
                                key={price.id}
                                onClick={ () => handleCheckoutPrice(price)}
                                disabled={isLoading || price.id === priceIdLoading }
                                className="mb-4"
                                >
                                { `Subscribe for ${formatPrice(price)} a ${price.interval}` }
                            </Button>
                        ) )
                    })
                }

            </div>
        );
    }


    if (subscription) {
        content = (
            <div className="text-center">
                Already subscribed
            </div>
        )
    }

    return (
        <Modal
            title="Only for premium users"
            description="Listen to music with Spotify Premium"
            isOpen
            onChange={  () => {} }
        >
            { content }
        </Modal>
    );
}
