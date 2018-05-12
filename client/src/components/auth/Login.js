import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { loginUser } from '../../actions/authActions';

class Login extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			errors: {}
		}
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}

		if(nextProps.errors) {
			this.setState({errors: nextProps.errors});
		}
	}

	componentDidMount() {
		if(this.props.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}
	}

	onChange(e) {
		this.setState({[e.target.name]: e.target.value});
	}

	onSubmit(e) {
		e.preventDefault();
		const {email, password} = this.state;
		const credentials = {email, password};

		this.props.loginUser(credentials);
	}

	render() {
		const {errors} = this.state;
		return (
			<div className="login">
			    <div className="container">
			      <div className="row">
			        <div className="col-md-8 m-auto">
			          <h1 className="display-4 text-center">Log In</h1>
			          <p className="lead text-center">Sign in to your DevConnector account</p>
			          <form onSubmit={this.onSubmit}>
			            <div className="form-group">
			              <input type="email" 
			              placeholder="Email Address" 
			              onChange={this.onChange} 
			              name="email" 
			              className={classnames('form-control form-control-lg', {'is-invalid': errors.email})} 
			              />
			              {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
			            </div>
			            <div className="form-group">
			              <input type="password" 
			              className={classnames('form-control form-control-lg', {'is-invalid': errors.password})} 
			              placeholder="Password" 
			              onChange={this.onChange} 
			              name="password" />
			              {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
			            </div>
			            <input type="submit" className="btn btn-info btn-block mt-4" />
			          </form>
			        </div>
			      </div>
			    </div>
			  </div>
		);
	}
}

Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
}

const mapStateToProps = ({auth, errors}) => ({
	auth, errors
});



export default connect(mapStateToProps, {loginUser})(Login);