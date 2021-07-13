import { useEffect, useState } from "react";
import apiClient from '../services/apiClient';

export default function useAppState() {
  const [error, setError] = useState(null)
  const [appState, setAppState] = useState({
    user: null,
    isAuthenticated: false,
    nutritions: [],
    sleep: [],
    exercises: [],
    token: ""
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

    const token = localStorage.getItem("fitness_app_token")
    if (token) {
      apiClient.setToken(token)
      fetchUser()
    }
  }, [])

  useEffect(() => {
    const fetchExercise = async () => {
      const { data, error } = await apiClient.listUserExercise()
      if (data) {
        setAppState((a) => (
          {
            ...a, exercises: data.exercises
          }
        ))
      }
      if (error) setError(error)
    }
    if (appState.isAuthenticated){
      fetchExercise()
    }

  }, [appState.isAuthenticated])
  
  useEffect(() => {
    const fetchNutritions = async () => {
      const { data, error } = await apiClient.listUserNutrition()
      if (data) {
        setAppState((a) => (
          {
            ...a, nutritions: data.nutritions
          }
        ))
        //   setExercise(data.exercises)
      }
      if (error) setError(error)
    }
    if (appState.isAuthenticated){
      fetchNutritions()
    }

  }, [appState.isAuthenticated])

  useEffect(() => {
    const fetchSleeps = async () => {
      const { data, error } = await apiClient.listUserSleep()
      if (data) {
        setAppState((a) => (
          {
            ...a, sleep: data.sleeps
          }
        ))
        //   setExercise(data.exercises)
      }
      if (error) setError(error)
    }
    if (appState.isAuthenticated){
      fetchSleeps()
    }

  }, [appState.isAuthenticated])

  return { appState, error, setAppState, setError }
}