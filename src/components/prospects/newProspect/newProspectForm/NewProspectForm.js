import React from 'react'
import { PropTypes } from 'prop-types';
import NewProspects from '../../NewProspects';
import Button from '../../../common/button/Button';
import RadioOptions from '../../../common/RadioOptions';
import Roommates from '../roommates/Roommates';
import Summary from './summary/Summary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './NewProspectForm.css'


const NewProspectForm = ({
  apartment,
  roommateGroup,
  prospects,
  prospect,
  errors,
  roommates,
  handleForm,
  updateRoommateGender,
  session,
  history
}) => {
  return (
    <div className="modal-container">
      <div className="modal-content">
        <Summary apartment={apartment} history={history} session={session} />
        {/* form section */}
        <div className="new-prospect--container">
          <form className="new-prospect--form" onSubmit={handleForm}>

            {/* step 1 */}
            <div className="step">
              <div className="new-prospect--step">1. enter your information</div>
              <NewProspects errors={errors} session={session} />
            </div>

            {/* step 2 */}
            <Roommates
              apartment={apartment}
              roommates={roommates}
              prospect={prospect}
              roommateGroup={roommateGroup}
              prospects={prospects}
              errors={errors}
              session={session}
            />

            {/* optional step 3 */}
            {!roommateGroup?.id && (
              <div className="step">
                <div className="new-prospect--step">3. specify roommate details</div>
                <div>select your roommate gender preferences</div>
                <RadioOptions
                  onChange={updateRoommateGender}
                  valueName={"genderPreference"}
                />
              </div>
            )}

            {/* submit */}
            <div className="main-button--container">
              <Button style={{ fontSize: "20px", padding: "0.5% 4%", borderRadius: "25px" }}>SUBMIT</Button>
            </div>
          </form>
        </div>


      </div>
    </div>)
}

NewProspectForm.propTypes = {
  apartment: PropTypes.object.isRequired,
  handleForm: PropTypes.func,
  updateRoommateGender: PropTypes.func,
  roommateGroup: PropTypes.object.isRequired,
  prospects: PropTypes.array.isRequired,
  prospect: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  roommates: PropTypes.array.isRequired,
  history: PropTypes.object
}


export default NewProspectForm