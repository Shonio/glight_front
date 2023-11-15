import React from 'react'
import { useNavigate } from 'react-router-dom'
import './sign-in-header.css'

const SignInHeader = () => {
	
	const navigate = useNavigate()

	return (
		<div className='signInHeader'>
			<div className="container">
				<div className="logo" onClick={() => navigate('/')}>
					<img src='assets/images/logo/logo-name.svg' alt="logo name"/>
				</div>
			</div>
		</div>
	)
}

export default SignInHeader
