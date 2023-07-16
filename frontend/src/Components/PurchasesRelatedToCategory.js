import React from 'react'
import { Purchase } from './Purchases/Purchase'

export default function PurchasesRelatedToCategory({ expenses = [] }) {

    return (
        <div>
            {expenses.map(e => {

                let date = new Date(e.date)

                return <Purchase
                    className='mx-1'
                    key={e._id}
                    price={e.price}
                    name={e.name}
                    category={e.category}
                    date={date}
                    _id={e._id}
                />
            })}
        </div>
    )
}
