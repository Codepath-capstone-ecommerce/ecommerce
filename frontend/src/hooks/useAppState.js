import { set } from "date-fns";
import { useEffect, useState } from "react";
import apiClient from '../services/apiClient';

export default function useAppState() {
  const [error, setError] = useState(null)
  const [appState, setAppState] = useState({
    first_name: "",
    last_name:"",
    email:"",
    is_admin:false,
    isAuthenticated: false,
    cart: [],
    review:[],
    favorites:[],
    rewards: 0,
    address:''
  })
  

  const [vendorState, setvendorState] = useState({
    currentOrders: [],
    pastOrders : []
  })

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await apiClient.fetchUserFromToken()
      if (data) {
        console.log(data.publicUser)
        setAppState((a) => (
          {
            ...a, 
            first_name: data.publicUser.first_name, 
            last_name:data.publicUser.last_name,
            email:data.publicUser.email,
            rewards:data.publicUser.rewards,
            isAuthenticated: true,
            address:data.publicUser.address
          }
        ))
      }
      if (error) setError(error)
    }

    const token = localStorage.getItem("pizza_shop_token")
    if (token) {
      apiClient.setToken(token)
      fetchUser()
    }
  }, [])

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await apiClient.getCurrentOrders()
      if (data) {
        setvendorState((a) => (
          {
            ...a, currentOrders: data.orders
          }
        ))
      }
      if (error) setError(error)
    }
    const fetchPastOrders = async () => {
      const { data, error } = await apiClient.getPastOrders()
      if (data) {
        setvendorState((a) => (
          {
            ...a, pastOrders: data.orders
          }
        ))
      }
      if (error) setError(error)
    }
    fetchOrders()
    fetchPastOrders()
  }, [])

  // useEffect(() => {
  //   const fetchCart = async () => {
  //     const { data, error } = await apiClient.listCart()
  //     if (data) {
  //       setAppState((a) => (
  //         {
  //           ...a, cart: data.cart
  //         }
  //       ))
  //     }
  //     if (error) setError(error)
  //   }
  //   if (appState.isAuthenticated){
  //     fetchCart()
  //   }

  // }, [appState.isAuthenticated])
  
  // useEffect(() => {
  //   const fetchRewards = async () => {
  //     const { data, error } = await apiClient.listRewards()
  //     if (data) {
  //       setAppState((a) => (
  //         {
  //           ...a, rewards: data.rewards
  //         }
  //       ))
  //       //   setExercise(data.exercises)
  //     }
  //     if (error) setError(error)
  //   }
  //   if (appState.isAuthenticated){
  //     fetchRewards()
  //   }

  // }, [appState.isAuthenticated])

  return { appState, error, setAppState, setError, vendorState, setvendorState }
}