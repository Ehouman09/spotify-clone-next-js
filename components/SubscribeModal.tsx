'use client';

import { FC } from "react";
import { Modal } from "./Modal";

interface  SubscribeModalProps {};

export const SubscribeModal: FC< SubscribeModalProps> = (props) => {

    let content = (
        <div className="text-center">
            No products available.
        </div>
    )

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
