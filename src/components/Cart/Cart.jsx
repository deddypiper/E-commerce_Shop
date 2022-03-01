import React from "react";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import CartItem from './CartItem/CartItem'
import {Link} from 'react-router-dom'

import useStyles from './styles'

const Cart = ({ cart, removeFromCart, updateCartQty, handleEmptyCart }) => {
    const classes = useStyles()
;

  const EmptyCart = () => {
    return (
      <Typography variant="subtitle1">
        You have no items in your shopping cart,you can add some
        <Link className={classes.link} to='/'> here</Link>!
      </Typography>
    );
  };

  const FilledCart = () => {
    return (
      <>
      <Grid container spacing={3}>
        {cart.line_items.map((item) => (
          <Grid item xs={12} sm={4} key={[item.id]}>
              <CartItem item={item} removeFromCart={removeFromCart} updateCartQty={updateCartQty} />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
         <Typography variant="h4">Subtotal: {cart.subtotal.formatted_with_symbol}</Typography> 
         <Button className={classes.emptyButton} size='large' type='button' variant='contained' color='secondary' onClick={handleEmptyCart}>Empty cart</Button>
         <Button className={classes.emptyButton} component={Link} to='/checkout' size='large' type='button' variant='contained' color='primary'>Checkout</Button>
      </div>
      </>
    );
  }

  if(!cart.line_items) return 'Loading...'
  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title}  gutterBottom variant="h3">
        Your shopping cart
      </Typography>
      {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
};

export default Cart;
