import { createContext } from "react";

function noop() { }

interface IContext {
   images: Array<string[]>
   setImages: React.Dispatch<React.SetStateAction<Array<string[]>>>
   isGroup: boolean
   setIsGroup: React.Dispatch<React.SetStateAction<boolean>>
   inputValue: string
   setInputValue: React.Dispatch<React.SetStateAction<string>>
}

export const AppContext = createContext<IContext>({
   images: [],
   setImages: noop,
   isGroup: false,
   setIsGroup: noop,
   inputValue: '',
   setInputValue: noop
})