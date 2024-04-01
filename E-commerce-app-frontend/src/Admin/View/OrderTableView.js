import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmOrder, deleteOrder, deliveredOrder, getOrders, shipOrder } from "../../Redux/Admin/Order/Action";
import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardHeader,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const OrderTableView = () => {
  const dispatch = useDispatch();

  const { adminOrder } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getOrders());
  }, [adminOrder.shipped, adminOrder.confirmed, adminOrder.delivered, adminOrder.deleted]);

  // console.log("Admin Orders - ", adminOrder);
  // console.log(typeof adminOrder.orders);

  const [anchorEl, setAnchorEl] = React.useState([]);
  const open = Boolean(anchorEl);
  const handleClick = (event, index) => {
    const newAnchorElArray = [...anchorEl];
    newAnchorElArray[index] = event.currentTarget;
    setAnchorEl(newAnchorElArray);
  };
  const handleClose = (index) => {
    const newAnchorElArray = [...anchorEl];
    newAnchorElArray[index] = null;
    setAnchorEl(newAnchorElArray);
  };

//   const handleShipOrder = (orderId) => {
//     dispatch(shipOrder(orderId))
//     console.log("Shipped order - ", orderId);
//     handleClose()
//   }

//   const handleConfirmOrder = (orderId) => {
//     dispatch(confirmOrder(orderId))
//     console.log("Confirmed order - ", orderId);
//     handleClose()
//   }

//   const handleDeliverOrder = (orderId) => {
//     dispatch(deliveredOrder(orderId))
//     console.log("Delivered order - ", orderId);
//     handleClose()
//   }

//   const handleDeleteOrder = (orderId) => {
//     dispatch(deleteOrder(orderId))
//     console.log("Deleted order - ", orderId);
//   }

  return (
    <div className="p-10">
      <Card className="mt-2">
        <CardHeader title="Recent Orders" />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Id</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Status</TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
              {adminOrder?.orders?.slice(0,5).map((item, index) => (
                <TableRow
                  key={item.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">
                    <AvatarGroup max={2} sx={{ justifyContent: "start" }}>
                      {item.orderItems.map((orderItem) => (
                        <Avatar src={orderItem.product.imageUrl}></Avatar>
                      ))}
                    </AvatarGroup>
                  </TableCell>

                  <TableCell component="left" scope="row">
                    {item.orderItems.map((orderItem) => (
                      <p>{orderItem.product.title}</p>
                    ))}
                  </TableCell>

                  <TableCell align="left">{item.id}</TableCell>

                  <TableCell align="left">
                    {item.totalDiscountedPrice}
                  </TableCell>

                  <TableCell align="left">
                    <span 
                    className={`text-white px-5 py-2 rounded-full ${item.orderStatus === "CONFIRMED" ? "bg-[#369236]" : 
                                 item.orderStatus === "SHIPPED" ? "bg-[#4141ff]" : 
                                 item.orderStatus === "PLACED" ? "bg-[#02B290]" : 
                                 item.orderStatus === "PENDING" ? "bg-[gray]" : "bg-[#025720]" }`}
                  >{item.orderStatus}</span></TableCell>

                
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
};

export default OrderTableView;
