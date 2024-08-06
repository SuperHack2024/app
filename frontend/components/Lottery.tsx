import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Lottery() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="https://picsum.photos/200"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          124 ETH 
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Wednesday, Aug 7, 9:59PM
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Play</Button>
      
      </CardActions>
    </Card>
  );
}