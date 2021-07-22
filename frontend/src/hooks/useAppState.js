import { useEffect, useState } from "react";
import apiClient from '../services/apiClient';

export default function useAppState() {
  const [error, setError] = useState(null)
  const [appState, setAppState] = useState({
    name: null,
    isAuthenticated: false,
    cart: [],
    favorites:[],
    rewards: 0,
  })
  

  const [vendorState, setvendorState] = useState({
    currentOrders: []
  })

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await apiClient.fetchUserFromToken()
      if (data) {
        setAppState((a) => (
          {
            ...a, user: data.user, isAuthenticated: true
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
    fetchOrders()
  }, [vendorState.currentOrders])

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