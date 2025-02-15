import { createContext, ReactNode, useContext } from "react";
import { useAppwrite } from "./useAppwrite";
import { getUser } from "./appwrite";

interface User{
    $id: string;
    name: string;
    email: string;
    avater?: string ;
}

interface GlobalContextType {
    isLoggedIn: boolean;
    user: User | null,
    loading: boolean;
    refetch: any
}

const globalContext = createContext<GlobalContextType | undefined>(undefined);


export const  GlobalProvider = ({children}: {children:ReactNode}) => {
    const {
        data: user,
        loading,
        refetch,
      } = useAppwrite({
        fn: getUser,
      });

      const isLoggedIn = !!user;
    return (
        <globalContext.Provider value={{
            isLoggedIn,
            user,
            loading,
            refetch,
        }}>
            {children}
        </globalContext.Provider>
    )
}

export const useGlobalContext = (): GlobalContextType => {
    const context = useContext(globalContext);
    if (!context)
      throw new Error("useGlobalContext must be used within a GlobalProvider");
  
    return context;
  };