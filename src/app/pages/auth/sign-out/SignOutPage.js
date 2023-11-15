import { Typography } from '@mui/material';
import { useEffect } from 'react';
import JwtService from "../../../auth/services/jwtService";
import './sign-out-page.css'

function SignOutPage() {
  useEffect(() => {
    setTimeout(() => {
      JwtService.logout();
    }, 1000);
  }, []);

  return (
    <div className={`signOutPage`}>
      <Typography component={'h2'}
				sx={{
					color: '#007B55',
					fontWeight: 600,
					fontSize: '40px',
					lineHeight: '56px',
					marginTop: '100px',
				}}
			>
				Вы вышли
			</Typography>
    </div>
  );
}

export default SignOutPage;
