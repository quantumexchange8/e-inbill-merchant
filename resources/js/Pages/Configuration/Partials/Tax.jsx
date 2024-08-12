import { useForm } from "@inertiajs/react";
import React, { useState } from "react";

export default function Tax({ merchant }) {

    const [editMerchant, setEditMerchant] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        tin_no: merchant.tin_no,
        irbm_client_id: merchant.irbm_client_id,
        irbm_client_key: merchant.irbm_client_key,
    });

    const editMerchantDetails = () => {
        setEditMerchant(true)
    }
    
    const closeMerchant = () => {
        setEditMerchant(false)
        reset()
    }

    return (
        <div>
            3
        </div>
    )
}