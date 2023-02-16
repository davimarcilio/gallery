import { api } from "@/lib/axios";
import { useRouter } from "next/router";
import { ReactNode, createContext, useState, useEffect } from "react";

export interface UserContextType {
  user: User;
  galery: Galery[];
  loginUser: (login: string, password: string) => void;
  getGalery: (id: number) => void;
  closeSession: () => void;
  deleteImage: (id: number) => void;
}

export const UserContext = createContext({} as UserContextType);

interface UserProviderProps {
  children: ReactNode;
}

export interface User {
  id: number;
  name: string;
  login: string;
  authToken: string;
}

interface Galery {
  id: number;
  name: string;
  src: string;
  size: number;
  userId: number;
  createdAt: Date;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState({} as User);

  const [galery, setGalery] = useState([] as Galery[]);

  const router = useRouter();

  async function closeSession() {
    localStorage.removeItem("authorizationLogin@galery@1.0.0");
    router.push("/");
  }

  async function getGalery(id: number) {
    try {
      const response = await api.get(`/image/${id}`, {
        headers: {
          "authorization-token": user.authToken,
        },
      });
      const allResponses = response.data.galery.map((image: Galery) => {
        return {
          id: image.id,
          name: image.name,
          src: image.src,
          size: image.size,
          userId: image.userId,
          createdAt: image.createdAt,
        };
      });
      setGalery(allResponses);
    } catch (error) {}
  }
  async function deleteImage(id: number) {
    api.delete(`/image/${id}`, {
      headers: {
        "authorization-token": user.authToken,
      },
    });
    setGalery((state) => state.filter((image) => image.id !== id));
  }
  async function loginUser(login: string, password: string) {
    try {
      const response = await api.post("/user/login", {
        login,
        password,
      });
      setUser({
        id: response.data.id,
        authToken: response.data.authorization,
        name: response.data.name,
        login: response.data.login,
      });
      localStorage.setItem(
        "authorizationLogin@galery@1.0.0",
        JSON.stringify({
          id: response.data.id,
          authToken: response.data.authorization,
          name: response.data.name,
          login: response.data.login,
        })
      );
      router.push("/logged");
    } catch (error) {
      setUser({
        id: 0,
        authToken: "",
        name: "Error",
        login: "Error",
      });
      console.log(error);
    }
  }

  useEffect(() => {
    if (!!localStorage.getItem("authorizationLogin@galery@1.0.0")) {
      setUser(
        JSON.parse(localStorage.getItem("authorizationLogin@galery@1.0.0")!)
      );
      getGalery(user.id);
    }
  }, [user]);

  return (
    <UserContext.Provider
      value={{ user, galery, loginUser, getGalery, closeSession, deleteImage }}
    >
      {children}
    </UserContext.Provider>
  );
}
