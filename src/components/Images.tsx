import { useContext, useMemo } from "react"
import { AppContext } from "../context/AppContext"

import '../styles/Images.scss'

export const Images: React.FC = () => {
   const { images, isGroup, setInputValue } = useContext(AppContext)

   const groupedImages = useMemo(() => {
      const data: any = {}

      for (let image of images) {
         data[image[0]] = image[0] in data ? [...data[image[0]], image[1]] : [image[1]]
      }

      return data
   }, [images])

   function clickImgHandler(tag: string): void {
      setInputValue(tag)
   }

   return (
      <div className='images'>
         {isGroup
            ? Object.entries(groupedImages).map(((group: any, index: number): JSX.Element => (
               <div key={index} className='group'>

                  <p>{group[0]}</p>

                  <div className='images__row'>
                     {group[1].map((image: string, index: number): JSX.Element => (
                        <div
                           key={index}
                           className='image'
                           onClick={() => clickImgHandler(group[0])}
                        >
                           {image.split(',').map((gif: string, index: number): JSX.Element => (
                              <img
                                 key={index}
                                 src={gif}
                                 alt={`gif(${index})`}
                                 style={{ height: `${100 / image.split(',').length}%` }}
                              />
                           ))}
                        </div>
                     ))}
                  </div>

               </div>
            )))
            : <div className='images__row'>

               {images.map((image: string[], index: number): JSX.Element => (
                  <div
                     key={index}
                     className='image'
                     onClick={() => clickImgHandler(image[0])}
                  >
                     {image[1].split(',').map((gif: string, index: number): JSX.Element => (
                        <img
                           key={index}
                           src={gif}
                           alt={`gif(${index})`}
                           style={{ height: `${100 / image[1].split(',').length}%` }}
                        />
                     ))}
                  </div>
               ))}

            </div>
         }
      </div>
   )
}