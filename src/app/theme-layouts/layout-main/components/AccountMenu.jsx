import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {Link} from "react-router-dom";

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
				sx={{
						fontWeight: 700,
						lineHeight: '24px',
						color: '#212B36',
						background: 'rgba(145, 158, 171, 0.08) url(assets/images/arrow-down-icon.svg) no-repeat 88% center',
						borderRadius: '8px',
						padding: '6px 44px 6px 16px'
					}}
      >
        Булат Ашимов
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>
            <Link className={`link_sign_out`} to="/sign-out">Выход</Link>
        </MenuItem>
      </Menu>
    </div>
  );
}