import React, { FC, useState, useEffect, useCallback, useMemo } from 'react'
import { Radio, Alert } from 'antd'
import ReactMarkdown from 'react-markdown'
import CurrencyInput from '@bit/lucis.alt.currency-input'
import { TenantConfig } from '@bit/lucis.alt.typings'

const radioStyle = {
  height: '30px',
  lineHeight: '30px',
}

type Props = {
  methods: TenantConfig['paymentMethods']
  onPayment: (data: { name: string; change: string }) => void
}

const PaymentSelector: FC<Props> = ({ methods, onPayment }) => {
  const [selectedIndex, setSelected] = useState<number>()
  const [change, setChange] = useState('')

  useEffect(() => {
    const method = typeof selectedIndex === 'number' && methods[selectedIndex]

    if (!method) return
    onPayment({ name: method.name, change })
  }, [onPayment, selectedIndex, methods, change])

  const onChange = useCallback(
    (e) => {
      const methodIndex = e.target.value

      setSelected(methodIndex)
    },
    [setSelected]
  )

  const { imgSrc, description, name } = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return selectedIndex ? methods[selectedIndex] : ({} as any)
  }, [selectedIndex, methods])

  return (
    <div className="flex flex-column items-center w-100 mt2">
      <h2>Selecione o pagamento</h2>
      <div>
        <Radio.Group
          onChange={onChange}
          value={selectedIndex}
          className="w-100"
        >
          {methods.map(({ name: methodName, checksForChange }, i) => (
            <Radio style={radioStyle} value={i} key={i} className="w-100">
              {methodName}
              {checksForChange && selectedIndex === i && (
                <CurrencyInput
                  valueAsString
                  addonBefore="R$"
                  placeholder="Troco para?"
                  className="ml2 w-50"
                  value={change}
                  onChange={(e) => {
                    setChange(e.target.value)
                  }}
                />
              )}
            </Radio>
          ))}
        </Radio.Group>
      </div>
      <div className="tc">
        {(description || imgSrc) && <h4>Informações</h4>}
        <div className="flex flex-column items-center">
          {description && (
            <ReactMarkdown source={description} className="pa1" />
          )}
          {imgSrc && <img src={imgSrc} alt={name} className="w-70" />}
        </div>
        {(description || imgSrc) && (
          <Alert
            message="Envie o comprovante de transferência pelo Whatsapp."
            type="warning"
            className="mt4"
          />
        )}
      </div>
    </div>
  )
}

export default PaymentSelector
