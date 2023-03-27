import {Modal, Typography, Box} from "@mui/material";
import {styled} from "@mui/material/styles";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    height: '90%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '12px',
    p: 3,
    overflow: 'auto'
};

const StyledMovieImg = styled('img')({
    width: '100%',
    height: '100%',
    objectFit: 'contain',
});

const StyleImageBox = styled('div')({
    maxHeight: '600px',
    maxWidth: '400px',
    width: '100%',
    margin: 'auto',
    borderRadius: '12px',
    overflow: 'hidden',
    marginBottom: '15px'
})

export default function MovieDetailModal({movie, isOpenDialog, onCloseDialog, ...props}) {
    const { poster_url: cover, title_en: titleEn, title_th: titleTh, synopsis_th: detail } = movie

    return (
        <Modal open={isOpenDialog} onClose={onCloseDialog}>
            <Box sx={style}>
                <StyleImageBox>
                    <StyledMovieImg src={cover} alt={titleEn} />
                </StyleImageBox>
                <Typography variant="h4" sx={{ mb: 1 }}>
                    {titleEn}
                </Typography>
                <Typography variant="h4" sx={{mb: 3}}>{titleTh}</Typography>
                <Typography variant="caption">{detail}</Typography>
            </Box>
        </Modal>
    )
}
