import { Router } from "express";


const router = Router()

router.get('/products', (req, res)=>{
  res.render('products', {products: products})
})

router.get('/chat', (req, res) => {
  res.render('chat', {});
});


export default router