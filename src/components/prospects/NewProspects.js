import React from 'react'
import { connect } from 'react-redux'
import { updateSession } from '../../redux/actions/sessionActions'
import PropTypes from 'prop-types';
import RadioOptions from '../common/RadioOptions';
import Input from '../common/input/Input'



const NewProspects = ({ session, errors = {}, updateSession }) => {
  const { prospect } = session
  const onChange = (event) => {
    const { name, value } = event.target;
    const newProspect = { ...prospect, fields: { ...prospect.fields, [name]: value } }
    updateSession({ ...session, prospect: newProspect })
  }

  return (
    <div className="new-prospect--info">
      <div className="new-prospect--inputs">
        <Input name={"name"} placeholder={"full name"} value={prospect.fields.name} error={errors.name} onChange={onChange} />
        <Input name={"phone"} placeholder={"phone"} value={prospect.fields.phone} error={errors.phone} onChange={onChange} />
        <Input name={"email"} placeholder={"email"} value={prospect.fields.email} error={errors.email} onChange={onChange} />
      </div>
      <RadioOptions onChange={onChange} valueName={"sex"} error={errors.sex} />
    </div>
  )
}

NewProspects.propTypes = {
  updateSession: PropTypes.func,
  session: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapDispatchToProps = {
  updateSession
}

// function mapStateToProps(state) {
//   return {
//     session: state.session
//   }
// }

export default connect(null, mapDispatchToProps)(NewProspects)