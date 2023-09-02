import React, { useEffect, useState } from 'react'
import './CartCss/cart.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'

const CartIcon = ({cName}) => {
    const cart = useSelector(state=>state.cart)
    const auth = useSelector(state=>state.auth)
    const navigate = useNavigate()
    console.log(cart.cartsInAuthUser.length)


    const onclickHandler = ()=>{
      navigate('/cart')
    }



  return (
    <div className={cName} onClick={onclickHandler}>
         <div className= 'carticon'>
        <svg className='carticon__svg' width="34" height="30" viewBox="0 0 34 30" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <rect width="34" height="30" fill="url(#pattern0)" />
                    <defs>
                        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlinkHref="#image0_206_27" transform="matrix(0.0333333 0 0 0.0377778 0 -0.0666667)" />
                        </pattern>
                        <image id="image0_206_27" width="30" height="30" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAADR0lEQVR4nMXVSUwTURgH8NGoR6NGL2qMUbx4MdGLJz1oTEiMnlwSCVXovJkpYAGhfdNlpgxdaAvz2gqU0gLSdthEAcWwFHHFLe5L3BLUoLhUYzRajUueKQkHkUBLoX7JP3l5+WZ+M/O+ZAiCIIhMb94imV3YC1jHFgaKqwgCzyJmujK9eYuogO4VPGb7QlUKVwAU6wCLTgOtc/WMwmk16nWwzfah6V47ZiTu4sjDwLIUwIoXAPDMnVGcCmptdIAbOFDDrh3dAyzSyaFjO5HsAmq0iYTIlHyYL10MDLbHMh/cJ6tWbTxQwy5JHi7YflRcPPLT2FP+UXW85G12o2GYkbjBLIm/kiXx/owAq0z3FWxL88IU4AHTNw/AaP/U8agL9z4//Vc6n3bjprtt2HtVwmJ/dUTfKYZzm41v6KD+NfDrnikkLqSQOGt6jWq3zAs3yOqUC+KC6RLr3ar+xn/gidI9GMKtD07guutN2HHe91045Xp36Kh5OKvBMEQH9E/pgK43w1e4dEI402L0CQ2e3/HAk4WRuNeTHovMWrwv3+WIjL04cKsVtz3qjHk9mo4nXZgO8Jcm/dSMxbKQNpV+HwuX9ntGbhzrejTuy/5f8nptfkznTBbZpw3WtNvf7K8tXBMTDIz29613TiYM9zzvw0yQexETOgJbrJdd3cGE4eb77VghccdihjMtpjKdv+JHojA6443sryvcFTNMlhhTcxCKJDrVec2m4egvOGZ4F8/Po4z/Dlg86RoMYSbAPSTiLUqwR47caMH1N6eWklDlV6peVxw3LDfYB6jqIon266umkox6jWIzz8+JGwYaVEhCtINIdpEalApYUZN0WK5yLidZsYH4HwWgOMDz/OykwyQUC0iI2KTDBIFnAVY0A4jOMjpniNKiRqB2QACRerzQEFkVelcPrUXukT21Y0VC/EHefb1c6v1lrmr9ls2VN5JQ3Do2crW486BQGfa09GNoq/1MsQ4lAysXJgTnmzwv28/dx0f7bmOl4L42Xg/QiOuLK1rC0b4onmU4rE0IjZayyF2rE4PvCsy+t9mca8+4MPDMzTFU3BbKm8O5gnuIUqOVCcPRoljnWkpTtmyinigeffMc3jl/vIY/g2/q0I+BmaAAAAAASUVORK5CYII=" />
                    </defs>
        </svg>
        <p className="cartcount">{cart?.cartsInLocalStorage?.length >0?
        cart?.cartsInLocalStorage.length:
        cart?.cartsInAuthUser[0]?.products?.length}</p>
    </div>
    </div>
  )
}

export default CartIcon