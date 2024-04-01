import { Avatar, Button, Card, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect } from 'react'
import { deleteProduct, findProducts } from '../../Redux/Product/Action'
import { useDispatch, useSelector } from 'react-redux'

const ProductTableView = () => {

  const dispatch = useDispatch();
  const {products} = useSelector(store => store);

  console.log("Products ---> ", products);

//   const deleteProductHandler = (productId) => {
//     dispatch(deleteProduct(productId));
//   }

  useEffect(()=>{
    const data = {
      category : "mens_kurta",
      colors :  [],
      sizes :  [],
      minPrice : 0,
      maxPrice : 10000,
      minDiscount : 0,
      sort : "price_low",
      pageNumber : 0,
      pageSize : 10,
      stock : "",
  }
  dispatch(findProducts(data))
  },[products.deletedProduct])

  return (
    <div className='p-5'>

      <Card className='mt-2' >
          <CardHeader title="Recent Products" />

        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell align="left">Title</TableCell>
            <TableCell align="left">Category</TableCell>
            <TableCell align="left">Price</TableCell>
            <TableCell align="left">Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products?.products?.content?.slice(0,5).map((item) => (
            <TableRow
              key={item.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">
                <Avatar src={item.imageUrl}></Avatar>
              </TableCell>
              <TableCell component="left" scope="row">
                {item.title}
              </TableCell>
              <TableCell align="left">{item.category.name}</TableCell>
              <TableCell align="left">{item.price}</TableCell>
              <TableCell align="left">{item.quantity}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
        </TableContainer>
     
      </Card>
    </div>
  )
}

export default ProductTableView