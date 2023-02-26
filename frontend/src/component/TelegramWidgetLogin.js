import React, { useRef, useEffect } from 'react'
const TelegramWidgetLogin = ({botName,dataOnauth}) => {
    const ref = useRef(null)

    useEffect(() => {
      if (ref.current === null) return
  
      window.TelegramLoginWidget = {
        dataOnauth: (user) => dataOnauth(user)
      }
  
      const script = document.createElement('script')
      script.src = 'https://telegram.org/js/telegram-widget.js?4'
      script.setAttribute('data-telegram-login', botName)
      script.setAttribute('data-size', 'large')
      script.setAttribute('data-userpic', "false")
      script.setAttribute('data-onauth', 'TelegramLoginWidget.dataOnauth(user)')
      script.async = true
  
      ref.current.appendChild(script)
    }, [botName,dataOnauth,ref])
  
    return <div ref={ref} />
}


export default TelegramWidgetLogin