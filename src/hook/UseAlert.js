import React, {useState} from "react";
import Alert from "../layout/Alert";

export const useAlert = () => {

    const [title, setTitle] = useState(null);
    const [message, setMessage] = useState(null);
    const [show, setShow] = useState(false);


    const alertOpen = (title, message) => {
        setTitle(title);
        setMessage(message);
        setShow(true);
    }

    const alertClose = () => {
        setShow(false);
    }

    const AlertNode = (<Alert open={show} title={title} message={message} handleClose={alertClose} />)

    return {alertOpen, alertClose, AlertNode};
}
