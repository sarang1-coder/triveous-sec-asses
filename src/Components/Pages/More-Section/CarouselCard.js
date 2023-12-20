import React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';

const ResponsiveCard = styled(Card)(({ theme }) => ({
  maxWidth: '100%',
  border: '1px solid black',
  margin: '1rem',
  [theme.breakpoints.up('sm')]: {
    maxWidth: 350,
  },
}));

export default function CarouselCard({ content }) {
  return (
    <ResponsiveCard>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            <img src={content.urlToImage} alt="logo" style={{ width: '100%' }} />
          </Avatar>
        }
        title={content.source.name}
        subheader={content.publishedAt}
      />
      <CardMedia
        component="img"
        height="194"
        image={content.urlToImage}
        alt="Paella dish"
        style={{ objectFit: 'cover' }}
      />
      <CardContent>
        <Typography variant="body2" color="text.primary">
          {content.title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <div className="iconButtonContainer">
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
        </div>
      </CardActions>
    </ResponsiveCard>
  );
}
