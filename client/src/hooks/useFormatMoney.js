import { useState, useEffect } from "react";

const useFormatMoney = () => {
    const formatMoney = (number) => {
        if (!number) return 'Loading...';
        number = number.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
        return number
    }
    return [formatMoney]

}

export default useFormatMoney