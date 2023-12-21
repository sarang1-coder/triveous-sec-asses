import React from 'react'
import { styled } from '@mui/material/styles'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import { red } from '@mui/material/colors'

const ResponsiveCard = styled(Card)(({ theme }) => ({
  maxWidth: 350,
  border: '1px solid black',
  margin: '1rem',
}))

const MediaContainer = styled(CardMedia)({
  height: 194,
  objectFit: 'cover',
})

export default function CarouselCard({ content }) {
  return (
    <ResponsiveCard>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            <img
              src={content.urlToImage}
              alt="logo"
              style={{ width: '100%' }}
            />
          </Avatar>
        }
        title={content.source.name}
        subheader={content.publishedAt}
      />
      <MediaContainer
        component="img"
        image={content.urlToImage}
        alt={content.url}
      />
      <CardContent>
        <Typography variant="body2" color="text.primary">
          {content.title}
        </Typography>
      </CardContent>
    </ResponsiveCard>
  )
}
