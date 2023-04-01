import React from "react"

export const CurrentUserContext = React.createContext()

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState(JSON.parse(localStorage.getItem('user')))

//   const fetchCurrentUser = async () => {
//     let response = await fetch("/api/users/current")
//     response = await response.json()
//     setCurrentUser(response)
//   }

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  )
}

export const useCurrentUser = () => React.useContext(CurrentUserContext)