import { ChangeEvent, useCallback, useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios'
import config from '../config.json'
import { AppContext } from '../context/AppContext';

import '../styles/Header.scss'

export const Header: React.FC = () => {
   const delay: number = 5000
   const timer: React.MutableRefObject<any> = useRef(null)
   const [loading, setLoading] = useState(false)
   const { images, setImages, isGroup, setIsGroup, setInputValue, inputValue } = useContext(AppContext)

   const fetchData = useCallback(async (tags: string[]): Promise<string> => {
      let hrefs: string = ''

      for (let tag of tags) {
         try {
            const res: any = await axios.get(`https://api.giphy.com/v1/gifs/random?api_key=${config.API_KEY}&tag=${tag}`)
            const data = res.data.data

            if (data.length !== 0) {
               hrefs += hrefs === '' ? `${data.image_url}` : `,${data.image_url}`
            } else {
               alert(`По тегу "${tag}" ничего не найдено`)
            }
         } catch (e) {
            alert('Произошла http ошибка')
         }
      }
      return hrefs
   }, [])

   useEffect(() => {
      if (inputValue === 'delay') {
         const tags: string[] = []

         images.forEach(image => {
            image[0].length <= 10 && tags.push(image[0])
         })

         timer.current = setInterval(async () => {
            const randomTag: string = tags[Math.floor(Math.random() * tags.length)]

            if (randomTag) {
               const hrefs: string = await fetchData(randomTag.split(','))
               hrefs && setImages(prev => [...prev, [randomTag, hrefs]])
            }
         }, delay)
      } else {
         clearTimeout(timer.current)
      }
      return () => clearTimeout(timer.current)
   }, [inputValue, fetchData])


   function inputHandler(e: ChangeEvent<HTMLInputElement>): void {
      if (e.target.value.startsWith(',')) return
      setInputValue(e.target.value.replace(/[^A-Za-z,]/ig, ''))
   }

   async function loadBtnHandler(): Promise<void> {
      if (!inputValue) {
         alert('Заполните поле тег')
         return
      }

      let tags: string[] = inputValue.replaceAll(',', ' ').trim().split(' ')

      setLoading(true)

      const hrefs: string = await fetchData(tags)

      if (hrefs && tags.length === hrefs.split(',').length) {
         setImages(prev => [...prev, [inputValue, hrefs]])
      }

      setLoading(false)
   }

   function cleanBtnHandler(): void {
      setImages([])
      setInputValue('')
      setIsGroup(false)
   }

   function groupBtnHandler(): void {
      setIsGroup(prev => !prev)
   }

   return (
      <div className='header'>
         <input
            type='text'
            placeholder='Enter tag name'
            value={inputValue}
            onChange={inputHandler}
         />
         <button
            onClick={loadBtnHandler}
            disabled={loading}
         >
            {loading ? 'Загрузка...' : 'Загрузить'}
         </button>
         <button
            onClick={cleanBtnHandler}
            disabled={loading}
         >
            {loading ? 'Загрузка...' : 'Очиститить'}
         </button>
         <button
            onClick={groupBtnHandler}
            disabled={loading}
         >
            {loading ? 'Загрузка...' : isGroup ? 'Разгруппировать' : 'Группировать'}
         </button>
      </div>
   );
}