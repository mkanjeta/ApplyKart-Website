export const numberFormatStyle = (data) => {
    if (data) {
        const number = Intl.NumberFormat('en', {
            notation: 'compact'
        });
        return number.format(data);
    } else {
        return 0
    }
}
export const priceFormat = (data) => {
    if (data) {
        const number = Intl.NumberFormat('en', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
        });
        return number.format(data);
    } else {
        return 0
    }
}

export const indianPriceFormat = (data) => {
    if(data) {
        const number = Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0
        });
        return number.format(data);
    } else {
        return 0
    }
}

export const getDiffrenceBetweenMonths = (date1, date2) => {
    const startDate = new Date(date1);
    const endDate = new Date(date2);
    const startYear = startDate.getFullYear();
    const startMonth = startDate.getMonth();
    const endYear = endDate.getFullYear();
    const endMonth = endDate.getMonth();

    const months = (endYear - startYear) * 12 + (endMonth - startMonth);
    return months
}