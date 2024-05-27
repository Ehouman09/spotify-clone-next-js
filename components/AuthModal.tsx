"use client";


import { FC } from "react";
import { Modal } from "./Modal";
interface  AuthModalProps {};

export const AuthModal: FC<AuthModalProps> = (props) => {
    return (
        <Modal
            title="Welcome back"
            description="Login to your account"
            isOpen
            onChange={ () => {}}
        >
            Auth modal children
        </Modal>
    );
}
