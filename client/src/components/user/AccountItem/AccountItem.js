

import { faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { API_IMAGE_URL } from "~/api/Router"
import doctor from '~/assets/images/doctor.jpg'

import './AccountItem.scss'

function AccountItem({data, getUser}) {
  // console.log(data);
  return (
    <div className='wrapper_accountItem'
      onClick={() => getUser(data)}
    >
        {/* <img src={`${API_IMAGE_URL}/${data.avatar.filename}`} alt="avata" className='avatar'/> */}
        <div className='info'>
            <span className='info__name'>{data.fullname}</span>
            <p className='info__email'>{data.email}</p>
        </div>    
        {/* <div className="icon">
            <FontAwesomeIcon icon={faAngleRight} style={{color: '#177dda'}} className="icon__angle"/>
        </div> */}
    </div>
  )
}

export default AccountItem