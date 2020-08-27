import React, { FC, useEffect, useReducer } from 'react'
import { createCtx } from '@bit/lucis.alt.utils'
import { Order } from '@bit/lucis.alt.typings'

import {
  OrderContextActions,
  OrderContextState,
  orderStateReducer,
} from './orderReducer'

type Dispatch = (action: OrderContextActions) => void

export const [useOrderState, OrderStateProvider] = createCtx<
  OrderContextState
>()
export const [useOrderDispatch, OrderDispatchProvider] = createCtx<Dispatch>()

export const useOrder = () =>
  [useOrderState(), useOrderDispatch()] as [OrderContextState, Dispatch]

const initialOrder: Order = {
  items: [],
  date: new Date().toISOString(),
  totalizers: {
    totalPrice: 0,
    shippingPrice: 0,
    finalPrice: 0,
  },
}

export const OrderContextProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(orderStateReducer, {
    order: initialOrder,
  })

  // Calculates total order price
  useEffect(() => {
    const totalPrice =
      state.order?.items
        .filter(Boolean)
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        .reduce((acc, { itemPrice }) => acc + itemPrice, 0) ?? 0

    if (totalPrice !== state.order?.totalizers?.totalPrice) {
      dispatch({ type: 'SET_TOTAL_PRICE', args: totalPrice })
    }
  }, [state.order])

  return (
    <OrderStateProvider value={state}>
      <OrderDispatchProvider value={dispatch}>{children}</OrderDispatchProvider>
    </OrderStateProvider>
  )
}
