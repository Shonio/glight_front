import { Typography } from "@mui/material";
import {memo} from "react";
import { CustomButton } from "../../../utils/customButton";

function FooterLayout() {
    return (
        <footer className="footer">
					<div className="container">
						<div className="footer__wrap">
							<div className="footer__row">
								<div className="logo">
									<img src='assets/images/logo/logo.svg' alt="logo" />
								</div>

								{/* <Typography
									sx={{
										margin: '0 60px 0 90px',
										color: '#637381',
									}}
								>
									Политика конфиденциальности
								</Typography>

								<Typography
									sx={{
										color: '#637381',
									}}
								>
									Пользовательское соглашение
								</Typography> */}
							</div>

							{/* <CustomButton
								sx={{
										color: '#007B55',
										background: 'rgba(0, 171, 85, 0.16)',
										textTransform: 'capitalize',
										fontWeight: 700,
										fontSize: '14px',
										lineHeight: '24px',
										'&:hover': {
											backgroundColor: 'rgba(0, 171, 85, 0.16)'
										},
									}}	
							>
								Задать вопрос
							</CustomButton> */}
							
						</div>
					</div>
				</footer>
    );
}

export default memo(FooterLayout);