import React from 'react';
import './Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons'


const Header = () => {
  const [ancilaryClass, setAncilaryClass] = React.useState("ancilary ancilary-initial")
  const selectedClass = ancilaryClass.includes("slideIn") ? "button-selected" : ""
  return (
    <>
      <nav>
        <div className="header-photo"></div>
        <div className="titles">
          <div className="title">Strathmore & Veteran</div>
          <div className="subtitle">Available Apartments</div>
        </div>
        <div className={`info__circle ${selectedClass}`} onClick={() => setAncilaryClass(!ancilaryClass.includes("slideIn") ? "ancilary slideIn" : "ancilary slideOut")}>
          <FontAwesomeIcon icon={faInfo} className="info__icon" />
        </div>
      </nav>

      <div className={`${ancilaryClass}`} ><div className="explanation">
        Welcome to the Strathmore / Veteran roommate match. Below you will see a listing of all of our available apartments. Some apartments
        have already been claimed and they are just looking for roommates, and some apartments are available to reserve. In fact, you can go
        ahead and start your own roommate group so you can split rent with others! Each of the photos and details are scrollable, so feel free
        to explore as much as you'd like! If you have any questions or concerns, feel free to reach out to Stephen, the on-site property manager, by email
        at Strathmore@gmgapts.com or by phone/text at 310-694-4660
          <div className="sign-off">I hope this app helps you find your future home <strong>- Stephen V. Nelson</strong> <em style={{ fontSize: "10px" }}>On-Site Property Manager</em> </div>
      </div></div>
    </>
  )
}

export default Header;