import React from 'react'
import './DetailCss/admincontact.css'
import axios from 'axios'

const AdminContact = () => {

    return (

        <div className="admin__contacts">
            <h3>Contacts</h3>
            <div className="contacts__absolute__div"></div>
            <div className="contacts__main__div">
            <button className='contact__btn'>Call Now</button>
                
            </div>
        </div>

    )
}

export default AdminContact