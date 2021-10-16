import { useState } from "react";
import { Header } from "./components/Header";
import { Images } from "./components/Images";
import { AppContext } from "./context/AppContext";

const App: React.FC = () => {
  const [images, setImages] = useState<Array<string[]>>([])
  const [isGroup, setIsGroup] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState('')

  return (
    <AppContext.Provider value={{ images, setImages, isGroup, setIsGroup, inputValue, setInputValue }}>
      <Header />
      <Images />
    </AppContext.Provider>
  )
}

export default App;
