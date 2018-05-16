import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const InputGroup = ({name, placeholder, value, error, icon, type, onChange}) => {
	return(
		<div className="input-group mb-3">
          <div className="input-group-prepend">
               <span className="input-group-text">
                    <i className={icon}/>
               </span>
          </div>
          <textarea 
          placeholder={placeholder}
          onChange={onChange} 
          name={name}
          value={value}
          className={classnames('form-control form-control-lg', {'is-invalid': error})} 
          />
          {error && (<div className="invalid-feedback">{error}</div>)}
        </div>
	)
}

InputGroup.propTypes = {
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	icon: PropTypes.string,
     type: PropTypes.string.isRequired,
	error: PropTypes.string,
	onChange: PropTypes.func.isRequired
}

InputGroup.defaultProps = {
     type: 'text'
}

export default InputGroup;