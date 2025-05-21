import isWeekEnd from '../js/utils/date.js'

export const delivaryOptions = [
    {
    id: '1',
    days: 7,
    priceCents: 0
},
    {
    id: '2',
    days: 3,
    priceCents: 499
},
    {
    id: '3',
    days: 1,
    priceCents: 999
}
]

export function getDelivaryOption(delivaryOptionId){
    let matchingDelivaryOption
        delivaryOptions.forEach((delivaryOption) => {
            if(delivaryOption.id === delivaryOptionId){
                matchingDelivaryOption = delivaryOption
            }
        })

    return matchingDelivaryOption    
}

export function calculateDelivaryDate(delivaryOption){
    let count = delivaryOption.days
    const currentDate = dayjs()
    let delivaryDate = currentDate.add(0, 'days')
    while(count > 0){
        delivaryDate = delivaryDate.add(1, 'days')
        if(!isWeekEnd(delivaryDate))
            count--
    }
    return delivaryDate
}